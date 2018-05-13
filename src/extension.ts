"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { workspace, window, Range, Position, Uri } from "vscode";
import fileManager from "./fileManager";
import * as path from "path";
// import * as child_process from "child_process";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  try {
    let sub1 = workspace.onDidChangeTextDocument(ev =>
      fileManager.setCurrentFile(ev.document)
    );
    let sub2 = window.onDidChangeTextEditorSelection(ev => {
      if (
        ev === null ||
        ev.kind !== vscode.TextEditorSelectionChangeKind.Mouse
      ) {
        return;
      }

      let documentTillSelection = ev.textEditor.document.getText(
        new Range(
          new Position(0, 0),
          new Position(ev.textEditor.selection.anchor.line, 0)
        )
      );

      // if there is no dependencies defined before, do not bother checking further
      if (documentTillSelection.indexOf("ependencies") < 0) {
        return;
      }

      let lineText = ev.textEditor.document.lineAt(
        ev.textEditor.selection.anchor.line
      ).text;

      let matches = /\"(.*)\": +\"/.exec(lineText);
      if (matches === null) {
        return;
      }

      let packageName = matches[1];

      console.log(packageName);

      let node_modules = path.join(
        path.dirname(ev.textEditor.document.fileName),
        "node_modules"
      );
      let packageFolder = path.join(node_modules, packageName);

    //   vscode.commands.getCommands().then(vals => {
    //     let commands = vals.filter(s => s.indexOf("reveal") >= 0);
    //   });
      window.showTextDocument(Uri.file(packageFolder)).then(ok => {
        vscode.commands.executeCommand(
          "workbench.files.action.showActiveFileInExplorer"
        );
      });
      //   child_process.exec(`start "" "${packageFolder}"`);
    });
    let sub3 = window.onDidChangeActiveTextEditor(
      ev => ev && fileManager.setCurrentFile(ev.document)
    );
    if (window.activeTextEditor) {
      processActiveFile(window.activeTextEditor.document);
    }
    context.subscriptions.push(sub1, sub2, sub3);
  } catch (e) {}

}

async function processActiveFile(document: vscode.TextDocument) {
  if (document && fileManager.isPackageJson()) {
    console.log("In package.json !");
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}

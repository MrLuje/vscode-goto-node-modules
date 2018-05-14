'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {window, Uri} from 'vscode';
import fileManager from './fileManager';
import * as path from 'path';
import packageJsonManager from './packageJsonManager';
import * as child_process from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  try {
    let sub1 = vscode.commands.registerTextEditorCommand(
      'gotoNodeModules.navigateToPackage',
      async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
        let packageFolder = checkAndGetPackageFolderUnderCursor(textEditor);
        if (packageFolder) {
          let packageJsonInPackageFolder = path.join(
            packageFolder,
            'package.json'
          );

          window
            .showTextDocument(Uri.file(packageJsonInPackageFolder), {
              preview: false
            })
            .then(ok => {
              vscode.commands.executeCommand(
                'workbench.files.action.showActiveFileInExplorer'
              );
            });
        }
      }
    );

    let sub2 = vscode.commands.registerTextEditorCommand(
      'gotoNodeModules.openPackageFolderInExplorer',
      async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
        let packageFolder = checkAndGetPackageFolderUnderCursor(textEditor);
        if (packageFolder) {
          child_process.exec(`start "" "${packageFolder}"`);
        }
      }
    );

    context.subscriptions.push(sub1, sub2);
  } catch (e) {}
}

function checkAndGetPackageFolderUnderCursor(
  textEditor: vscode.TextEditor
): string | void {
  if (!fileManager.isPackageJson(textEditor.document)) {
    return failwith(ErrorCode.NOT_PACKAGE_JSON);
  }

  if (!packageJsonManager.hasDependenciesDefined(textEditor)) {
    return failwith(ErrorCode.NO_PACKAGE_UNDER_CURSOR);
  }

  let packageFolder = packageJsonManager.extractPackageNameFromCurrentLine(
    textEditor
  );

  if (packageFolder === null) {
    return failwith(ErrorCode.NO_PACKAGE_UNDER_CURSOR);
  }

  return packageFolder;
}

enum ErrorCode {
  NOT_PACKAGE_JSON,
  NO_PACKAGE_UNDER_CURSOR
}

function failwith(error: ErrorCode): void {
  let msg: string = 'Unknown error :(';
  switch (error) {
    case ErrorCode.NOT_PACKAGE_JSON:
      msg = 'This command should only be called from an opened package.json !';
      break;
    case ErrorCode.NO_PACKAGE_UNDER_CURSOR:
      msg =
        'This command should be invoked on a line with a dependency definition';
      break;
  }
  window.showErrorMessage(msg);
}

// this method is called when your extension is deactivated
export function deactivate() {}

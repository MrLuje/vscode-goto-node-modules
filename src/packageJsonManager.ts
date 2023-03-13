import { TextDocument, TextEditor, Range, Position } from 'vscode';
import * as path from 'path';

class PackageJsonManager {
  private checkIfPackageJson(document: TextDocument) {
    let { fileName } = document;
    return path.basename(fileName).toLowerCase() === 'package.json';
  }

  isPackageJson(document: TextDocument): boolean {
    return document && this.checkIfPackageJson(document);
  }

  hasDependenciesDefined(textEditor: TextEditor): boolean {
    let documentTillSelection = textEditor.document.getText(
      new Range(
        new Position(0, 0),
        new Position(textEditor.selection.anchor.line, 0)
      )
    );

    // if there is no dependencies defined before, do not bother checking further
    return documentTillSelection.indexOf('ependencies') >= 0;
  }

  hasResolutionsDefined(textEditor: TextEditor): boolean {
    let documentTillSelection = textEditor.document.getText(
      new Range(
        new Position(0, 0),
        new Position(textEditor.selection.anchor.line, 0)
      )
    );

    // if there is no resolutions defined before, do not bother checking further
    return documentTillSelection.indexOf('resolutions') >= 0;
  }

  extractPackageNameFromCurrentLine(textEditor: TextEditor): string | null {
    let lineText = textEditor.document.lineAt(textEditor.selection.anchor.line)
      .text;

    let matches = /\"(.*)\": +\"/.exec(lineText);
    if (matches === null || matches.length < 1) {
      return null;
    }

    let packageName = matches[1];
    let node_modules = path.join(
      path.dirname(textEditor.document.fileName),
      'node_modules'
    );
    let packageFolder = path.join(node_modules, packageName);
    return packageFolder;
  }
}

export default new PackageJsonManager();

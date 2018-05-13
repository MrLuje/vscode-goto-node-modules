import { TextDocument } from "vscode";
import * as path from "path";

export class PackageJsonManager {
  constructor(private _document: TextDocument) {}

  private checkIfPackageJson(document: TextDocument) {
    let { fileName } = document;
    return path.basename(fileName).toLowerCase() === "package.json";
  }

  isPackageJson(): boolean {
      return this._document && this.checkIfPackageJson(this._document);
  }
}

import { TextDocument } from "vscode";
import { PackageJsonManager } from "./packageJsonManager";

class FileManager {
  _packageJsonManager: PackageJsonManager | null;

  constructor() {
    this._packageJsonManager = null;
  }

  setCurrentFile(document: TextDocument) {
    this._packageJsonManager = new PackageJsonManager(document);
  }

  public isPackageJson(): boolean {
    return (
      this._packageJsonManager !== null &&
      this._packageJsonManager.isPackageJson()
    );
  }
}

export default new FileManager();

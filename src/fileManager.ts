import {TextDocument} from 'vscode';
import packageJsonManager from './packageJsonManager';

class FileManager {
  public isPackageJson(document: TextDocument): boolean {
    return packageJsonManager.isPackageJson(document);
  }
}

export default new FileManager();

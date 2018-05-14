import {TextDocument} from 'vscode';
import packageJsonManager from './packageJsonManager';
import * as fs from 'fs';

class FileManager {
  public isPackageJson(document: TextDocument): boolean {
    return packageJsonManager.isPackageJson(document);
  }

  public exists(path: string): boolean {
    return fs.existsSync(path);
  }
}

export default new FileManager();

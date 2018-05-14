//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as path from 'path';
import {Uri, Range} from 'vscode';
import * as sinon from 'sinon';
import * as child_process from 'child_process';

// Defines a Mocha test suite to group tests of similar kind together
suite('Extension Tests', function() {
  test('should load correctly', function() {
    assert.ok(
      vscode.extensions.getExtension('mrluje.vscode-goto-node-modules')
    );
  });

  // Defines a Mocha unit test
  test('command gotoNodeModules.navigateToPackage should open associated package', async function() {
    this.timeout('10s');

    let packageJsonFile = Uri.file(
      path.join(__dirname, 'workspace', 'package.json')
    );
    let doc = await vscode.workspace.openTextDocument(packageJsonFile);

    await vscode.window.showTextDocument(doc, {
      selection: new Range(6, 0, 6, 0)
    });

    var pr = new Promise(async (ok, nok) => {
      vscode.window.onDidChangeVisibleTextEditors(ev => {
        var isCorrectFileOpened =
          ev[0].document.fileName.indexOf('node_modules') >= 1;

        if (isCorrectFileOpened) {
          ok();
        } else {
          nok(`Failed to open ${ev[0].document.fileName}`);
        }
      });

      await vscode.commands.executeCommand('gotoNodeModules.navigateToPackage');
    });

    return pr;
  });

  // Defines a Mocha unit test
  test('command gotoNodeModules.openPackageFolderInExplorer should trigger child_process.exe', async function() {
    this.timeout('10s');

    let packageJsonFile = Uri.file(
      path.join(__dirname, 'workspace', 'package.json')
    );
    let doc = await vscode.workspace.openTextDocument(packageJsonFile);

    await vscode.window.showTextDocument(doc, {
      selection: new Range(6, 0, 6, 0)
    });

    var pr = new Promise(async (ok, nok) => {
      let execStub = sinon.stub(child_process, 'exec');
      await vscode.commands.executeCommand(
        'gotoNodeModules.openPackageFolderInExplorer'
      );

      if (execStub.called) {
        ok();
      } else {
        nok('child_process.exec not called');
      }
    });

    return pr;
  });

  // Defines a Mocha unit test
  test('command gotoNodeModules.navigateToPackage show information msg on non-dependency line', async function() {
    this.timeout('10s');

    let packageJsonFile = Uri.file(
      path.join(__dirname, 'workspace', 'package.json')
    );
    let doc = await vscode.workspace.openTextDocument(packageJsonFile);

    await vscode.window.showTextDocument(doc, {
      selection: new Range(1, 0, 1, 0)
    });

    let spyShowErrorMessage = sinon.spy(vscode.window, 'showErrorMessage');

    await vscode.commands.executeCommand('gotoNodeModules.navigateToPackage');

    assert.ok(spyShowErrorMessage.called);

    spyShowErrorMessage.restore();
  });

  // Defines a Mocha unit test
  test('command gotoNodeModules.navigateToPackage show information msg on other file than package.json', async function() {
    this.timeout('10s');

    let packageJsonFile = Uri.file(
      path.join(__dirname, 'workspace', 'yarn.lock')
    );
    let doc = await vscode.workspace.openTextDocument(packageJsonFile);

    await vscode.window.showTextDocument(doc, {
      selection: new Range(1, 0, 1, 0)
    });

    let spyShowErrorMessage = sinon.spy(vscode.window, 'showErrorMessage');

    await vscode.commands.executeCommand('gotoNodeModules.navigateToPackage');

    assert.ok(spyShowErrorMessage.called);

    spyShowErrorMessage.restore();
  });
});

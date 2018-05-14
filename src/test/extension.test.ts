//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as path from "path";
import { Uri, Range } from "vscode";

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function() {
  // Defines a Mocha unit test
  test("Run vscode", async done => {
    let packageJsonFile = Uri.file(path.join(__dirname, "package.json"));
    console.log("a");
    let doc = await vscode.workspace.openTextDocument(packageJsonFile);
    console.log("b");

    await vscode.window.showTextDocument(doc, {
      selection: new Range(6, 0, 6, 0)
    });
    console.log("c");

    // var pr = new Promise(async (ok, nok) => {
    vscode.window.onDidChangeVisibleTextEditors(ev => {
      var isCorrectFileOpened =
        ev[0].document.fileName.indexOf("node_modules") >= 1;

      assert.equal(
        isCorrectFileOpened,
        true,
        `Failed to open ${ev[0].document.fileName}`
      );

      // ok();
      done();
    });

    vscode.commands.executeCommand("gotoNodeModules.navigateToPackage").then(
      _ => {},
      rejected => {
        assert.fail(
          "",
          "",
          "Failed to execute gotoNodeModules.navigateToPackage"
        );
      }
    );
    // });

    // return pr;
  });
});

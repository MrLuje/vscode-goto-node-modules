# VS Code Go to node_modules README
[![Build status](https://ci.appveyor.com/api/projects/status/6k1hta1xpboar22v/branch/master?svg=true)](https://ci.appveyor.com/project/MrLuje/vscode-goto-node-modules/branch/master)
[![Build Status](https://travis-ci.com/MrLuje/vscode-goto-node-modules.svg?branch=master)](https://travis-ci.com/MrLuje/vscode-goto-node-modules)

This extension allows to navigate into given npm package folder in node_modules from the package.json

## Features

Open package.json, click on a dependency :
- hit F12 to navigate into this package's folder
- hit CTRL+F12 to open this package's folder in explorer


![feature X](/images/demo.gif)

## Extension comamnds

This extension contributes the following commands:

* `gotoNodeModules.navigateToPackage`: trigger the sidebar navigation
* `gotoNodeModules.openPackageFolderInExplorer`: trigger the explorer navigation
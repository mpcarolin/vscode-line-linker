// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { get } = require('jsutils/build/cjs')
const clipboardy = require('clipboardy')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const extensionName = 'extension.linkLine'

const vsalert = vscode.window.showInformationMessage

const getActiveFilePath = () => {
	const uri = get(vscode,'window.activeTextEditor.document.fileName')
	return uri
		? uri.toString()
		: null
}
const getActiveLineNumber = () => get(vscode,'window.activeTextEditor.selection.active.line')
const makeAppLink = (path, lineNumber) => {
	const appLinkPrefix = 'vscode://file'
	const fileLink = `${appLinkPrefix}${path}`
	return lineNumber
		? `${fileLink}:${lineNumber}`
		: fileLink
}

const copyLinkToClipboard = async () => {
		const path = getActiveFilePath()
		const lineNumber = getActiveLineNumber().toString()
		const link = makeAppLink(path, lineNumber)
		clipboardy
			.write(link)
			.then(_ => vsalert(`Copied link to clipboard!`))
			.catch(err => vsalert(`Failed to copy link to clipboard`, err))
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Extension "line-linker" is now active!');

	// The command has been defined in the package.json file
	const disposable = vscode.commands.registerCommand(extensionName, copyLinkToClipboard)
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
const deactivate = () => {}

module.exports = {
	activate,
	deactivate
}

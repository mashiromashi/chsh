import * as vscode from 'vscode';
import { query } from './commands/query';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('chsh.query', query);
	context.subscriptions.push(disposable);
}


export function deactivate() {}

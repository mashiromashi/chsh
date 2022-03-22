import axios from "axios";
import { window, commands, ViewColumn, workspace, languages, } from "vscode";
import stripAnsi from 'strip-ansi';

export async function query() {
  let config = {
    // Fake user agent to get plain-text output.
    // See https://github.com/chubin/cheat.sh/blob/1e21d96d065b6cce7d198c1a3edba89081c78a0b/bin/srv.py#L47
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "User-Agent": "curl/7.43.0"
    }
  };

  const languageInput = await window.showInputBox({
    placeHolder:"Language"
  });
  const query = await window.showInputBox({
    placeHolder:"query",
  });
  const response = await axios.get(`https://cht.sh/${languageInput}/${query}`, config);

  const data = response.data;
  const converted = stripAnsi(data);

  let doc =await workspace.openTextDocument({
    language: languageInput,
    content: converted
  });
  doc = await languages.setTextDocumentLanguage(doc, "typescript");
  await window.showTextDocument(doc, {
    viewColumn: ViewColumn.Two,
    preview: true,
    preserveFocus: true
  });
}
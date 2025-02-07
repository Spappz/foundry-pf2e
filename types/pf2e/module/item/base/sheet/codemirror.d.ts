import { json } from "@codemirror/lang-json";
import { Extension } from "@codemirror/state";
import { EditorView } from "codemirror";
import { DataSchema } from "../../../../../foundry/common/data/fields.ts";

export declare const CodeMirror: {
    EditorView: typeof EditorView;
    basicSetup: Extension;
    json: typeof json;
    jsonLinter: () => Extension;
    keybindings: Extension;
    /** All language and autocomplete extensions for rule element editing */
    ruleElementExtensions: (options: RuleElementOptions) => Extension[];
};
interface RuleElementOptions {
    schema?: DataSchema;
}
export {};

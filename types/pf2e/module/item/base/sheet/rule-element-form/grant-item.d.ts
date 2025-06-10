import { GrantItemRuleElement, GrantItemSource } from "./../../../../rules/rule-element/grant-item/rule-element.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
import { ClientDocument } from "./../../../../../../foundry/client/documents/abstract/client-document.mjs";
/** Form handler for the GrantItem rule element */
declare class GrantItemForm extends RuleElementForm<GrantItemSource, GrantItemRuleElement> {
    template: string;
    getData(): Promise<GrantItemFormSheetData>;
    updateObject(ruleData: DeepPartial<GrantItemSource> & Partial<Record<string, JSONValue>>): void;
}
interface GrantItemFormSheetData extends RuleElementFormSheetData<GrantItemSource, GrantItemRuleElement> {
    granted: ClientDocument | null;
}
export { GrantItemForm };

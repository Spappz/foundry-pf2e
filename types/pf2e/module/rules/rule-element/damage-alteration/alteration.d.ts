import { ActorPF2e } from "../../../actor/index.ts";
import { DamageDicePF2e, ModifierPF2e } from "../../../actor/modifiers.ts";
import { ItemPF2e } from "../../../item/index.ts";
import { BaseDamageData } from "../../../system/damage/types.ts";
import { Predicate } from "../../../system/predication.ts";
import { RuleValue } from "../data.ts";
import { DamageAlterationProperty, DamageAlterationRuleElement, DamageAlterationValue } from "./rule-element.ts";

declare class DamageAlteration {
    #private;
    slug: string | null;
    property: DamageAlterationProperty;
    value: RuleValue | null;
    constructor(rule: PartialRuleElement);
    getNewValue(damage: BaseDamageData | DamageDicePF2e | ModifierPF2e, item: ItemPF2e | null): DamageAlterationValue | null;
    applyTo<TDamage extends DamageDicePF2e | ModifierPF2e>(damage: TDamage, options: {
        item: ItemPF2e<ActorPF2e>;
        test: string[] | Set<string>;
    }): TDamage;
}
interface PartialRuleElement extends Pick<DamageAlterationRuleElement, "mode" | "property" | "slug" | "value"> {
    resolveValue?: DamageAlterationRuleElement["resolveValue"];
    ignored?: boolean;
    parent?: ItemPF2e<ActorPF2e>;
    predicate?: Predicate;
}
export { DamageAlteration };

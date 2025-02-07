import { ActorPF2e } from "../../actor/index.ts";
import { ModifierPF2e } from "../../actor/modifiers.ts";
import { ItemPF2e, WeaponPF2e } from "../../item/index.ts";
import { WeaponTrait } from "../../item/weapon/types.ts";
import { RollNotePF2e } from "../../notes.ts";
import { TokenDocumentPF2e } from "../../scene/index.ts";
import { CheckType } from "../check/index.ts";
import { DegreeOfSuccessString } from "../degree-of-success.ts";
import { CheckContextData, CheckContextOptions, CheckMacroContext, SimpleRollActionCheckOptions } from "./types.ts";

declare class ActionMacroHelpers {
    #private;
    static resolveStat(stat: string): {
        checkType: CheckType;
        property: string;
        stat: string;
        subtitle: string;
    };
    static defaultCheckContext<ItemType extends ItemPF2e<ActorPF2e>>(options: CheckContextOptions<ItemType>, data: CheckContextData<ItemType>): CheckMacroContext<ItemType> | undefined;
    static note(selector: string, translationPrefix: string, outcome: DegreeOfSuccessString, translationKey?: string): RollNotePF2e;
    static outcomesNote(selector: string, translationKey: string, outcomes: DegreeOfSuccessString[]): RollNotePF2e;
    static simpleRollActionCheck<TItem extends ItemPF2e<ActorPF2e>>(options: SimpleRollActionCheckOptions<TItem>): Promise<void>;
    static target(): {
        token: TokenDocumentPF2e | null;
        actor: ActorPF2e | null;
    };
    static getWeaponPotencyModifier(item: WeaponPF2e<ActorPF2e>, selector: string): ModifierPF2e | null;
    static getApplicableEquippedWeapons(actor: ActorPF2e, trait: WeaponTrait): WeaponPF2e<ActorPF2e>[];
    /** Attempts to get the label for the given statistic using a slug */
    static getSimpleCheckLabel(slug: string): string | null;
}
declare class CheckContextError extends Error {
    actor: ActorPF2e;
    slug: string;
    constructor(message: string, actor: ActorPF2e, slug: string);
}
export { ActionMacroHelpers, CheckContextError };

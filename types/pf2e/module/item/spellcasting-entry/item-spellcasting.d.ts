import { CreaturePF2e } from "../../actor/index.ts";
import { AttributeString } from "../../actor/types.ts";
import { PhysicalItemPF2e, SpellPF2e } from "../index.ts";
import { MagicTradition } from "../spell/types.ts";
import { Predicate } from "../../system/predication.ts";
import { Statistic } from "../../system/statistic/statistic.ts";
import { SpellCollection } from "./collection.ts";
import { CastOptions, SpellcastingEntry, SpellcastingSheetData } from "./types.ts";

/** An in-memory spellcasting entry for items-only spellcasting */
declare class ItemSpellcasting<TActor extends CreaturePF2e = CreaturePF2e> implements SpellcastingEntry<TActor> {
    id: string;
    name: string;
    actor: TActor;
    statistic: Statistic;
    tradition: MagicTradition | null;
    /** A predicate to test against a physical item to determine whether its contained spell can be cast */
    castPredicate: Predicate;
    constructor({ id, name, actor, statistic, tradition, castPredicate }: ItemsSpellcastingConstructorParams<TActor>);
    get counteraction(): Statistic;
    get attribute(): AttributeString;
    get category(): "items";
    get sort(): number;
    get spells(): null;
    get isFlexible(): false;
    get isFocusPool(): false;
    get isEphemeral(): true;
    canCast(spell: SpellPF2e, { origin }?: {
        origin?: Maybe<PhysicalItemPF2e>;
    }): boolean;
    cast(spell: SpellPF2e, options?: CastOptions): Promise<void>;
    getSheetData({ spells }?: {
        spells?: SpellCollection<TActor>;
    }): Promise<SpellcastingSheetData>;
}
interface ItemsSpellcastingConstructorParams<TActor extends CreaturePF2e> {
    id: string;
    name: string;
    actor: TActor;
    statistic: Statistic;
    tradition?: Maybe<MagicTradition>;
    castPredicate: Predicate;
}
export { ItemSpellcasting };

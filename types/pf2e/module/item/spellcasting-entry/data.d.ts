import { AttributeString } from "../../actor/types.ts";
import { BaseItemSourcePF2e, ItemSystemData, ItemSystemSource, OtherTagsOnly } from "../base/data/system.ts";
import { MagicTradition } from "../spell/types.ts";
import { OneToTen, ZeroToFour, ZeroToTen } from "../../data.ts";
import { RollNotePF2e } from "../../notes.ts";
import { SpellcastingCategory } from "./types.ts";

type SlotKey = `slot${ZeroToTen}`;
type SpellcastingEntrySource = BaseItemSourcePF2e<"spellcastingEntry", SpellcastingEntrySystemSource>;
interface SpellDifficultyClass {
    breakdown: string;
    notes: RollNotePF2e[];
    value: number;
}
interface SpellPrepData {
    id: string | null;
    expended: boolean;
}
interface SpellSlotData {
    prepared: SpellPrepData[];
    value: number;
    max: number;
}
interface SpellcastingEntrySystemSource extends ItemSystemSource {
    traits: OtherTagsOnly;
    ability: {
        value: AttributeString | "";
    };
    spelldc: {
        value: number;
        dc: number;
    };
    tradition: {
        value: MagicTradition | "";
    };
    prepared: SpellCollectionTypeSource;
    showSlotlessLevels: {
        value: boolean;
    };
    proficiency: {
        slug: string;
        value: ZeroToFour;
    };
    slots: SpellcastingEntrySlots;
    autoHeightenLevel: {
        value: OneToTen | null;
    };
    level?: never;
}
type SpellcastingEntrySlots = Record<SlotKey, SpellSlotData>;
interface SpellCollectionTypeSource {
    value: SpellcastingCategory;
    flexible?: boolean;
    validItems?: "scroll" | "" | null;
}
interface SpellcastingEntrySystemData extends Omit<SpellcastingEntrySystemSource, "description">, Omit<ItemSystemData, "level" | "traits"> {
    prepared: SpellCollectionTypeData;
}
interface SpellCollectionTypeData extends SpellCollectionTypeSource {
    flexible: boolean;
    validItems: "scroll" | null;
}
export type { SlotKey, SpellDifficultyClass, SpellcastingEntrySlots, SpellcastingEntrySource, SpellcastingEntrySystemData, SpellcastingEntrySystemSource, };

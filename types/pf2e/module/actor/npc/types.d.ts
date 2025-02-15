import { CreatureSheetData } from "../creature/sheet.ts";
import { HitPointsStatistic, TraitViewData } from "../data/base.ts";
import { AbilityViewData } from "../sheet/data-types.ts";
import { MovementType, SaveType, SkillSlug } from "../types.ts";
import { ItemPF2e } from "../../item/index.ts";
import { SpellcastingSheetData } from "../../item/spellcasting-entry/index.ts";
import { ZeroToFour } from "../../data.ts";
import { TagifyEntry } from "../../sheet/helpers.ts";
import { ArmorClassTraceData } from "../../system/statistic/index.ts";
import { NPCAttributes, NPCPerceptionData, NPCSaveData, NPCSkillData, NPCSystemData } from "./data.ts";
import { NPCPF2e, NPCStrike } from "./index.ts";

interface ActionsDetails {
    label: string;
    actions: AbilityViewData[];
}
interface NPCActionSheetData {
    passive: ActionsDetails;
    active: ActionsDetails;
}
/** Highlight such a statistic if adjusted by data preparation */
interface WithAdjustments {
    adjustedHigher?: boolean;
    adjustedLower?: boolean;
}
interface VariantCloneParams {
    name?: string;
    description?: string;
    img?: {
        actor?: ImageFilePath;
        token?: VideoFilePath;
    };
    save?: boolean;
    keepId?: boolean;
}
type WithRank = {
    icon?: string;
    hover?: string;
    rank: ZeroToFour;
};
type NPCSkillSheetData = NPCSkillData & WithAdjustments & WithRank;
interface NPCSystemSheetData extends NPCSystemData {
    perception: NPCPerceptionData & WithAdjustments & WithRank;
    attributes: NPCAttributes & {
        ac: ArmorClassTraceData & WithAdjustments;
        hp: HitPointsStatistic & WithAdjustments;
    };
    details: NPCSystemData["details"] & {
        level: NPCSystemData["details"]["level"] & WithAdjustments;
    };
    saves: Record<SaveType, NPCSaveData & WithAdjustments & WithRank & {
        labelShort?: string;
    }>;
    skills: Record<SkillSlug, NPCSkillSheetData>;
}
interface NPCStrikeSheetData {
    id: string;
    name: string;
    sort: number;
    breakdown: string;
    variants: NPCStrike["variants"];
    attackType: string;
    traits: TraitViewData[];
    description: string | null;
    /** The damage formula of the strike for display on sheets */
    damageFormula: string | null;
}
interface NPCSpellcastingSheetData extends SpellcastingSheetData {
    adjustedHigher?: {
        dc: boolean;
        mod: boolean;
    };
    adjustedLower?: {
        dc: boolean;
        mod: boolean;
    };
}
/** Additional fields added in sheet data preparation */
interface NPCSheetData extends CreatureSheetData<NPCPF2e> {
    attacks: NPCStrikeSheetData[];
    actions: NPCActionSheetData;
    data: NPCSystemSheetData;
    items: NPCSheetItemData<ItemPF2e<NPCPF2e>>[];
    spellcastingEntries: SpellcastingSheetData[];
    identificationDCs: NPCIdentificationSheetData;
    isNotCommon?: boolean;
    actorSize?: string;
    isWeak?: boolean;
    isElite?: boolean;
    eliteState: "active" | "inactive";
    weakState: "active" | "inactive";
    notAdjusted: boolean;
    hasShield?: boolean;
    hasHardness?: boolean;
    configLootableNpc?: boolean;
    traitTagifyData: TagifyEntry[];
    speeds: Record<"land", NPCSpeedSheetData & {
        details: string;
    }> & Record<Exclude<MovementType, "land">, NPCSpeedSheetData | null>;
}
interface NPCSpeedSheetData {
    value: number;
    label: string;
    adjustedHigher: boolean;
    adjustedLower: boolean;
}
type NPCSheetItemData<TItem extends ItemPF2e<NPCPF2e>> = Omit<RawObject<TItem>, "traits"> & {
    glyph: string;
    traits: {
        label: string;
        description?: string;
    }[];
    system: {
        bonus?: {
            value: number;
            total?: number;
        };
        isAgile?: boolean;
        prepared?: boolean;
        tradition?: {
            ritual: boolean;
            focus: boolean;
        };
        weaponType?: string;
    };
    hasAura: boolean;
};
interface NPCIdentificationSheetData {
    standard: string | null;
    lore: string;
}
export type { NPCActionSheetData, NPCIdentificationSheetData, NPCSheetData, NPCSheetItemData, NPCSkillSheetData, NPCSpeedSheetData, NPCSpellcastingSheetData, NPCStrikeSheetData, NPCSystemSheetData, VariantCloneParams, };

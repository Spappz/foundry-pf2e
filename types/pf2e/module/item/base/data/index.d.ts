import { AbilitySource } from "@item/ability/data.ts";
import { AfflictionSource } from "@item/affliction/data.ts";
import { AncestrySource } from "@item/ancestry/data.ts";
import { ArmorSource } from "@item/armor/data.ts";
import { BackgroundSource } from "@item/background/data.ts";
import { BookSource } from "@item/book/data.ts";
import { CampaignFeatureSource } from "@item/campaign-feature/data.ts";
import { ClassSource } from "@item/class/data.ts";
import { ConditionSource } from "@item/condition/data.ts";
import { ConsumableSource } from "@item/consumable/data.ts";
import { ContainerSource } from "@item/container/data.ts";
import { DeitySource } from "@item/deity/data.ts";
import { EffectSource } from "@item/effect/data.ts";
import { EquipmentSource } from "@item/equipment/data.ts";
import { FeatSource } from "@item/feat/data.ts";
import { HeritageSource } from "@item/heritage/data.ts";
import { KitSource } from "@item/kit/data.ts";
import { LoreSource } from "@item/lore.ts";
import { MeleeSource } from "@item/melee/data.ts";
import { PhysicalItemType } from "@item/physical/types.ts";
import { ShieldSource } from "@item/shield/data.ts";
import { SpellSource } from "@item/spell/data.ts";
import { SpellcastingEntrySource } from "@item/spellcasting-entry/data.ts";
import { TreasureSource } from "@item/treasure/data.ts";
import { WeaponSource } from "@item/weapon/data.ts";
import { PROFICIENCY_RANKS, Rarity } from "@module/data.ts";
import { ItemDescriptionData } from "./system.ts";
type ProficiencyRank = (typeof PROFICIENCY_RANKS)[number];
type NonPhysicalItemType =
    | "action"
    | "affliction"
    | "ancestry"
    | "background"
    | "campaignFeature"
    | "class"
    | "condition"
    | "deity"
    | "effect"
    | "feat"
    | "heritage"
    | "kit"
    | "lore"
    | "melee"
    | "spell"
    | "spellcastingEntry";
type ItemType = NonPhysicalItemType | PhysicalItemType;
type AbstractEffectSource = EffectSource | ConditionSource | AfflictionSource;
type PhysicalItemSource =
    | ArmorSource
    | BookSource
    | ConsumableSource
    | ContainerSource
    | EquipmentSource
    | ShieldSource
    | TreasureSource
    | WeaponSource;
type ItemSourcePF2e =
    | PhysicalItemSource
    | AbstractEffectSource
    | AbilitySource
    | AncestrySource
    | BackgroundSource
    | CampaignFeatureSource
    | ClassSource
    | DeitySource
    | FeatSource
    | HeritageSource
    | KitSource
    | LoreSource
    | MeleeSource
    | SpellSource
    | SpellcastingEntrySource;
type MagicItemSource = Exclude<PhysicalItemSource, ConsumableSource | TreasureSource>;
interface RawItemChatData {
    [key: string]: unknown;
    description: ItemDescriptionData;
    rarity?: {
        slug: Rarity;
        label: string;
        description: string;
    } | null;
    traits?: TraitChatData[];
    properties?: string[];
}
interface TraitChatData {
    value: string;
    label: string;
    description?: string;
    mystified?: boolean;
    excluded?: boolean;
}
export type {
    ActionCost,
    ActionType,
    Frequency,
    FrequencyInterval,
    FrequencySource,
    ItemFlagsPF2e,
    ItemSystemData,
} from "./system.ts";
export type {
    AbilitySource,
    AbstractEffectSource,
    AncestrySource,
    ArmorSource,
    BackgroundSource,
    BookSource,
    ClassSource,
    ConditionSource,
    ConsumableSource,
    ContainerSource,
    DeitySource,
    EffectSource,
    EquipmentSource,
    FeatSource,
    ItemSourcePF2e,
    ItemType,
    KitSource,
    LoreSource,
    MagicItemSource,
    MeleeSource,
    NonPhysicalItemType,
    PhysicalItemSource,
    ProficiencyRank,
    RawItemChatData,
    ShieldSource,
    SpellcastingEntrySource,
    SpellSource,
    TraitChatData,
    TreasureSource,
    WeaponSource,
};

import { Language, SenseAcuity, SenseType } from "../../actor/creature/types.ts";
import { AttributeString, SaveType } from "../../actor/types.ts";
import { SelfEffectReference, SelfEffectReferenceSource } from "../ability/index.ts";
import { AbilityTraitToggles } from "../ability/trait-toggles.ts";
import { ArmorCategory } from "../armor/types.ts";
import { ActionType, BaseItemSourcePF2e, Frequency, FrequencySource, ItemSystemData, ItemSystemSource, ItemTraits } from "../base/data/system.ts";
import { ClassTrait } from "../class/types.ts";
import { WeaponCategory } from "../weapon/types.ts";
import { OneToFour, OneToThree } from "../../data.ts";
import { FeatOrFeatureCategory, FeatTrait } from "./types.ts";

type FeatSource = BaseItemSourcePF2e<"feat", FeatSystemSource>;
interface PrerequisiteTagData {
    value: string;
}
interface FeatSystemSource extends ItemSystemSource {
    level: FeatLevelSource;
    traits: FeatTraitsSource;
    /** The category of feat or feature of this item */
    category: FeatOrFeatureCategory;
    /** Whether this feat must be taken at character level 1 */
    onlyLevel1: boolean;
    /** The maximum number of times this feat can be taken by a character. A value of `null` indicates no limit */
    maxTakable: number | null;
    actionType: {
        value: ActionType;
    };
    actions: {
        value: OneToThree | null;
    };
    prerequisites: {
        value: PrerequisiteTagData[];
    };
    location: string | null;
    frequency?: FrequencySource;
    subfeatures?: Partial<FeatSubfeatures>;
    /** A self-applied effect for simple actions */
    selfEffect?: SelfEffectReferenceSource | null;
}
interface FeatLevelSource {
    value: number;
    taken?: number | null;
}
interface FeatTraitsSource extends ItemTraits<FeatTrait> {
    toggles?: {
        mindshift?: {
            selected?: boolean;
        } | null;
    };
}
interface FeatSystemData extends Omit<FeatSystemSource, "description" | "maxTaken">, ItemSystemData {
    level: FeatLevelData;
    traits: FeatTraits;
    /** `null` is set to `Infinity` during data preparation */
    maxTakable: number;
    frequency?: Frequency;
    subfeatures: FeatSubfeatures;
    /** A self-applied effect for simple actions */
    selfEffect: SelfEffectReference | null;
}
interface FeatLevelData extends Required<FeatLevelSource> {
}
interface FeatTraits extends FeatTraitsSource {
    toggles: AbilityTraitToggles;
}
interface FeatSubfeatures {
    keyOptions: AttributeString[];
    languages: LanguagesSubfeature;
    proficiencies: {
        [K in IncreasableProficiency]?: {
            rank: OneToFour;
            attribute?: AttributeString | null;
        };
    };
    senses: {
        [K in SenseType]?: SenseSubfeature;
    };
    suppressedFeatures: ItemUUID[];
}
interface LanguagesSubfeature {
    /** A number of open slots fillable with any language */
    slots: number;
    /** Additional specific languages the character knows */
    granted: Language[];
}
interface SenseSubfeature {
    acuity?: SenseAcuity;
    /** The radius of the sense in feet: `null` indicates no limit. */
    range?: number | null;
    /** "Special" clauses for darkvision */
    special?: {
        /** Only grant darkvision if the PC's ancestry grants low-light vision. */
        ancestry: boolean;
        /**
         * Grant darkvision if the PC has low-light vision from any prior source (ancestry, earlier feats, etc.). This
         * option is mutually exclusive with `ancestry`.
         */
        llv: boolean;
        /** Grant darkvision if this feat is taken a second time. */
        second: boolean;
    };
}
type IncreasableProficiency = ArmorCategory | ClassTrait | SaveType | WeaponCategory | "perception" | "spellcasting";
export type { FeatSource, FeatSubfeatures, FeatSystemData, FeatSystemSource, FeatTraits, PrerequisiteTagData };

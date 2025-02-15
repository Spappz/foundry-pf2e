import { BasePhysicalItemSource, PhysicalItemTraits, PhysicalSystemData, PhysicalSystemSource } from "../physical/data.ts";
import { SpellSource } from "../spell/data.ts";
import { DamageKind, DamageType } from "../../system/damage/index.ts";
import { AmmoStackGroup, ConsumableCategory, ConsumableTrait, OtherConsumableTag } from "./types.ts";

type ConsumableSource = BasePhysicalItemSource<"consumable", ConsumableSystemSource>;
interface ConsumableTraits extends PhysicalItemTraits<ConsumableTrait> {
    otherTags: OtherConsumableTag[];
}
interface ConsumableSystemSource extends PhysicalSystemSource {
    apex?: never;
    traits: ConsumableTraits;
    category: ConsumableCategory;
    uses: ConsumableUses;
    /** A formula for a healing or damage roll */
    damage: ConsumableDamageHealing | null;
    spell: SpellSource | null;
    usage: {
        value: string;
    };
    stackGroup: AmmoStackGroup | null;
    subitems?: never;
}
type ConsumableUses = {
    value: number;
    max: number;
    /** Whether to delete the consumable upon use if it has no remaining uses and a quantity of 1 */
    autoDestroy: boolean;
};
type ConsumableDamageHealing = {
    formula: string;
    type: DamageType;
    kind: DamageKind;
};
interface ConsumableSystemData extends Omit<ConsumableSystemSource, SourceOmission>, Omit<PhysicalSystemData, "subitems" | "traits"> {
    apex?: never;
    stackGroup: AmmoStackGroup | null;
}
type SourceOmission = "bulk" | "description" | "hp" | "identification" | "material" | "price" | "temporary" | "usage";
export type { ConsumableDamageHealing, ConsumableSource, ConsumableSystemData, ConsumableSystemSource, ConsumableTrait, };

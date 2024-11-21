import { AttributeString, SkillSlug } from '../../actor/types.ts';
import { BaseItemSourcePF2e, ItemSystemData, ItemSystemSource, OtherTagsOnly } from '../base/data/system.ts';
import { BaseWeaponType } from '../weapon/types.ts';
import { DeityDomain, Sanctification } from './types.ts';
type DeitySource = BaseItemSourcePF2e<"deity", DeitySystemSource>;
type DeitySystemSource = ItemSystemSource & {
    category: DeityCategory;
    sanctification: DeitySanctification | null;
    domains: {
        primary: DeityDomain[];
        alternate: DeityDomain[];
    };
    font: DivineFonts;
    attribute: AttributeString[];
    skill: SkillSlug[] | null;
    weapons: BaseWeaponType[];
    spells: Record<number, ItemUUID>;
    level?: never;
    traits: OtherTagsOnly;
};
type DeityCategory = "deity" | "pantheon" | "covenant" | "philosophy";
type DeitySanctification = {
    modal: "can" | "must";
    what: Sanctification[];
};
type DivineFonts = ["harm"] | ["heal"] | ["harm", "heal"] | never[];
interface DeitySystemData extends Omit<DeitySystemSource, "description">, Omit<ItemSystemData, "level" | "traits"> {
}
export type { DeityCategory, DeitySanctification, DeitySource, DeitySystemData, DeitySystemSource };

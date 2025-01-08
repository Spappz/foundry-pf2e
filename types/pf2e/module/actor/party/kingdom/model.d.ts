import { ArmyPF2e, PartyPF2e } from "../../index.ts";
import { FeatGroup } from "../../character/feats/index.ts";
import { RawModifier } from "../../modifiers.ts";
import { CampaignFeaturePF2e } from "../../../item/index.ts";
import { ItemType } from "../../../item/base/data/index.ts";
import { Statistic } from "../../../system/statistic/index.ts";
import { PartySystemData } from "../data.ts";
import { PartyCampaign } from "../types.ts";
import { KingdomCHG, KingdomCharter, KingdomData, KingdomGovernment, KingdomSchema, KingdomSource } from "./schema.ts";
import { KingdomNationType, KingdomSkill } from "./types.ts";

import DataModel = foundry.abstract.DataModel;
/** Model for the Kingmaker campaign data type, which represents a Kingdom */
declare class Kingdom extends DataModel<PartySystemData, KingdomSchema> implements PartyCampaign {
    nationType: KingdomNationType;
    features: FeatGroup<PartyPF2e, CampaignFeaturePF2e>;
    feats: FeatGroup<PartyPF2e, CampaignFeaturePF2e>;
    bonusFeats: FeatGroup<PartyPF2e, CampaignFeaturePF2e>;
    skills: Record<KingdomSkill, Statistic>;
    control: Statistic;
    armies: ArmyPF2e[];
    static defineSchema(): KingdomSchema;
    get actor(): PartyPF2e;
    get extraItemTypes(): ItemType[];
    get activities(): CampaignFeaturePF2e[];
    get charter(): KingdomCharter | null;
    get heartland(): KingdomCHG | null;
    get government(): KingdomGovernment | null;
    /** Creates sidebar buttons to inject into the chat message sidebar */
    createSidebarButtons(): HTMLElement[];
    /** Perform the collection portion of the upkeep phase */
    collect(): Promise<void>;
    /**
     * Adds a custom modifier that will be included when determining the final value of a stat. The slug generated by
     * the name parameter must be unique for the custom modifiers for the specified stat, or it will be ignored.
     */
    addCustomModifier(stat: string, data: RawModifier): Promise<void>;
    /** Removes a custom modifier by slug */
    removeCustomModifier(stat: string, slug: string): Promise<void>;
    /**
     * Updates the party's campaign data. All data is scoped to system.campaign unless it is already in system.campaign.
     * Scoping to system.campaign is necessary for certain sheet listeners such as data-property.
     */
    update(data: DeepPartial<KingdomSource> & Record<string, unknown>): Promise<void>;
    /** Resets kingdom data preparation and re-renders all party actor sheets, which includes the kingmaker sheet */
    notifyUpdate: () => void;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    getRollOptions(): string[];
    getRollData(): Record<string, unknown>;
    importActivities({ skipDialog }?: {
        skipDialog?: boolean;
    }): Promise<void>;
    /** Adds/removes kingdom features as appropriate. Private instead of # because # explodes */
    private updateFeatures;
    getStatistic(slug: string): Statistic | null;
    renderSheet(options?: {
        tab?: string;
        type?: "builder" | null;
    }): void;
    _preUpdate(changed: DeepPartial<KingdomSource>): void;
}
interface Kingdom extends DataModel<PartySystemData, KingdomSchema>, KingdomData {
}
export { Kingdom };

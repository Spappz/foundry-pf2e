import { ActorPF2e } from "../../index.ts";
import { ItemPF2e } from "../../../item/index.ts";
import { Kingdom } from "./model.ts";
import { KingdomCHG } from "./schema.ts";
import { KingdomAbility, KingdomCommodity } from "./types.ts";

/** Resolves boosts using kingmaker rules. Free boosts cannot be the granted ability nor the flaw */
declare function resolveKingdomBoosts(entry: KingdomCHG, choices: KingdomAbility[]): KingdomAbility[];
/** Assemble what will be collected during the kingdom's upkeep phase */
declare function calculateKingdomCollectionData(kingdom: Kingdom): {
    formula: string;
    commodities: Record<Exclude<KingdomCommodity, "food">, number>;
};
declare function importDocuments(actor: ActorPF2e, items: ItemPF2e[], skipDialog: boolean): Promise<void>;
export { calculateKingdomCollectionData, importDocuments, resolveKingdomBoosts };

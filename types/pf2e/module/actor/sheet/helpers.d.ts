import { ActorPF2e } from "./../index.ts";
import { Sense } from "./../creature/sense.ts";
import { AbilityItemPF2e, FeatPF2e, PhysicalItemPF2e } from "./../../item/index.ts";
import { AbilityViewData } from "./data-types.ts";
declare function onClickCreateSpell(actor: ActorPF2e, data: Record<string, string | undefined>): void;
/** Create a price label like "L / 10" when appropriate. */
declare function createBulkPerLabel(item: PhysicalItemPF2e): string;
/** Returns a sense list with all redundant senses removed (such as low light vision on actors with darkvision) */
declare function condenseSenses(senses: Sense[]): Sense[];
/** Creates ability or feat view data for actor sheet actions rendering */
declare function createAbilityViewData(item: AbilityItemPF2e | FeatPF2e): AbilityViewData;
/**
 * Applies a delta change to the numeric value of an input element. If the input field has a min or max data property,
 * the delta change is limited to those values.
 *
 * @param input reference to the input field
 * @param delta the amount of change to apply to the input's current value
 */
declare function applyDeltaToInput(input: HTMLInputElement, delta: number): void;
export { applyDeltaToInput, condenseSenses, createAbilityViewData, createBulkPerLabel, onClickCreateSpell };

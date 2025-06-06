import { AbstractEffectPF2e } from "@item/index.ts";
import { DurationData } from "./data.ts";
export declare function calculateRemainingDuration(
    effect: AbstractEffectPF2e,
    durationData: DurationData,
): {
    expired: boolean;
    remaining: number;
};

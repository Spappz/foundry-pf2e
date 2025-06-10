import { ActorPF2e } from "./actor/index.ts";
import { DatabaseCreateCallbackOptions } from "./../../foundry/common/abstract/_types.mjs";
import { AbstractEffectPF2e, ItemPF2e } from "./item/index.ts";
export declare class ActiveEffectPF2e<TParent extends ActorPF2e | ItemPF2e | null> extends ActiveEffect<TParent> {
    /** Create an active effect from an (abstract) effect for use in token effect icons */
    static fromEffect<TActor extends ActorPF2e>(effect: AbstractEffectPF2e<TActor>): ActiveEffectPF2e<TActor>;
    protected _preCreate(
        data: this["_source"],
        options: DatabaseCreateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
}

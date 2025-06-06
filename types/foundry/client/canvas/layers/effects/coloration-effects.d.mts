import VisualEffectsMaskingFilter from "@client/canvas/rendering/filters/effects-masking.mjs";
import CanvasLayer from "../base/canvas-layer.mjs";

/**
 * A CanvasLayer for displaying coloration visual effects
 */
export default class CanvasColorationEffects extends CanvasLayer {
    constructor();

    /**
     * Temporary solution for the "white scene" bug (foundryvtt/foundryvtt#9957).
     */
    #background: PIXI.Graphics;

    /**
     * The filter used to mask visual effects on this layer
     */
    filter: VisualEffectsMaskingFilter;

    /**
     * Clear coloration effects container
     */
    clear(): void;

    protected override _draw(options?: object): Promise<void>;

    protected override _tearDown(options?: object): Promise<void>;
}

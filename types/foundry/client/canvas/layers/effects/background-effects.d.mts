import CanvasLayer from "../base/canvas-layer.mjs";

/**
 * A layer of background alteration effects which change the appearance of the primary group render texture.
 */
export default class CanvasBackgroundAlterationEffects extends CanvasLayer {
    constructor();

    protected override _draw(options?: object): Promise<void>;

    protected override _tearDown(options?: object): Promise<void>;

    /**
     * Clear background alteration effects vision and lighting containers
     */
    clear(): void;
}

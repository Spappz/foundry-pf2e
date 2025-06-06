import CanvasLayer from "../base/canvas-layer.mjs";
import VoidFilter from "../../rendering/filters/void.mjs";

/**
 * A layer of background alteration effects which change the appearance of the primary group render texture.
 */
export default class CanvasDarknessEffects extends CanvasLayer {
    constructor();

    /**
     * Clear coloration effects container
     */
    clear(): void;

    protected override _draw(options?: object): Promise<void>;
}

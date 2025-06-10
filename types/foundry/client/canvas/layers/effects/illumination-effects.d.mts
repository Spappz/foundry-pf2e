import CanvasLayer from "../base/canvas-layer.mjs";
import SpriteMesh from "../../containers/elements/sprite-mesh.mjs";
import PointSourceMesh from "../../containers/elements/point-source-mesh.mjs";
import CachedContainer from "../../containers/advanced/cached-container.mjs";
import BaselineIlluminationSamplerShader from "../../rendering/shaders/samplers/baseline-illumination.mjs";
import { VisualEffectsMaskingFilter } from "./../../../canvas/rendering/filters/_module.mjs";

/**
 * A CanvasLayer for displaying illumination visual effects
 * @category Canvas
 */
export default class CanvasIlluminationEffects extends CanvasLayer {
    constructor();

    /**
     * The filter used to mask visual effects on this layer
     */
    filter: VisualEffectsMaskingFilter;

    /**
     * The container holding the lights.
     */
    lights: PIXI.Container;

    /**
     * The base line mesh.
     */
    baselineMesh: SpriteMesh;

    /**
     * The cached container holding the illumination meshes.
     */
    darknessLevelMeshes: CachedContainer;

    /**
     * To know if dynamic darkness level is active on this scene.
     */
    get hasDynamicDarknessLevel(): boolean;

    /**
     * The illumination render texture.
     */
    get renderTexture(): PIXI.RenderTexture;

    /**
     * Initialize the layer.
     */
    #initialize(): void;

    /**
     * Clear illumination effects container
     */
    clear(): void;

    /**
     * Invalidate the cached container state to trigger a render pass.
     * @param force Force cached container invalidation?
     */
    invalidateDarknessLevelContainer(force?: boolean): void;

    protected override _draw(options?: object): Promise<void>;

    protected override _tearDown(options?: object): Promise<void>;
}

/**
 * Cached container used for dynamic darkness level. Display objects (of any type) added to this cached container will
 * contribute to computing the darkness level of the masked area. Only the red channel is utilized, which corresponds
 * to the desired darkness level. Other channels are ignored.
 */
export class DarknessLevelContainer extends CachedContainer {
    constructor(sprite: PIXI.Sprite | SpriteMesh);

    static textureConfiguration: {
        multisample: PIXI.MSAA_QUALITY;
        scaleMode: PIXI.SCALE_MODES;
        format: PIXI.FORMATS;
        mipmap?: PIXI.MIPMAP_MODES;
    };

    /**
     * Called when a display object is added or removed from this container.
     */
    #onChildChange(): void;
}

import FullCanvasObjectMixin from "../../containers/advanced/full-canvas-mixin.mjs";
import CanvasLayer, { CanvasLayerOptions } from "../base/canvas-layer.mjs";
import VoidFilter from "../../rendering/filters/void.mjs";
import WeatherOcclusionMaskFilter from "../../rendering/filters/weather-occlusion-mask.mjs";
import { ParticleEffect } from "@client/canvas/containers/_module.mjs";
import { WeatherShaderEffect } from "@client/canvas/rendering/shaders/_module.mjs";

/**
 * A CanvasLayer for displaying visual effects like weather, transitions, flashes, or more.
 */
export default class WeatherEffects extends FullCanvasObjectMixin(CanvasLayer) {
    constructor();

    /**
     * The container in which effects are added.
     */
    weatherEffects: PIXI.Container;

    /**
     * The container in which suppression meshed are added.
     */
    suppression: PIXI.Container;

    /**
     * Initialize the inverse occlusion and the void filters.
     */
    #initializeFilters(): void;

    /** Customize behaviors of this CanvasLayer by modifying some behaviors at a class level. */
    static get layerOptions(): CanvasLayerOptions;

    /**
     * Array of weather effects linked to this weather container.
     */
    effects: Map<string, (ParticleEffect | WeatherShaderEffect)[]>;

    /**
     * A default configuration of the terrain mask that is automatically applied to any shader-based weather effects.
     * This configuration is automatically passed to WeatherShaderEffect#configureTerrainMask upon construction.
     */
    terrainMaskConfig: WeatherTerrainMaskConfiguration;

    /**
     * A default configuration of the terrain mask that is automatically applied to any shader-based weather effects.
     * This configuration is automatically passed to WeatherShaderEffect#configureTerrainMask upon construction.
     */
    occlusionMaskConfig: WeatherOcclusionMaskConfiguration;

    /**
     * The inverse occlusion mask filter bound to this container.
     */
    occlusionFilter: WeatherOcclusionMaskFilter;

    /**
     * The filter that is needed for suppression if the occlusion filter isn't enabled.
     */
    #suppressionFilter: VoidFilter;

    /**
     * The elevation of this object.
     */
    get elevation(): number;

    set elevation(value: number);

    #elevation: number;

    /**
     * A key which resolves ties amongst objects at the same elevation of different layers.
     */
    get sortLayer(): number;

    set sortLayer(value: number);

    #sortLayer: number;

    /**
     * A key which resolves ties amongst objects at the same elevation within the same layer.
     */
    get sort(): number;

    set sort(value: number);

    #sort: number;

    /**
     * A key which resolves ties amongst objects at the same elevation within the same layer and same sort.
     */
    get zIndex(): number;

    set zIndex(value: number);

    /*  Weather Effect Rendering                    */

    override _draw(options?: object): Promise<void>;

    _tearDown(options?: object): Promise<void>;

    /*  Weather Effect Management                   */

    /**
     * Initialize the weather container from a weather config object.
     * @param weatherEffectsConfig Weather config object (or null/undefined to clear the container).
     */
    initializeEffects(weatherEffectsConfig: object): void;

    /**
     * Clear the weather container.
     */
    clearEffects(): void;

    /**
     * Destroy all effects associated with this weather container.
     */
    #destroyEffects(): void;

    /**
     * Construct effects according to the weather effects config object.
     * @param weatherEffectsConfig Weather config object (or null/undefined to clear the container).
     */
    #constructEffects(weatherEffectsConfig: object): void;

    /**
     * Set the occlusion uniforms for this weather shader.
     * @param context The shader context
     * @param config Occlusion masking options
     */
    static configureOcclusionMask(context: PIXI.Shader, config?: WeatherOcclusionMaskConfiguration): void;

    /**
     * Set the terrain uniforms for this weather shader.
     * @param context The shader context
     * @param  config Terrain masking options
     */
    static configureTerrainMask(context: PIXI.Shader, config?: WeatherTerrainMaskConfiguration): void;
}

export interface WeatherTerrainMaskConfiguration {
    /** Enable or disable this mask. */
    enabled: boolean;
    /** An RGBA array of channel weights applied to the mask texture. */
    channelWeights: number[];
    /** If the mask should be reversed. */
    reverse?: boolean;
    /** A texture which defines the mask region. */
    texture: PIXI.Texture | PIXI.RenderTexture;
}

export interface WeatherOcclusionMaskConfiguration {
    /** Enable or disable this mask. */
    enabled: boolean;
    /** An RGBA array of channel weights applied to the mask texture. */
    channelWeights: number[];
    /** If the mask should be reversed. */
    reverse?: boolean;
    /** A texture which defines the mask region. */
    texture: PIXI.Texture | PIXI.RenderTexture;
}

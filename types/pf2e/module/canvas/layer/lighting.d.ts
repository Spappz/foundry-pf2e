import { AmbientLightPF2e } from "../ambient-light.ts";

export declare class LightingLayerPF2e<TAmbientLight extends AmbientLightPF2e = AmbientLightPF2e> extends LightingLayer<TAmbientLight> {
    get lightingLevel(): number;
}

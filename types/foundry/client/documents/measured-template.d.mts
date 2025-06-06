import MeasuredTemplateConfig from "@client/applications/sheets/template-config.mjs";
import MeasuredTemplate from "../canvas/placeables/template.mjs";
import { BaseMeasuredTemplate, Scene } from "./_module.mjs";
import { CanvasDocument, CanvasDocumentStatic } from "./abstract/canvas-document.mjs";

interface CanvasBaseMeasuredTemplateStatic extends Omit<typeof BaseMeasuredTemplate, "new">, CanvasDocumentStatic {}

declare const CanvasBaseMeasuredTemplate: {
    new <TParent extends Scene | null>(...args: any): BaseMeasuredTemplate<TParent> & CanvasDocument<TParent>;
} & CanvasBaseMeasuredTemplateStatic;

interface CanvasBaseMeasuredTemplate<TParent extends Scene | null>
    extends InstanceType<typeof CanvasBaseMeasuredTemplate<TParent>> {}

/**
 * The client-side MeasuredTemplate document which extends the common BaseMeasuredTemplate document model.
 */
export default class MeasuredTemplateDocument<
    TParent extends Scene | null = Scene | null,
> extends CanvasBaseMeasuredTemplate<TParent> {
    /**
     * Rotation is an alias for direction
     */
    get rotation(): number;

    /**
     * Is the current User the author of this template?
     */
    get isAuthor(): boolean;
}

export default interface MeasuredTemplateDocument<TParent extends Scene | null = Scene | null>
    extends CanvasBaseMeasuredTemplate<TParent> {
    get sheet(): MeasuredTemplateConfig | null;
    get object(): MeasuredTemplate<this> | null;
}

export {};

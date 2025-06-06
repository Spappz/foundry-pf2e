import {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
    DocumentSheetV2,
    HandlebarsApplicationMixin,
    HandlebarsRenderOptions,
    HandlebarsTemplatePart,
} from "../api/_module.mjs";

/**
 * The Application responsible for configuring a single MeasuredTemplate document within a parent Scene.
 */
export default class MeasuredTemplateConfig extends HandlebarsApplicationMixin(DocumentSheetV2) {
    static override DEFAULT_OPTIONS: DeepPartial<DocumentSheetConfiguration>;

    static override PARTS: Record<string, HandlebarsTemplatePart>;

    protected override _prepareContext(options: HandlebarsRenderOptions): Promise<DocumentSheetRenderContext>;
}

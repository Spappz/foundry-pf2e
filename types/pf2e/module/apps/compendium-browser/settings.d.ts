import type { PackInfo, TabName } from "./data.ts";

declare class CompendiumBrowserSettingsApp extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    #tabSettings: Record<TabName, CompendiumBrowserSettingsData>;

    static override DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;

    static override PARTS: Record<string, fa.api.HandlebarsTemplatePart>;

    override tabGroups: Record<string, string>;

    protected override _preFirstRender(
        context: Record<string, unknown>,
        options: fa.ApplicationRenderOptions,
    ): Promise<void>;

    protected override _attachPartListeners(
        partId: string,
        html: HTMLElement,
        options: fa.api.HandlebarsRenderOptions,
    ): void;

    protected override _prepareContext(_options: fa.api.HandlebarsRenderOptions): Promise<object>;

    static #onSubmit(_event: Event, _form: HTMLFormElement, formData: fa.ux.FormDataExtended): Promise<void>;
}

interface CompendiumBrowserSettingsData {
    label: string;
    settings?: Record<string, PackInfo | undefined> | null;
    hidden?: boolean;
}

export { CompendiumBrowserSettingsApp };

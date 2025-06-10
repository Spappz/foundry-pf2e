import type { ActorPF2e } from "./../actor/index.ts";
import type { HandlebarsRenderOptions } from "./../../../foundry/client/applications/api/handlebars-application.d.mts";
import { AbstractEffectPF2e, AfflictionPF2e, ConditionPF2e, EffectPF2e } from "./../item/index.ts";
import type { TokenDocumentPF2e } from "./../scene/token-document/document.ts";

export class EffectsPanel extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    get #token(): TokenDocumentPF2e | null;

    get #actor(): ActorPF2e | null;

    /**
     * Debounce and slightly delayed request to re-render this panel. Necessary for situations where it is not possible
     * to properly wait for promises to resolve before refreshing the UI.
     */
    refresh: EffectsPanel["render"];

    static override DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;

    static override PARTS: Record<string, fa.api.HandlebarsTemplatePart>;

    static #onClickHandleClick(this: EffectsPanel, event: PointerEvent, effectEl: HTMLDivElement): Promise<void>;

    protected override _prepareContext(): Promise<EffectsPanelViewData>;

    #getRemainingDurationLabel(effect: EffectPF2e): string;

    #getViewData(effects: AfflictionPF2e[] | EffectPF2e[] | ConditionPF2e[]): Promise<EffectViewData[]>;

    protected override _onFirstRender(context: EffectsPanelViewData, options: HandlebarsRenderOptions): Promise<void>;

    /** Move the panel to the right interface column. */
    override _onRender(context: object, options: HandlebarsRenderOptions): Promise<void>;
}

interface EffectsPanelViewData {
    afflictions: EffectViewData[];
    conditions: EffectViewData[];
    effects: EffectViewData[];
    actor: ActorPF2e | null;
    user: { isGM: boolean };
}

interface EffectViewData {
    effect: AbstractEffectPF2e;
    description: string;
    remaining: string | null;
}

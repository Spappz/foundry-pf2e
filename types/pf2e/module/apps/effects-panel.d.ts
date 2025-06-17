import { ActorPF2e } from "./../actor/index.ts";
import { HandlebarsRenderOptions } from "./../../../foundry/client/applications/api/handlebars-application.mjs";
import { AbstractEffectPF2e } from "./../item/index.ts";
declare const EffectsPanel_base: ((abstract new (...args: any[]) => {
    readonly parts: Record<string, HTMLElement>;
    _configureRenderOptions(options: HandlebarsRenderOptions): void;
    _configureRenderParts(options: HandlebarsRenderOptions): Record<string, fa.api.HandlebarsTemplatePart>;
    _renderHTML(context: object, options: HandlebarsRenderOptions): Promise<Record<string, HTMLElement>>;
    _preparePartContext(
        partId: string,
        context: fa.ApplicationRenderContext,
        options: HandlebarsRenderOptions,
    ): Promise<fa.ApplicationRenderContext>;
    _replaceHTML(result: Record<string, HTMLElement>, content: HTMLElement, options: HandlebarsRenderOptions): void;
    _preSyncPartState(partId: string, newElement: HTMLElement, priorElement: HTMLElement, state: object): void;
    _syncPartState(partId: string, newElement: HTMLElement, priorElement: HTMLElement, state: object): void;
    _attachPartListeners(partId: string, htmlElement: HTMLElement, options: HandlebarsRenderOptions): void;
    options: fa.ApplicationConfiguration;
    readonly window: {
        header: HTMLElement;
        title: HTMLHeadingElement;
        icon: HTMLElement;
        close: HTMLButtonElement;
        controls: HTMLButtonElement;
        controlsDropdown: HTMLDivElement;
        onDrag: (event: DragEvent) => void;
        onResize: (event: DragEvent) => void;
        pointerStartPosition: fa.ApplicationPosition;
        pointerMoveThrottle: boolean;
    };
    tabGroups: Record<string, string>;
    readonly classList: DOMTokenList;
    readonly id: string;
    readonly title: string;
    readonly element: HTMLElement;
    readonly form: HTMLFormElement | null;
    readonly minimized: boolean;
    position: fa.ApplicationPosition;
    readonly rendered: boolean;
    readonly state: number;
    readonly hasFrame: boolean;
    _initializeApplicationOptions(options: {
        id?: string | undefined;
        uniqueId?: string | undefined;
        classes?: string[] | undefined;
        tag?: string | undefined;
        window?:
            | {
                  frame?: boolean | undefined;
                  positioned?: boolean | undefined;
                  title?: string | undefined;
                  icon?: string | false | undefined;
                  controls?:
                      | {
                            icon?: string | undefined;
                            label?: string | undefined;
                            action?: string | undefined;
                            visible?: boolean | undefined;
                        }[]
                      | undefined;
                  minimizable?: boolean | undefined;
                  resizable?: boolean | undefined;
                  contentTag?: string | undefined;
                  contentClasses?: string[] | undefined;
              }
            | undefined;
        actions?:
            | {
                  [x: string]:
                      | {}
                      | {
                            handler?: {} | undefined;
                            buttons?: number[] | undefined;
                        }
                      | undefined;
              }
            | undefined;
        form?:
            | {
                  handler?: {} | undefined;
                  submitOnChange?: boolean | undefined;
                  closeOnSubmit?: boolean | undefined;
              }
            | undefined;
        position?:
            | {
                  top?: number | undefined;
                  left?: number | undefined;
                  width?: number | "auto" | undefined;
                  height?: number | "auto" | undefined;
                  scale?: number | undefined;
                  zIndex?: number | undefined;
              }
            | undefined;
    }): fa.ApplicationConfiguration;
    render(
        options?:
            | boolean
            | {
                  force?: boolean | undefined;
                  position?:
                      | {
                            top?: number | undefined;
                            left?: number | undefined;
                            width?: number | "auto" | undefined;
                            height?: number | "auto" | undefined;
                            scale?: number | undefined;
                            zIndex?: number | undefined;
                        }
                      | undefined;
                  window?:
                      | {
                            title?: string | undefined;
                            icon?: string | false | undefined;
                            controls?: boolean | undefined;
                        }
                      | undefined;
                  isFirstRender?: boolean | undefined;
              }
            | undefined,
    ): Promise</* elided*/ any>;
    _prepareContext(options: fa.ApplicationRenderOptions): Promise<object>;
    _prepareTabs(group: string): Record<string, fa.ApplicationTab>;
    _getTabsConfig(group: string): fa.ApplicationTabsConfiguration | null;
    _getHeaderControls(): fa.ApplicationHeaderControlsEntry[];
    _headerControlButtons(): Generator<fa.ApplicationHeaderControlsEntry>;
    _renderFrame(options: fa.ApplicationRenderOptions): Promise<HTMLElement>;
    _renderHeaderControl(control: fa.ApplicationHeaderControlsEntry): HTMLLIElement;
    _updateFrame(options: fa.ApplicationRenderOptions): void;
    _insertElement(element: HTMLElement): void;
    close(options?: fa.ApplicationClosingOptions): Promise<fa.api.ApplicationV2>;
    _removeElement(element: HTMLElement): void;
    _tearDown(options: fa.ApplicationClosingOptions): void;
    setPosition(position?: Partial<fa.ApplicationPosition>): fa.ApplicationPosition;
    _updatePosition(position: fa.ApplicationPosition): fa.ApplicationPosition;
    toggleControls(expanded?: boolean): void;
    minimize(): Promise<void>;
    maximize(): Promise<void>;
    bringToFront(): void;
    changeTab(
        tab: string,
        group: string,
        options?: {
            event?: Event;
            navElement?: HTMLElement;
            force?: boolean;
            updatePosition?: boolean;
        },
    ): void;
    submit(submitOptions?: object): Promise<unknown>;
    _canRender(options: fa.ApplicationRenderOptions): boolean | void;
    _preFirstRender(context: Record<string, unknown>, options: fa.ApplicationRenderOptions): Promise<void>;
    _onFirstRender(context: object, options: fa.ApplicationRenderOptions): void;
    _preRender(context: object, options: fa.ApplicationRenderOptions): Promise<void>;
    _onRender(context: object, options: fa.ApplicationRenderOptions): Promise<void>;
    _preClose(options: fa.ApplicationClosingOptions): Promise<void>;
    _onClose(options: fa.ApplicationClosingOptions): void;
    _prePosition(position: fa.ApplicationPosition): void;
    _onPosition(position: fa.ApplicationPosition): void;
    _attachFrameListeners(): void;
    _onClickTab(event: PointerEvent): void;
    _onClickAction(event: PointerEvent, target: HTMLElement): void;
    _onSubmitForm(formConfig: fa.ApplicationFormConfiguration, event: Event | SubmitEvent): Promise<void>;
    _onChangeForm(formConfig: fa.ApplicationFormConfiguration, event: Event): void;
    _awaitTransition(element: HTMLElement, timeout: number): Promise<void>;
    _createContextMenu(
        handler: () => import("./../../../foundry/client/applications/ux/context-menu.mjs").ContextMenuEntry[],
        selector: string,
        options?: Record<string, unknown> & {
            container?: HTMLElement;
            hookName?: string;
            parentClassHooks?: boolean;
        },
    ): fa.ux.ContextMenu | null;
    addEventListener(
        type: string,
        listener: import("./../../../foundry/common/utils/_types.mjs").EmittedEventListener,
        options?: {
            once?: boolean;
        },
    ): void;
    removeEventListener(
        type: string,
        listener: import("./../../../foundry/common/utils/_types.mjs").EmittedEventListener,
    ): void;
    dispatchEvent(event: Event): boolean;
}) & {
    PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
}) &
    typeof fa.api.ApplicationV2;
export declare class EffectsPanel extends EffectsPanel_base {
    #private;
    /**
     * Debounce and slightly delayed request to re-render this panel. Necessary for situations where it is not possible
     * to properly wait for promises to resolve before refreshing the UI.
     */
    refresh: (
        options?:
            | boolean
            | {
                  force?: boolean | undefined;
                  position?:
                      | {
                            top?: number | undefined;
                            left?: number | undefined;
                            width?: number | "auto" | undefined;
                            height?: number | "auto" | undefined;
                            scale?: number | undefined;
                            zIndex?: number | undefined;
                        }
                      | undefined;
                  window?:
                      | {
                            title?: string | undefined;
                            icon?: string | false | undefined;
                            controls?: boolean | undefined;
                        }
                      | undefined;
                  isFirstRender?: boolean | undefined;
              }
            | undefined,
    ) => void;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    _prepareContext(): Promise<EffectsPanelViewData>;
    _onFirstRender(context: EffectsPanelViewData, options: HandlebarsRenderOptions): Promise<void>;
    /** Move the panel to the right interface column. */
    _onRender(context: object, options: HandlebarsRenderOptions): Promise<void>;
}
interface EffectsPanelViewData {
    afflictions: EffectViewData[];
    conditions: EffectViewData[];
    effects: EffectViewData[];
    actor: ActorPF2e | null;
    user: {
        isGM: boolean;
    };
}
interface EffectViewData {
    effect: AbstractEffectPF2e;
    description: string;
    remaining: string | null;
}
export {};

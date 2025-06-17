import { ActorPF2e } from "./../../../actor/index.ts";
import { ApplicationRenderContext } from "./../../../../../foundry/client/applications/_module.mjs";
import {
    DocumentSheetConfiguration,
    DocumentSheetRenderContext,
} from "./../../../../../foundry/client/applications/api/_module.mjs";
import { HandlebarsRenderOptions } from "./../../../../../foundry/client/applications/api/handlebars-application.mjs";
import { TokenApplicationMixin } from "./../../../../../foundry/client/applications/sheets/_module.mjs";
import { DocumentFlags } from "./../../../../../foundry/common/data/_module.mjs";
import { TokenDocumentPF2e } from "../document.ts";
import { PrototypeTokenConfigPF2e } from "./prototype-config.ts";
declare function TokenConfigMixinPF2e<TBase extends ReturnType<typeof TokenApplicationMixin>>(
    Base: TBase,
): ((abstract new (...args: any[]) => (abstract new (...args: any[]) => {
    _preview: TokenDocument | foundry.data.PrototypeToken<Actor> | null;
    isPrototype: boolean;
    readonly actor: Actor | null;
    readonly token: TokenDocument | foundry.data.PrototypeToken<Actor>;
    readonly _fields: foundry.abstract.DataSchema;
    _initializeTokenPreview(): Promise<void>;
    _preFirstRender(context: Record<string, unknown>, options: HandlebarsRenderOptions): Promise<void>;
    _previewChanges(changes: Record<string, unknown>): void;
    _prepareContext(options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
    _preparePartContext(
        partId: string,
        context: ApplicationRenderContext,
        options: HandlebarsRenderOptions,
    ): Promise<ApplicationRenderContext>;
    _prepareIdentityTab(): object;
    _prepareAppearanceTab(): Promise<object>;
    _prepareVisionTab(): Promise<object>;
    _prepareLightTab(): Promise<object>;
    _prepareResourcesTab(): Promise<object>;
    _prepareButtons(): fa.FormFooterButton[];
    _onChangeForm(formConfig: fa.ApplicationFormConfiguration, event: Event): void;
    _processChanges(submitData: Record<string, unknown>): void;
    readonly parts: Record<string, HTMLElement>;
    _configureRenderOptions: ((options: HandlebarsRenderOptions) => void) &
        ((options: {
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
        }) => void);
    _configureRenderParts(options: HandlebarsRenderOptions): Record<string, fa.api.HandlebarsTemplatePart>;
    _renderHTML: ((context: object, options: HandlebarsRenderOptions) => Promise<Record<string, HTMLElement>>) &
        ((context: ApplicationRenderContext, options: fa.ApplicationRenderOptions) => Promise<unknown>);
    _replaceHTML: ((
        result: Record<string, HTMLElement>,
        content: HTMLElement,
        options: HandlebarsRenderOptions,
    ) => void) &
        ((result: unknown, content: HTMLElement, options: fa.ApplicationRenderOptions) => void);
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
    _awaitTransition(element: HTMLElement, timeout: number): Promise<void>;
    _createContextMenu(
        handler: () => import("./../../../../../foundry/client/applications/ux/context-menu.mjs").ContextMenuEntry[],
        selector: string,
        options?: Record<string, unknown> & {
            container?: HTMLElement;
            hookName?: string;
            parentClassHooks?: boolean;
        },
    ): fa.ux.ContextMenu | null;
    addEventListener(
        type: string,
        listener: import("./../../../../../foundry/common/utils/_types.mjs").EmittedEventListener,
        options?: {
            once?: boolean;
        },
    ): void;
    removeEventListener(
        type: string,
        listener: import("./../../../../../foundry/common/utils/_types.mjs").EmittedEventListener,
    ): void;
    dispatchEvent(event: Event): boolean;
} & fa.api.ApplicationV2<fa.ApplicationConfiguration, fa.ApplicationRenderOptions, object>) & {
    readonly linkToActorSize: boolean;
    /** Get this token's dimensions were they linked to its actor's size */
    readonly dimensionsFromActorSize: number;
    readonly rulesBasedVision: boolean;
    _prepareContext(options: HandlebarsRenderOptions): Promise<TokenConfigContext>;
    /** Hide token-sight settings when rules-based vision is enabled */
    _onRender(context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<void>;
    "__#37@#swapDispositionField"(): void;
    "__#37@#disableVisionInputs"(): void;
    processFormData(data: Record<string, unknown>, form: HTMLFormElement): Record<string, unknown>;
    processSubmitData(submitData: Record<string, unknown>): Promise<void>;
    readonly actor: ActorPF2e | null;
    readonly token: TokenDocumentPF2e | PrototypeTokenPF2e;
    _preview: TokenDocument | foundry.data.PrototypeToken<Actor> | null;
    isPrototype: boolean;
    readonly _fields: foundry.abstract.DataSchema;
    _initializeTokenPreview(): Promise<void>;
    _preFirstRender: ((context: Record<string, unknown>, options: HandlebarsRenderOptions) => Promise<void>) &
        ((context: Record<string, unknown>, options: fa.ApplicationRenderOptions) => Promise<void>);
    _previewChanges(changes: Record<string, unknown>): void;
    _preparePartContext(
        partId: string,
        context: ApplicationRenderContext,
        options: HandlebarsRenderOptions,
    ): Promise<ApplicationRenderContext>;
    _prepareIdentityTab(): object;
    _prepareAppearanceTab(): Promise<object>;
    _prepareVisionTab(): Promise<object>;
    _prepareLightTab(): Promise<object>;
    _prepareResourcesTab(): Promise<object>;
    _prepareButtons(): fa.FormFooterButton[];
    _onChangeForm: ((formConfig: fa.ApplicationFormConfiguration, event: Event) => void) &
        ((formConfig: fa.ApplicationFormConfiguration, event: Event) => void);
    _processChanges(submitData: Record<string, unknown>): void;
    readonly parts: Record<string, HTMLElement>;
    _configureRenderOptions: ((options: HandlebarsRenderOptions) => void) &
        ((options: {
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
        }) => void);
    _configureRenderParts(options: HandlebarsRenderOptions): Record<string, fa.api.HandlebarsTemplatePart>;
    _renderHTML: ((context: object, options: HandlebarsRenderOptions) => Promise<Record<string, HTMLElement>>) &
        ((context: ApplicationRenderContext, options: fa.ApplicationRenderOptions) => Promise<unknown>);
    _replaceHTML: ((
        result: Record<string, HTMLElement>,
        content: HTMLElement,
        options: HandlebarsRenderOptions,
    ) => void) &
        ((result: unknown, content: HTMLElement, options: fa.ApplicationRenderOptions) => void);
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
    _onFirstRender(context: object, options: fa.ApplicationRenderOptions): void;
    _preRender(context: object, options: fa.ApplicationRenderOptions): Promise<void>;
    _preClose(options: fa.ApplicationClosingOptions): Promise<void>;
    _onClose(options: fa.ApplicationClosingOptions): void;
    _prePosition(position: fa.ApplicationPosition): void;
    _onPosition(position: fa.ApplicationPosition): void;
    _attachFrameListeners(): void;
    _onClickTab(event: PointerEvent): void;
    _onClickAction(event: PointerEvent, target: HTMLElement): void;
    _onSubmitForm(formConfig: fa.ApplicationFormConfiguration, event: Event | SubmitEvent): Promise<void>;
    _awaitTransition(element: HTMLElement, timeout: number): Promise<void>;
    _createContextMenu(
        handler: () => import("./../../../../../foundry/client/applications/ux/context-menu.mjs").ContextMenuEntry[],
        selector: string,
        options?: Record<string, unknown> & {
            container?: HTMLElement;
            hookName?: string;
            parentClassHooks?: boolean;
        },
    ): fa.ux.ContextMenu | null;
    addEventListener(
        type: string,
        listener: import("./../../../../../foundry/common/utils/_types.mjs").EmittedEventListener,
        options?: {
            once?: boolean;
        },
    ): void;
    removeEventListener(
        type: string,
        listener: import("./../../../../../foundry/common/utils/_types.mjs").EmittedEventListener,
    ): void;
    dispatchEvent(event: Event): boolean;
    DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    TABS: Record<string, fa.ApplicationTabsConfiguration>;
    readonly DISPLAY_MODES: Record<string, string>;
    readonly TOKEN_DISPOSITIONS: Record<string, string>;
    readonly TURN_MARKER_MODES: Record<string, string>;
    readonly TOKEN_SHAPES: Record<string, string>;
}) & {
    "__#37@#SIGHT_INPUT_NAMES": (
        | "sight.angle"
        | "sight.saturation"
        | "sight.range"
        | "sight.visionMode"
        | "sight.brightness"
    )[];
    DEFAULT_OPTIONS: DeepPartial<DocumentSheetConfiguration>;
    PARTS: {
        [x: string]: fa.api.HandlebarsTemplatePart;
    };
    "__#37@#onClickOpenAutomationSettings"(this: PrototypeTokenConfigPF2e): Promise<void>;
    /** Disable the range input for token scale and style to indicate as much */
    "__#37@#onClickToggleAutoscale"(this: PrototypeTokenConfigPF2e): Promise<void>;
    "__#37@#onClickToggleSizeLink"(this: PrototypeTokenConfigPF2e): Promise<void>;
    TABS: Record<string, fa.ApplicationTabsConfiguration>;
    readonly DISPLAY_MODES: Record<string, string>;
    readonly TOKEN_DISPOSITIONS: Record<string, string>;
    readonly TURN_MARKER_MODES: Record<string, string>;
    readonly TOKEN_SHAPES: Record<string, string>;
}) &
    TBase;
interface PrototypeTokenPF2e extends foundry.data.PrototypeToken<ActorPF2e> {
    flags: DocumentFlags & {
        pf2e: {
            autoscale?: boolean;
            linkToActorSize?: boolean;
            rulesBasedVision?: boolean;
        };
    };
}
interface TokenConfigContext extends DocumentSheetRenderContext {
    /** Whether the token can be linked to its actor's size */
    sizeLinkable: boolean;
    linkToSizeTitle: string;
    autoscaleTitle: string;
}
export { TokenConfigMixinPF2e };
export type { PrototypeTokenPF2e, TokenConfigContext };

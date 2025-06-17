import { AbilityTrait, ActionCategory } from "./../../item/ability/index.ts";
import { ActionType } from "./../../item/base/data/index.ts";
import { BaseSpellcastingEntry } from "./../../item/spellcasting-entry/index.ts";
import { BrowserTab, BrowserTabs, ContentTabName, PackInfo, SourceInfo, TabData, TabName } from "./data.ts";
import { PackLoader } from "./loader.ts";
import { BrowserFilter } from "./tabs/data.ts";
declare const CompendiumBrowser_base: ((abstract new (...args: any[]) => {
    root: import("svelte").Component<any>;
    $state: object;
    "__#27@#mount": object;
    _renderHTML(
        context: import("./../../sheet/mixin.svelte.ts").SvelteApplicationRenderContext,
    ): Promise<import("./../../sheet/mixin.svelte.ts").SvelteApplicationRenderContext>;
    _replaceHTML(
        result: import("./../../sheet/mixin.svelte.ts").SvelteApplicationRenderContext,
        content: HTMLElement,
        options: fa.ApplicationRenderOptions,
    ): void;
    _onClose(options: fa.ApplicationClosingOptions): void;
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
    _configureRenderOptions(options: {
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
    }): void;
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
    _prePosition(position: fa.ApplicationPosition): void;
    _onPosition(position: fa.ApplicationPosition): void;
    _attachFrameListeners(): void;
    _onClickTab(event: PointerEvent): void;
    _onClickAction(event: PointerEvent, target: HTMLElement): void;
    _onSubmitForm(formConfig: fa.ApplicationFormConfiguration, event: Event | SubmitEvent): Promise<void>;
    _onChangeForm(formConfig: fa.ApplicationFormConfiguration, event: Event): void;
    _awaitTransition(element: HTMLElement, timeout: number): Promise<void>;
    _createContextMenu(
        handler: () => import("./../../../../foundry/client/applications/ux/context-menu.mjs").ContextMenuEntry[],
        selector: string,
        options?: Record<string, unknown> & {
            container?: HTMLElement;
            hookName?: string;
            parentClassHooks?: boolean;
        },
    ): fa.ux.ContextMenu | null;
    addEventListener(
        type: string,
        listener: import("./../../../../foundry/common/utils/_types.mjs").EmittedEventListener,
        options?: {
            once?: boolean;
        },
    ): void;
    removeEventListener(
        type: string,
        listener: import("./../../../../foundry/common/utils/_types.mjs").EmittedEventListener,
    ): void;
    dispatchEvent(event: Event): boolean;
}) & {
    DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
}) &
    typeof fa.api.ApplicationV2;
declare class CompendiumBrowser extends CompendiumBrowser_base {
    #private;
    /** The amount of rendered result items for initial loading and per load operation */
    static RESULT_LIMIT: number;
    $state: CompendiumBrowserState;
    root: import("svelte/legacy").LegacyComponentType;
    activeTab: BrowserTab;
    dataTabsList: readonly ["action", "bestiary", "campaignFeature", "equipment", "feat", "hazard", "spell"];
    packLoader: PackLoader;
    settings: CompendiumBrowserSettings;
    tabs: BrowserTabs;
    tabsArray: BrowserTab[];
    constructor(options?: Partial<fa.ApplicationConfiguration>);
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    _onFirstRender(context: object, options: fa.ApplicationRenderOptions): void;
    _onClose(options: fa.ApplicationClosingOptions): void;
    _getHeaderControls(): fa.ApplicationHeaderControlsEntry[];
    _prepareContext(_options: fa.ApplicationRenderOptions): Promise<CompendiumBrowserContext>;
    resetListElement(): void;
    openTab(tabName: TabName, options?: CompendiumBrowserOpenTabOptions): Promise<void>;
    openActionTab(options: {
        types?: ActionType[];
        categories?: ActionCategory[];
        traits?: AbilityTrait[];
    }): Promise<void>;
    openSpellTab(entry: BaseSpellcastingEntry, maxRank?: number, category?: string | null): Promise<void>;
    initCompendiumList(): void;
    loadedPacks(tab: TabName): string[];
    loadedPacksAll(): string[];
    resetInitializedTabs(): Promise<void>;
}
interface CompendiumBrowserContext {
    state: CompendiumBrowserState;
}
interface CompendiumBrowserState {
    /** Changing this will trigger a tab rerender. An empty string will show the landing page */
    activeTabName: ContentTabName | "";
    /** The result list HTML element */
    resultList: HTMLUListElement;
}
type CompendiumBrowserSettings = TabData<Record<string, PackInfo | undefined>>;
type CompendiumBrowserSourcesList = Record<string, SourceInfo | undefined>;
interface CompendiumBrowserSources {
    ignoreAsGM: boolean;
    showEmptySources: boolean;
    showUnknownSources: boolean;
    sources: CompendiumBrowserSourcesList;
}
interface CompendiumBrowserOpenTabOptions {
    /** Optional filter data for the opened tab */
    filter?: BrowserFilter;
    /** Hide the navigation element */
    hideNavigation?: boolean;
    /** Only show the given tabs in the navigation element. This will always include the openend tab */
    showTabs?: ContentTabName[];
}
export { CompendiumBrowser };
export type {
    CompendiumBrowserContext,
    CompendiumBrowserOpenTabOptions,
    CompendiumBrowserSettings,
    CompendiumBrowserSources,
    CompendiumBrowserState,
};

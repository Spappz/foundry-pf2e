import { AbilityTrait, ActionCategory } from "@item/ability/index.ts";
import { ActionType } from "@item/base/data/index.ts";
import { BaseSpellcastingEntry } from "@item/spellcasting-entry/index.ts";
import { SvelteApplicationMixin } from "@module/sheet/mixin.svelte.ts";
import { BrowserTab, BrowserTabs, ContentTabName, PackInfo, SourceInfo, TabData, TabName } from "./data";
import { PackLoader } from "./loader";
import { BrowserFilter } from "./tabs/data";
import * as svelte from "svelte";

declare class CompendiumBrowser extends SvelteApplicationMixin(fa.api.ApplicationV2) {
    /** The amount of rendered result items for initial loading and per load operation */
    static RESULT_LIMIT: number;

    declare protected $state: CompendiumBrowserState;

    protected override root: svelte.Component<any>;

    activeTab: BrowserTab;
    dataTabsList: readonly ["action", "bestiary", "campaignFeature", "equipment", "feat", "hazard", "spell"];
    packLoader: PackLoader;
    declare settings: CompendiumBrowserSettings;
    tabs: BrowserTabs;
    tabsArray: BrowserTab[];

    constructor(options: Partial<fa.ApplicationConfiguration>);

    static override DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;

    protected override _onFirstRender(context: object, options: fa.ApplicationRenderOptions): void;

    protected override _onClose(options: fa.ApplicationRenderOptions): void;

    protected override _getHeaderControls(): fa.ApplicationHeaderControlsEntry[];

    protected override _prepareContext(_options: fa.ApplicationRenderOptions): Promise<CompendiumBrowserContext>;

    #setVisibleTabs(visible?: ContentTabName[]): void;

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

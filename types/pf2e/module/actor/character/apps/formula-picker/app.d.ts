import { ActorPF2e } from "./../../../base.ts";
import { CraftingAbility } from "./../../../character/crafting/ability.ts";
import { CharacterPF2e } from "./../../../character/document.ts";
import { ResourceData } from "./../../../creature/index.ts";
import {
    ApplicationConfiguration,
    ApplicationRenderOptions,
} from "./../../../../../../foundry/client/applications/_types.mjs";
import { default as ApplicationV2 } from "./../../../../../../foundry/client/applications/api/application.mjs";
import { ItemUUID } from "./../../../../../../foundry/common/documents/_module.mjs";
import { AbilityItemPF2e, FeatPF2e, PhysicalItemPF2e } from "./../../../../item/index.ts";
import { ItemType, TraitChatData } from "./../../../../item/base/data/index.ts";
import { Rarity } from "./../../../../data.ts";
import { SvelteApplicationRenderContext } from "./../../../../sheet/mixin.svelte.ts";
import { default as MiniSearch } from "minisearch";
interface FormulaPickerConfiguration extends ApplicationConfiguration {
    actor: CharacterPF2e;
    ability: CraftingAbility;
    item?: FeatPF2e | AbilityItemPF2e;
    mode: "craft" | "prepare";
}
declare const FormulaPicker_base: ((abstract new (...args: any[]) => {
    root: import("svelte").Component<any>;
    $state: object;
    "__#27@#mount": object;
    _renderHTML(context: SvelteApplicationRenderContext): Promise<SvelteApplicationRenderContext>;
    _replaceHTML(
        result: SvelteApplicationRenderContext,
        content: HTMLElement,
        options: fa.ApplicationRenderOptions,
    ): void;
    _onClose(options: fa.ApplicationClosingOptions): void;
    options: ApplicationConfiguration;
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
    }): ApplicationConfiguration;
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
    _prepareContext(options: ApplicationRenderOptions): Promise<object>;
    _prepareTabs(group: string): Record<string, fa.ApplicationTab>;
    _getTabsConfig(group: string): fa.ApplicationTabsConfiguration | null;
    _getHeaderControls(): fa.ApplicationHeaderControlsEntry[];
    _headerControlButtons(): Generator<fa.ApplicationHeaderControlsEntry>;
    _renderFrame(options: ApplicationRenderOptions): Promise<HTMLElement>;
    _renderHeaderControl(control: fa.ApplicationHeaderControlsEntry): HTMLLIElement;
    _updateFrame(options: ApplicationRenderOptions): void;
    _insertElement(element: HTMLElement): void;
    close(options?: fa.ApplicationClosingOptions): Promise<ApplicationV2>;
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
    _canRender(options: ApplicationRenderOptions): boolean | void;
    _preFirstRender(context: Record<string, unknown>, options: ApplicationRenderOptions): Promise<void>;
    _onFirstRender(context: object, options: ApplicationRenderOptions): void;
    _preRender(context: object, options: ApplicationRenderOptions): Promise<void>;
    _onRender(context: object, options: ApplicationRenderOptions): Promise<void>;
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
        handler: () => import("./../../../../../../foundry/client/applications/ux/context-menu.mjs").ContextMenuEntry[],
        selector: string,
        options?: Record<string, unknown> & {
            container?: HTMLElement;
            hookName?: string;
            parentClassHooks?: boolean;
        },
    ): fa.ux.ContextMenu | null;
    addEventListener(
        type: string,
        listener: import("./../../../../../../foundry/common/utils/_types.mjs").EmittedEventListener,
        options?: {
            once?: boolean;
        },
    ): void;
    removeEventListener(
        type: string,
        listener: import("./../../../../../../foundry/common/utils/_types.mjs").EmittedEventListener,
    ): void;
    dispatchEvent(event: Event): boolean;
}) & {
    DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
}) &
    AbstractConstructorOf<ApplicationV2<ApplicationConfiguration, ApplicationRenderOptions, object>> & {
        DEFAULT_OPTIONS: DeepPartial<FormulaPickerConfiguration>;
    };
/** Creates a formula picker dialog that resolves with the selected item */
declare class FormulaPicker extends FormulaPicker_base {
    #private;
    static DEFAULT_OPTIONS: {
        id: string;
        position: {
            width: number;
            height: number;
        };
        window: {
            icon: string;
            contentClasses: string[];
            resizable: boolean;
        };
        onSelect: () => void;
        onDeselect: () => void;
    };
    options: FormulaPickerConfiguration;
    root: import("svelte/legacy").LegacyComponentType;
    selection: PhysicalItemPF2e | null;
    constructor(options: Partial<FormulaPickerConfiguration>);
    /** Overriden to re-render when the actor re-renders */
    _onFirstRender(context: object, options: ApplicationRenderOptions): void;
    _onClose(options: fa.ApplicationClosingOptions): void;
    resolveSelection(): Promise<PhysicalItemPF2e | null>;
    _prepareContext(): Promise<FormulaPickerContext>;
}
interface FormulaPickerContext extends SvelteApplicationRenderContext {
    actor: ActorPF2e;
    ability: CraftingAbility;
    mode: "craft" | "prepare";
    onSelect: (uuid: ItemUUID) => void;
    onDeselect: (uuid: ItemUUID) => void;
    searchEngine: MiniSearch<Pick<PhysicalItemPF2e, "id" | "name">>;
    state: {
        name: string;
        resource: ResourceData | null;
        prompt: string;
        sections: FormulaSection[];
    };
}
interface FormulaSection {
    level: number;
    formulas: {
        item: FormulaViewData;
        /** The batch size or quantity prepared depending on context */
        quantity: number;
        selected: boolean;
    }[];
}
interface FormulaViewData {
    id: string;
    uuid: ItemUUID;
    type: ItemType;
    img: string;
    name: string;
    traits: TraitChatData[];
    level: number | null;
    rarity: Rarity | null;
}
export { FormulaPicker };
export type { FormulaPickerContext };

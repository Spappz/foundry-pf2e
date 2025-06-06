import { HandlebarsRenderOptions } from "@client/applications/api/handlebars-application.mjs";
import { ContextMenuEntry } from "@client/applications/ux/context-menu.mjs";
import { ItemPF2e } from "@item";
/** Extend ItemDirectory to show more information */
export declare class ItemDirectoryPF2e<TItem extends ItemPF2e<null>> extends fa.sidebar.tabs.ItemDirectory<TItem> {
    #private;
    protected static _entryPartial: string;
    static DEFAULT_OPTIONS: DeepPartial<fa.sidebar.DocumentDirectoryConfiguration>;
    protected _onRender(context: object, options: HandlebarsRenderOptions): Promise<void>;
    /** Add `ContextMenuEntry` to attach physical items */
    protected _getEntryContextOptions(): ContextMenuEntry[];
}

import { ItemSourcePF2e } from "../../item/base/data/index.ts";
import { JournalEntrySource } from "../../../../foundry/common/documents/journal-entry.ts";
import { MigrationBase } from "../base.ts";

/** Redirect links some to-be-deleted spells to replacements */
export declare class Migration887RedirectSpellLinks extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateJournalEntry(source: JournalEntrySource): Promise<void>;
}

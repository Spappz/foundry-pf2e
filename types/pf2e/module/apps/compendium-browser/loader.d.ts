import {
    default as CompendiumCollection,
    CompendiumIndex,
} from "@client/documents/collections/compendium-collection.mjs";
import { CompendiumBrowserSources } from "./browser";
import { CompendiumDocument } from "@client/documents/_module.mjs";
declare class PackLoader {
    #private;
    loadedSources: string[];
    sourcesSettings: CompendiumBrowserSources;
    constructor();
    loadPacks(
        documentType: "Actor" | "Item",
        packs: string[],
        indexFields: string[],
    ): AsyncGenerator<
        {
            pack: CompendiumCollection<CompendiumDocument>;
            index: CompendiumIndex;
        },
        void,
        unknown
    >;
    updateSources(packs: string[]): Promise<void>;
    reset(): void;
    hardReset(packs: string[]): Promise<void>;
}
export { PackLoader };

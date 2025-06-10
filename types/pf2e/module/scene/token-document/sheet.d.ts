import { ActorPF2e } from "./../../actor/index.ts";
import { ApplicationRenderContext } from "./../../../../foundry/client/applications/_types.mjs";
import { DocumentSheetConfiguration, DocumentSheetRenderContext } from "./../../../../foundry/client/applications/api/document-sheet.mjs";
import { HandlebarsRenderOptions } from "./../../../../foundry/client/applications/api/handlebars-application.mjs";
import { default as FormDataExtended } from "./../../../../foundry/client/applications/ux/form-data-extended.mjs";
import { DatabaseCreateOperation, DatabaseUpdateOperation } from "./../../../../foundry/common/abstract/_types.mjs";
import { TokenDocumentPF2e } from "./index.ts";
declare class TokenConfigPF2e extends fa.sheets.TokenConfig {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<DocumentSheetConfiguration>;
    static PARTS: {
        [x: string]: fa.api.HandlebarsTemplatePart;
    };
    /** Get this token's dimensions were they linked to its actor's size */
    get dimensionsFromActorSize(): number;
    get rulesBasedVision(): boolean;
    _prepareContext(options: HandlebarsRenderOptions): Promise<TokenConfigContext>;
    /** Hide token-sight settings when rules-based vision is enabled */
    _onRender(context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<void>;
    protected _processFormData(
        event: SubmitEvent | null,
        form: HTMLFormElement,
        formData: FormDataExtended,
    ): Record<string, unknown>;
    protected _processSubmitData(
        event: SubmitEvent,
        form: HTMLFormElement,
        submitData: Record<string, unknown>,
        options?: Partial<DatabaseCreateOperation<Scene | null>> | Partial<DatabaseUpdateOperation<Scene | null>>,
    ): Promise<void>;
}
interface TokenConfigPF2e extends fa.sheets.TokenConfig {
    get token(): TokenDocumentPF2e;
    get actor(): ActorPF2e | null;
}
interface TokenConfigContext extends DocumentSheetRenderContext {
    /** Whether the token can be linked to its actor's size */
    sizeLinkable: boolean;
    linkToSizeTitle: string;
    autoscaleTitle: string;
}
export { TokenConfigPF2e };

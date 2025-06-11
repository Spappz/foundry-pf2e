import type {
    ApplicationConfiguration,
    FormFooterButton,
} from "./../../../../foundry/client/applications/_module.d.mts";
import type { FormDataExtended } from "./../../../../foundry/client/applications/ux/_module.d.mts";
import fields = foundry.data.fields;

interface SettingsContext {
    rootId: string;
    fields: WorldClockSettingSchema;
    settings: WorldClockSettingData;
    dateThemes: Record<string, string>;
    timeConventions: Record<12 | 24, string>;
    buttons: FormFooterButton[];
}

type WorldClockSettingSchema = {
    dateTheme: fields.StringField<"AR" | "IC" | "AD" | "CE", "AR" | "IC" | "AD" | "CE", true, false, true>;
    playersCanView: fields.BooleanField;
    showClockButton: fields.BooleanField;
    syncDarkness: fields.BooleanField;
    timeConvention: fields.NumberField<12 | 24, 12 | 24, true, false, true>;
    worldCreatedOn: fields.StringField<string, string, true, true, true>;
};

export interface WorldClockSettingData extends fields.SourceFromSchema<WorldClockSettingSchema> {}

export class WorldClockSettings extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    constructor(options?: DeepPartial<ApplicationConfiguration>);

    static override DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;

    static override PARTS: {
        settings: {
            template: string;
            root: boolean;
        };
        footer: {
            template: string;
        };
    };

    static #SCHEMA: fields.SchemaField<WorldClockSettingSchema>;

    /** Register World Clock settings and this menu. */
    static registerSettings(): void;

    static localizeSchema(): void;

    override _prepareContext(): Promise<SettingsContext>;

    static #onClickResetWorldTime(this: WorldClockSettings): Promise<void>;

    static #onSubmit(
        this: WorldClockSettings,
        _event: Event,
        _form: HTMLFormElement,
        formData: FormDataExtended,
    ): Promise<void>;
}

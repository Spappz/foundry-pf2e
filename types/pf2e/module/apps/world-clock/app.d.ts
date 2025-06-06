import type {
    HandlebarsRenderOptions,
    HandlebarsTemplatePart,
} from "@client/applications/api/handlebars-application.d.mts";
import { DateTime } from "luxon";

interface WorldClockData {
    date: string;
    time: string;
    options?: object;
    user: User;
    sign: "+" | "-";
}

export class WorldClock extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    static override DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;

    static override PARTS: Record<string, HandlebarsTemplatePart>;

    /** Is the ctrl key currently held down? */
    #ctrlKeyDown: boolean;

    readonly animateDarkness: (this: WorldClock, timeDiff: number) => Promise<void>;

    /** This needs to be an arrow function to allow `removeEventListener` to work */
    #controlKeyHandler: (event: KeyboardEvent) => void;

    constructor();

    /** Setting: the date theme (Imperial Calendar not yet supported) */
    get dateTheme(): "AR" | "IC" | "AD" | "CE";

    /** Setting: display either a 24-hour or 12-hour clock */
    get timeConvention(): 24 | 12;

    /** Setting: whether to keep the scene's darkness level synchronized with the world time */
    get syncDarkness(): boolean;

    /** Setting: Date and time of the Foundry world's creation date */
    get worldCreatedOn(): DateTime;

    /** The current date and time of the game world */
    get worldTime(): DateTime;

    /** The era in the game */
    get era(): string;

    /** The year in the game */
    get year(): number;

    /** The month in the game */
    get month(): string;

    /** The day of the week in the game */
    get weekday(): string;

    static #onClickAdvanceTime(this: WorldClock, _event: PointerEvent, button: HTMLButtonElement): void;

    static #onClickAdvanceOrRetract(this: WorldClock, _event: PointerEvent, button: HTMLButtonElement): void;

    #initialize(): void;

    protected override _prepareContext(options: HandlebarsRenderOptions): Promise<WorldClockData>;

    protected override _getHeaderControls(): fa.ApplicationHeaderControlsEntry[];

    static #calculateIncrement(wordTime: DateTime, interval: string, intervalMode: string): number;

    /** Advance the world time by a static or input value */
    protected override _onRender(context: WorldClockData, options: HandlebarsRenderOptions): Promise<void>;

    protected override _onClose(options: fa.ApplicationClosingOptions): Promise<void>;

    /** Create a message informing the user that scene darkness is synced to world time */
    static createSyncedMessage(): HTMLSpanElement;
}

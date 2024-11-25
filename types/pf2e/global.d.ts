import { ActorPF2e } from './module/actor/index.ts';
import { Action } from './module/actor/actions/index.ts';
import { AutomaticBonusProgression } from './module/actor/character/automatic-bonus-progression.ts';
import { ElementalBlast } from './module/actor/character/elemental-blast.ts';
import { FeatGroupData } from './module/actor/character/feats/index.ts';
import { CheckModifier, ModifierPF2e, ModifierType, StatisticModifier } from './module/actor/modifiers.ts';
import { ItemPF2e, PhysicalItemPF2e } from './module/item/index.ts';
import { ConditionSource } from './module/item/condition/data.ts';
import { CoinsPF2e } from './module/item/physical/helpers.ts';
import { ActiveEffectPF2e } from './module/active-effect.ts';
import { CompendiumBrowser, CompendiumBrowserSettings, CompendiumBrowserSources } from './module/apps/compendium-browser/index.ts';
import { EffectsPanel } from './module/apps/effects-panel.ts';
import { HotbarPF2e } from './module/apps/hotbar.ts';
import { LicenseViewer } from './module/apps/license-viewer/app.ts';
import { ActorDirectoryPF2e, ChatLogPF2e, CompendiumDirectoryPF2e, EncounterTrackerPF2e } from './module/apps/sidebar/index.ts';
import { WorldClock } from './module/apps/world-clock/app.ts';
import { CanvasPF2e, EffectsCanvasGroupPF2e } from './module/canvas/index.ts';
import { StatusEffects } from './module/canvas/status-effects.ts';
import { ChatMessagePF2e } from './module/chat-message/index.ts';
import { ActorsPF2e } from './module/collection/actors.ts';
import { CombatantPF2e, EncounterPF2e } from './module/encounter/index.ts';
import { MacroPF2e } from './module/macro.ts';
import { RuleElementPF2e, RuleElements } from './module/rules/index.ts';
import { UserPF2e } from './module/user/index.ts';
import { AmbientLightDocumentPF2e, MeasuredTemplateDocumentPF2e, RegionBehaviorPF2e, RegionDocumentPF2e, ScenePF2e, TileDocumentPF2e, TokenDocumentPF2e } from './module/scene/index.ts';
import { ActorDeltaPF2e } from './module/scene/token-document/actor-delta.ts';
import { PF2ECONFIG, StatusEffectIconTheme } from './scripts/config/index.ts';
import { DicePF2e } from './scripts/dice.ts';
import { calculateXP, checkPrompt, editPersistent, launchTravelSheet, perceptionForSelected, rollActionMacro, rollItemMacro, stealthForSelected, xpFromEncounter } from './scripts/macros/index.ts';
import { remigrate } from './scripts/system/remigrate.ts';
import { CheckPF2e } from './module/system/check/index.ts';
import { ConditionManager } from './module/system/conditions/manager.ts';
import { EffectTracker } from './module/system/effect-tracker.ts';
import { ModuleArt } from './module/system/module-art.ts';
import { Predicate } from './module/system/predication.ts';
import { CustomDamageData, HomebrewTag, HomebrewTraitSettingsKey, LanguageSettings } from './module/system/settings/homebrew/index.ts';
import { TextEditorPF2e } from './module/system/text-editor.ts';
import { sluggify } from './util/index.ts';
interface GamePF2e extends Game<ActorPF2e<null>, ActorsPF2e<ActorPF2e<null>>, ChatMessagePF2e, EncounterPF2e, ItemPF2e<null>, MacroPF2e, ScenePF2e, UserPF2e> {
    pf2e: {
        actions: Record<string, Function> & Collection<Action>;
        compendiumBrowser: CompendiumBrowser;
        licenseViewer: LicenseViewer;
        worldClock: WorldClock;
        effectPanel: EffectsPanel;
        effectTracker: EffectTracker;
        rollActionMacro: typeof rollActionMacro;
        rollItemMacro: typeof rollItemMacro;
        gm: {
            calculateXP: typeof calculateXP;
            checkPrompt: typeof checkPrompt;
            editPersistent: typeof editPersistent;
            launchTravelSheet: typeof launchTravelSheet;
            perceptionForSelected: typeof perceptionForSelected;
            stealthForSelected: typeof stealthForSelected;
            xpFromEncounter: typeof xpFromEncounter;
        };
        system: {
            moduleArt: ModuleArt;
            remigrate: typeof remigrate;
            sluggify: typeof sluggify;
            generateItemName: (item: PhysicalItemPF2e) => string;
        };
        variantRules: {
            AutomaticBonusProgression: typeof AutomaticBonusProgression;
        };
        Check: typeof CheckPF2e;
        CheckModifier: typeof CheckModifier;
        Coins: typeof CoinsPF2e;
        ConditionManager: typeof ConditionManager;
        Dice: typeof DicePF2e;
        ElementalBlast: typeof ElementalBlast;
        Modifier: typeof ModifierPF2e;
        ModifierType: {
            [K in Uppercase<ModifierType>]: Lowercase<K>;
        };
        Predicate: typeof Predicate;
        RuleElement: typeof RuleElementPF2e;
        RuleElements: typeof RuleElements;
        StatisticModifier: typeof StatisticModifier;
        StatusEffects: typeof StatusEffects;
        TextEditor: typeof TextEditorPF2e;
        /** Cached values of frequently-checked settings */
        settings: {
            automation: {
                /** Flanking detection */
                flanking: boolean;
            };
            /** Campaign feat slots */
            campaign: {
                feats: {
                    enabled: boolean;
                    sections: FeatGroupData[];
                };
                languages: LanguageSettings;
                mythic: "disabled" | "enabled" | "variant-tiers";
            };
            critFumble: {
                buttons: boolean;
                cards: boolean;
            };
            dragMeasurement: "always" | "encounters" | "never";
            /** Encumbrance automation */
            encumbrance: boolean;
            gmVision: boolean;
            /** Immunities, weaknesses, and resistances */
            iwr: boolean;
            metagame: {
                breakdowns: boolean;
                dcs: boolean;
                secretChecks: boolean;
                partyStats: boolean;
                partyVision: boolean;
                results: boolean;
            };
            /** Rules-based vision */
            rbv: boolean;
            tokens: {
                /** Automatic scaling of tokens belong to small actor */
                autoscale: boolean;
                /** Token nameplate visibility sets name visibility in encounter tracker */
                nameVisibility: boolean;
                /** Nath Mode */
                nathMode: boolean;
            };
            /** Theater-of-the-mind toggles */
            totm: boolean;
            /** Variant urles */
            variants: {
                /** Automatic Bonus Progression */
                abp: "noABP" | "ABPFundamentalPotency" | "ABPRulesAsWritten";
                /** Free Archetype */
                fa: boolean;
                /** Gradual Ability Boosts */
                gab: boolean;
                /** Proficiency without Level */
                pwol: {
                    enabled: boolean;
                    /** Modifiers for each proficiency rank */
                    modifiers: [number, number, number, number, number];
                };
                /** Stamina */
                stamina: boolean;
            };
        };
    };
}
type ConfiguredConfig = Config<AmbientLightDocumentPF2e<ScenePF2e | null>, ActiveEffectPF2e<ActorPF2e | ItemPF2e | null>, ActorPF2e, ActorDeltaPF2e<TokenDocumentPF2e>, ChatLogPF2e, ChatMessagePF2e, EncounterPF2e, CombatantPF2e<EncounterPF2e | null, TokenDocumentPF2e>, EncounterTrackerPF2e<EncounterPF2e | null>, CompendiumDirectoryPF2e, HotbarPF2e, ItemPF2e, MacroPF2e, MeasuredTemplateDocumentPF2e, RegionDocumentPF2e, RegionBehaviorPF2e, TileDocumentPF2e, TokenDocumentPF2e, WallDocument<ScenePF2e | null>, ScenePF2e, UserPF2e, EffectsCanvasGroupPF2e>;
declare global {
    interface ConfigPF2e extends ConfiguredConfig {
        debug: ConfiguredConfig["debug"] & {
            ruleElement: boolean;
        };
        PF2E: typeof PF2ECONFIG;
        time: {
            roundTime: number;
        };
    }
    const CONFIG: ConfigPF2e;
    const canvas: CanvasPF2e;
    namespace globalThis {
        var game: GamePF2e;
        var fu: typeof foundry.utils;
        var ui: FoundryUI<ActorDirectoryPF2e, ItemDirectory<ItemPF2e<null>>, ChatLogPF2e, CompendiumDirectoryPF2e, EncounterTrackerPF2e<EncounterPF2e | null>, HotbarPF2e>;
        interface Math {
            eq: (a: number, b: number) => boolean;
            gt: (a: number, b: number) => boolean;
            gte: (a: number, b: number) => boolean;
            lt: (a: number, b: number) => boolean;
            lte: (a: number, b: number) => boolean;
            ne: (a: number, b: number) => boolean;
            ternary: (condition: boolean | number, ifTrue: number, ifFalse: number) => number;
        }
    }
    interface Window {
        AutomaticBonusProgression: typeof AutomaticBonusProgression;
    }
    interface ClientSettings {
        get(module: "pf2e", setting: "automation.actorsDeadAtZero"): "neither" | "npcsOnly" | "pcsOnly" | "both";
        get(module: "pf2e", setting: "automation.effectExpiration"): boolean;
        get(module: "pf2e", setting: "automation.encumbrance"): boolean;
        get(module: "pf2e", setting: "automation.flankingDetection"): boolean;
        get(module: "pf2e", setting: "automation.iwr"): boolean;
        get(module: "pf2e", setting: "automation.lootableNPCs"): boolean;
        get(module: "pf2e", setting: "automation.removeExpiredEffects"): boolean;
        get(module: "pf2e", setting: "automation.rulesBasedVision"): boolean;
        get(module: "pf2e", setting: "gradualBoostsVariant"): boolean;
        get(module: "pf2e", setting: "automaticBonusVariant"): "noABP" | "ABPFundamentalPotency" | "ABPRulesAsWritten";
        get(module: "pf2e", setting: "freeArchetypeVariant"): boolean;
        get(module: "pf2e", setting: "proficiencyVariant"): boolean;
        get(module: "pf2e", setting: "staminaVariant"): boolean;
        get(module: "pf2e", setting: "proficiencyUntrainedModifier"): number;
        get(module: "pf2e", setting: "proficiencyTrainedModifier"): number;
        get(module: "pf2e", setting: "proficiencyExpertModifier"): number;
        get(module: "pf2e", setting: "proficiencyMasterModifier"): number;
        get(module: "pf2e", setting: "proficiencyLegendaryModifier"): number;
        get(module: "pf2e", setting: "metagame_partyVision"): boolean;
        get(module: "pf2e", setting: "metagame_secretCondition"): boolean;
        get(module: "pf2e", setting: "metagame_secretDamage"): boolean;
        get(module: "pf2e", setting: "metagame_showBreakdowns"): boolean;
        get(module: "pf2e", setting: "metagame_showDC"): boolean;
        get(module: "pf2e", setting: "metagame_showPartyStats"): boolean;
        get(module: "pf2e", setting: "metagame_showResults"): boolean;
        get(module: "pf2e", setting: "metagame_tokenSetsNameVisibility"): boolean;
        get(module: "pf2e", setting: "metagame_secretChecks"): boolean;
        get(module: "pf2e", setting: "tokens.autoscale"): boolean;
        get(module: "pf2e", setting: "worldClock.dateTheme"): "AR" | "IC" | "AD" | "CE";
        get(module: "pf2e", setting: "worldClock.playersCanView"): boolean;
        get(module: "pf2e", setting: "worldClock.showClockButton"): boolean;
        get(module: "pf2e", setting: "worldClock.syncDarkness"): boolean;
        get(module: "pf2e", setting: "worldClock.timeConvention"): 24 | 12;
        get(module: "pf2e", setting: "worldClock.worldCreatedOn"): string;
        get(module: "pf2e", setting: "campaignFeats"): boolean;
        get(module: "pf2e", setting: "campaignFeatSections"): FeatGroupData[];
        get(module: "pf2e", setting: "campaignType"): string;
        get(module: "pf2e", setting: "mythic"): "disabled" | "enabled" | "variant-tiers";
        get(module: "pf2e", setting: "activeParty"): string;
        get(module: "pf2e", setting: "activePartyFolderState"): boolean;
        get(module: "pf2e", setting: "createdFirstParty"): boolean;
        get(module: "pf2e", setting: "homebrew.languages"): HomebrewTag<"languages">[];
        get(module: "pf2e", setting: "homebrew.weaponCategories"): HomebrewTag<"weaponCategories">[];
        get(module: "pf2e", setting: HomebrewTraitSettingsKey): HomebrewTag[];
        get(module: "pf2e", setting: "homebrew.damageTypes"): CustomDamageData[];
        get(module: "pf2e", setting: "homebrew.languageRarities"): LanguageSettings;
        get(module: "pf2e", setting: "compendiumBrowserPacks"): CompendiumBrowserSettings;
        get(module: "pf2e", setting: "compendiumBrowserSources"): CompendiumBrowserSources;
        get(module: "pf2e", setting: "critFumbleButtons"): boolean;
        get(module: "pf2e", setting: "critRule"): "doubledamage" | "doubledice";
        get(module: "pf2e", setting: "deathIcon"): ImageFilePath;
        get(module: "pf2e", setting: "dragMeasurement"): "always" | "encounters" | "never";
        get(module: "pf2e", setting: "drawCritFumble"): boolean;
        get(module: "pf2e", setting: "gmVision"): boolean;
        get(module: "pf2e", setting: "identifyMagicNotMatchingTraditionModifier"): 0 | 2 | 5 | 10;
        get(module: "pf2e", setting: "minimumRulesUI"): Exclude<UserRole, 0>;
        get(module: "pf2e", setting: "nathMode"): boolean;
        get(module: "pf2e", setting: "seenRemasterJournalEntry"): boolean;
        get(module: "pf2e", setting: "statusEffectType"): StatusEffectIconTheme;
        get(module: "pf2e", setting: "totmToggles"): boolean;
        get(module: "pf2e", setting: "worldSchemaVersion"): number;
        get(module: "pf2e", setting: "worldSystemVersion"): string;
    }
    interface ClientSettingsMap {
        get(key: "pf2e.worldClock.worldCreatedOn"): SettingConfig & {
            default: string;
        };
    }
    interface RollMathProxy {
        eq: (a: number, b: number) => boolean;
        gt: (a: number, b: number) => boolean;
        gte: (a: number, b: number) => boolean;
        lt: (a: number, b: number) => boolean;
        lte: (a: number, b: number) => boolean;
        ne: (a: number, b: number) => boolean;
        ternary: (condition: boolean | number, ifTrue: number, ifFalse: number) => number;
    }
    const BUILD_MODE: "development" | "production";
    const CONDITION_SOURCES: ConditionSource[];
    const ROLL_PARSER: string;
    const UUID_REDIRECTS: Record<CompendiumUUID, CompendiumUUID>;
}
export {};

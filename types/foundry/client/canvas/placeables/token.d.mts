import {
    TokenAnimationTransition,
    TokenConstrainMovementPathOptions,
    TokenConstrainMovementPathWaypoint,
    TokenFindMovementPathJob,
    TokenFindMovementPathOptions,
    TokenFindMovementPathWaypoint,
    TokenGetTerrainMovementPathWaypoint,
    TokenMeasureMovementPathOptions,
    TokenMeasureMovementPathWaypoint,
    TokenMovementCostFunction,
    TokenMovementWaypoint,
    TokenPlannedMovement,
    TokenTerrainMovementWaypoint,
} from "@client/_types.mjs";
import { TokenDocument, User } from "@client/documents/_module.mjs";
import { ColorSource, ElevatedPoint, Point, TokenDimensions, TokenPosition } from "@common/_types.mjs";
import {
    DatabaseCreateCallbackOptions,
    DatabaseDeleteCallbackOptions,
    DatabaseUpdateCallbackOptions,
} from "@common/abstract/_types.mjs";
import { TokenDisplayMode, WallRestrictionType } from "@common/constants.mjs";
import Color from "@common/utils/color.mjs";
import { CanvasAnimationAttribute, CanvasAnimationOptions } from "../animation/_types.mjs";
import { PreciseText } from "../containers/_module.mjs";
import PolygonVertex from "../geometry/edges/vertex.mjs";
import { TokenLayer } from "../layers/_module.mjs";
import { PlaceablesLayerPointerEvent } from "../layers/base/placeables-layer.mjs";
import PrimarySpriteMesh from "../primary/primary-sprite-mesh.mjs";
import { TextureTransitionType } from "../rendering/filters/transition.mjs";
import { PointLightSource, PointVisionSource, VisionSourceData } from "../sources/_module.mjs";
import { LightSourceData } from "../sources/base-light-source.mjs";
import PlaceableObject, { PlaceableShape } from "./placeable-object.mjs";
import Region, { RegionMovementSegment, RegionMovementWaypoint } from "./region.mjs";
import { BaseTokenRuler, TokenRing, TokenTurnMarker } from "./tokens/_module.mjs";

/** A Token is an implementation of PlaceableObject that represents an Actor within a viewed Scene on the game canvas. */
export default class Token<TDocument extends TokenDocument = TokenDocument> extends PlaceableObject<TDocument> {
    constructor(document: TDocument);

    static override embeddedName: "Token";

    static override RENDER_FLAGS: {
        redraw: { propagate: ["refresh"] };
        redrawEffects: object;
        refresh: {
            propagate: [
                "refreshState",
                "refreshTransform",
                "refreshMesh",
                "refreshNameplate",
                "refreshElevation",
                "refreshRingVisuals",
            ];
            alias: true;
        };
        refreshState: { propagate: ["refreshVisibility", "refreshTarget"] };
        refreshVisibility: object;
        refreshTransform: { propagate: ["refreshPosition", "refreshRotation", "refreshSize"]; alias: true };
        refreshPosition: object;
        refreshRotation: object;
        refreshSize: {
            propagate: [
                "refreshPosition",
                "refreshShape",
                "refreshBars",
                "refreshEffects",
                "refreshNameplate",
                "refreshTarget",
                "refreshTooltip",
            ];
        };
        refreshElevation: object;
        refreshMesh: { propagate: ["refreshShader"] };
        refreshShader: object;
        refreshShape: { propagate: ["refreshVisibility", "refreshPosition", "refreshBorder", "refreshEffects"] };
        refreshBorder: object;
        refreshBars: object;
        refreshEffects: object;
        refreshNameplate: object;
        refreshTarget: object;
        refreshTooltip: object;
        refreshRingVisuals: object;
        recoverFromPreview: object;
    };

    /** The shape of this token. */
    shape: TokenShape;

    /** Defines the filter to use for detection. */
    detectionFilter: PIXI.Filter | null;

    /** A Graphics instance which renders the border frame for this Token inside the GridLayer. */
    border: PIXI.Graphics;

    /** The effects icons of temporary ActiveEffects that are applied to the Actor of this Token. */
    effects: PIXI.Container;

    /** The attribute bars of this Token. */
    bars: PIXI.Container;

    /** The tooltip text of this Token, which contains its elevation. */
    tooltip: PreciseText;

    /** The target arrows marker, which indicates that this Token is targeted by this User. */
    targetArrows: PIXI.Graphics;

    /** The target pips marker, which indicates that this Token is targeted by other User(s). */
    targetPips: PIXI.Graphics;

    /** The nameplate of this Token, which displays its name. */
    nameplate: PreciseText;

    /** The ruler of this Token. */
    ruler: BaseTokenRuler | null;

    /** The ruler data. */
    protected _plannedMovement: Record<string, TokenPlannedMovement>;

    /** Track the set of User documents which are currently targeting this Token */
    targeted: Set<User>;

    /** A reference to the SpriteMesh which displays this Token in the PrimaryCanvasGroup. */
    mesh: PrimarySpriteMesh | undefined;

    /** Renders the mesh of this Token with ERASE blending in the Token. */
    voidMesh: PIXI.DisplayObject;

    /** Renders the mesh of with the detection filter. */
    detectionFilterMesh: PIXI.DisplayObject;

    /** The texture of this Token, which is used by its mesh. */
    texture: PIXI.Texture;

    /**
     * A reference to the VisionSource object which defines this vision source area of effect.
     * This is undefined if the Token does not provide an active source of vision.
     */
    vision: PointVisionSource<this> | undefined;

    /**
     * A reference to the LightSource object which defines this light source area of effect.
     * This is undefined if the Token does not provide an active source of light.
     */
    light: PointLightSource<this>;

    /**
     * The Turn Marker of this Token.
     * Only a subset of Token objects have a turn marker at any given time.
     */
    turnMarker: TokenTurnMarker | null;

    /** The current animations of this Token. */
    get animationContexts(): Map<string, TokenAnimationContext>;

    /** The general animation name used for this Token. */
    get animationName(): string;

    /** The animation name used to animate this Token's movement. */
    get movementAnimationName(): string;

    /**
     * The promise of the current movement animation chain of this Token
     * or null if there isn't a movement animation in progress.
     */
    get movementAnimationPromise(): Promise<void> | null;

    /** Should the ruler of this Token be visible? */
    get showRuler(): boolean;

    /**
     * A TokenRing instance which is used if this Token applies a dynamic ring.
     * This property is null if the Token does not use a dynamic ring.
     */
    get ring(): TokenRing;

    /** A convenience boolean to test whether the Token is using a dynamic ring. */
    get hasDynamicRing(): boolean;

    /* -------------------------------------------- */
    /*  Permission Attributes
    /* -------------------------------------------- */

    /** A convenient reference to the Actor object associated with the Token embedded document. */
    get actor(): TDocument["actor"];

    /** A boolean flag for whether the current game User has observer permission for the Token */
    get observer(): boolean;

    /** Convenience access to the token's nameplate string */
    get name(): string;

    /* -------------------------------------------- */
    /*  Rendering Attributes
    /* -------------------------------------------- */

    override get bounds(): PIXI.Rectangle;

    /** Translate the token's grid width into a pixel width based on the canvas size */
    get w(): number;

    /** Translate the token's grid height into a pixel height based on the canvas size */
    get h(): number;

    override get center(): PIXI.Point;

    /** The Token's central position, adjusted in each direction by one or zero pixels to offset it relative to walls. */
    getMovementAdjustedPoint(point: ElevatedPoint, options?: { offsetX: number; offsetY: number }): ElevatedPoint;
    getMovementAdjustedPoint(point: Point, options?: { offsetX: number; offsetY: number }): Point;

    /** The HTML source element for the primary Tile texture */
    get sourceElement(): HTMLImageElement | HTMLVideoElement;

    override get sourceId(): `Token.${string}`;

    /** Does this Tile depict an animated video texture? */
    get isVideo(): boolean;

    /* -------------------------------------------- */
    /*  State Attributes
    /* -------------------------------------------- */

    /** An indicator for whether or not this token is currently involved in the active combat encounter. */
    get inCombat(): boolean;

    /** Return a reference to a Combatant that represents this Token, if one is present in the current encounter. */
    get combatant(): TDocument["combatant"];

    /** An indicator for whether the Token is currently targeted by the active game User */
    get isTargeted(): boolean;

    /** Is this Token currently being dragged? */
    get isDragged(): boolean;

    /** Return a reference to the detection modes array. */
    get detectionModes(): TDocument["detectionModes"];

    /**
     * Determine whether the Token is visible to the calling user's perspective.
     * Hidden Tokens are only displayed to GM Users.
     * Non-hidden Tokens are always visible if Token Vision is not required.
     * Controlled tokens are always visible.
     * All Tokens are visible to a GM user if no Token is controlled.
     *
     * @see {CanvasVisibility#testVisibility}
     */
    get isVisible(): boolean;

    /* -------------------------------------------- */
    /*  Lighting and Vision Attributes              */
    /* -------------------------------------------- */

    /** Test whether the Token has sight (or blindness) at any radius */
    get hasSight(): boolean;

    /** Does this Token actively emit light given its properties and the current darkness level of the Scene? */
    protected _isLightSource(): boolean;

    /** Does this Ambient Light actively emit darkness given its properties and the current darkness level of the Scene? */
    get emitsDarkness(): boolean;

    /** Does this Ambient Light actively emit light given its properties and the current darkness level of the Scene? */
    get emitsLight(): boolean;

    /** Test whether the Token uses a limited angle of vision or light emission. */
    get hasLimitedSourceAngle(): boolean;

    /** Translate the token's dim light distance in units into a radius in pixels. */
    get dimRadius(): number;

    /** Translate the token's bright light distance in units into a radius in pixels. */
    get brightRadius(): number;

    /** The maximum radius in pixels of the light field */
    get radius(): number;

    /** The range of this token's light perception in pixels. */
    get lightPerceptionRange(): number;

    /** Translate the token's vision range in units into a radius in pixels. */
    get sightRange(): number;

    /** Translate the token's maximum vision range that takes into account lights. */
    get optimalSightRange(): number;

    /**
     * Update the light and vision source objects associated with this Token.
     * @param options Options which configure how perception sources are updated
     * @param options.deleted Indicate that this light and vision source has been deleted
     */
    initializeSources(options?: { deleted?: boolean }): void;

    /**
     * Update an emitted light source associated with this Token.
     * @param options.deleted Indicate that this light source has been deleted.
     */
    initializeLightSource(options?: { deleted?: boolean }): void;

    /** Get the light source data. */
    protected _getLightSourceData(): LightSourceData;

    /**
     * Update the VisionSource instance associated with this Token.
     * @param options Options which affect how the vision source is updated
     * @param options.deleted Indicate that this vision source has been deleted.
     */
    initializeVisionSource(options?: { deleted?: boolean }): void;

    /** Returns a record of blinding state. */
    protected _getVisionBlindedStates(): Record<string, boolean>;

    /** Get the vision source data. */
    protected _getVisionSourceData(): VisionSourceData;

    /** Test whether this Token is a viable vision source for the current User. */
    protected _isVisionSource(): boolean;

    /* -------------------------------------------- */
    /*  Rendering                                   */
    /* -------------------------------------------- */

    /**
     * Render the bound mesh detection filter.
     * Note: this method does not verify that the detection filter exists.
     */
    protected _renderDetectionFilter(renderer: PIXI.Renderer): void;

    override clear(): this;

    protected override _destroy(options?: boolean | PIXI.IDestroyOptions): void;

    protected override _draw(options?: object): Promise<void>;

    /**
     * Create the BaseTokenRuler instance for this Token, if any.
     * This function is called when the Token is drawn for the first time.
     */
    protected _initializeRuler(): BaseTokenRuler | null;

    /* -------------------------------------------- */
    /*  Incremental Refresh                         */
    /* -------------------------------------------- */

    protected override _applyRenderFlags(flags: Record<string, boolean>): void;

    /** Refresh the token ring visuals if necessary. */
    protected _refreshRingVisuals(): void;

    /** Refresh the visibility. */
    protected _refreshVisibility(): void;

    /**
     * Refresh aspects of the user interaction state.
     * For example the border, nameplate, or bars may be shown on Hover or on Control.
     */
    protected _refreshState(): void;

    /** Resize mesh and handle scale adjustment. */
    protected _refreshMeshSizeAndScale(): void;

    /** Refresh the size. */
    protected _refreshSize(): void;

    /** Refresh the token mesh. */
    protected _refreshMesh(): void;

    /** Refresh the shape. */
    protected _refreshShape(): void;

    /** Refresh the rotation. */
    protected _refreshRotation(): void;

    /** Refresh the position. */
    protected _refreshPosition(): void;

    /** Refresh the elevation */
    protected _refreshElevation(): void;

    /** Refresh the tooltip. */
    protected _refreshTooltip(): void;

    /** Refresh the text content, position, and visibility of the Token nameplate. */
    protected _refreshNameplate(): void;

    /** Refresh the token mesh shader. */
    protected _refreshShader(): void;

    /** Refresh the border. */
    protected _refreshBorder(): void;

    /**
     * Get the hex color that should be used to render the Token border
     * @returns The hex color used to depict the border color
     */
    protected _getBorderColor(): number;

    /** Get the Color used to represent the disposition of this Token. */
    getDispositionColor(): number;

    /**
     * Refresh the target indicators for the Token.
     * Draw both target arrows for the primary User and indicator pips for other Users targeting the same Token.
     */
    protected _refreshTarget(): void;

    /**
     * Draw the targeting arrows around this token.
     * @param reticule Additional parameters to configure how the targeting reticule is drawn.
     */
    protected _drawTargetArrows(reticule?: ReticuleOptions): void;

    /** Draw the targeting pips around this token. */
    protected _drawTargetPips(): void;

    /**
     * Refresh the display of Token attribute bars, rendering its latest resource data.
     * If the bar attribute is valid (has a value and max), draw the bar. Otherwise hide it.
     */
    drawBars(): void;

    /**
     * Draw a single resource bar, given provided data
     * @param number The Bar number
     * @param bar The Bar container
     * @param data Resource data for this bar
     */
    protected _drawBar(number: number, bar: PIXI.Graphics, data: TokenResourceData): void;

    /** Return the text which should be displayed in a token's tooltip field */
    protected _getTooltipText(): string;

    /** Get the text style that should be used for this Token's tooltip. */
    protected _getTextStyle(): PIXI.TextStyle;

    /** Draw the effect icons for ActiveEffect documents which apply to the Token's Actor. */
    drawEffects(): Promise<void>;

    /**
     * Draw the effect icons for ActiveEffect documents which apply to the Token's Actor.
     * Called by {@link Token.drawEffects}.
     */
    protected _drawEffects(): Promise<void>;

    /** Draw a status effect icon */
    protected _drawEffect(src: string, tint: ColorSource | null): Promise<PIXI.Sprite | undefined>;

    /** Draw the overlay effect icon */
    protected _drawOverlay(src: string, tint: number | null): Promise<PIXI.Sprite>;

    /** Refresh the display of status effects, adjusting their position for the token width and height. */
    protected _refreshEffects(): void;

    /** Refresh presentation of the Token's combat turn marker, if any. */
    protected _refreshTurnMarker(): void;

    /** Refresh the display of the ruler. */
    protected _refreshRuler(): void;

    /**
     * Helper method to determine whether a token attribute is viewable under a certain mode
     * @param mode The mode from {@link CONST.TOKEN_DISPLAY_MODES}
     * @return Is the attribute viewable?
     */
    protected _canViewMode(mode: TokenDisplayMode): boolean;

    /* -------------------------------------------- */
    /*  Token Ring                                  */
    /* -------------------------------------------- */

    /** Override ring colors for this particular Token instance. */
    getRingColors(): { ring: Color; background: Color };

    /**
     * Apply additional ring effects for this particular Token instance.
     * Effects are returned as an array of integers in {@link foundry.canvas.tokens.TokenRing.effects}.
     */
    getRingEffects(): number[];

    /* -------------------------------------------- */
    /*  Token Animation                             */
    /* -------------------------------------------- */

    /**
     * Get the animation data for the current state of the document.
     * @returns The target animation data object
     */
    protected _getAnimationData(): TokenAnimationData;

    /**
     * Animate from the old to the new state of this Token.
     * @param to The animation data to animate to
     * @param options The options that configure the animation behavior
     * @returns A promise which resolves once the animation has finished or stopped
     */
    animate(to: Partial<TokenAnimationData>, options?: TokenAnimationOptions): Promise<void>;

    /**
     * Get the duration of the animation.
     * @param from The animation data to animate from
     * @param to The animation data to animate to
     * @param options The options that configure the animation behavior
     * @returns The duration of the animation in milliseconds
     */
    protected _getAnimationDuration(
        from: DeepReadonly<TokenAnimationData>,
        to: DeepReadonly<Partial<TokenAnimationData>>,
        options: TokenAnimationOptions,
    ): number;

    /**
     * Get the base movement speed for the animation in grid size per second.
     * The default implementation returns `CONFIG.Token.movement.defaultSpeed`.
     * @param options The options that configure the animation behavior
     * @returns The base movement speed in grid size per second
     */
    protected _getAnimationMovementSpeed(options: TokenAnimationOptions): number;

    /**
     * Modify the base movement speed of the animation.
     * Divides by the terrain difficulty, if present, by default.
     * @param speed The base movement speed in grid size per second
     * @param options The options that configure the animation behavior
     * @returns The modified movement speed in grid size per second
     */
    protected _modifyAnimationMovementSpeed(speed: number, options: TokenAnimationOptions): number;

    /**
     * Get the rotation speed for the animation in 60 degrees per second.
     * Returns the movement speed by default.
     * @param options The options that configure the animation behavior
     * @returns The rotation speed in 60 degrees per second
     */
    protected _getAnimationRotationSpeed(options: TokenAnimationOptions): number;

    /**
     * Does this Token require rotation changes to be animated?
     * If false is returned, the rotation speed is set to infinity.
     */
    protected _requiresRotationAnimation(): boolean;

    /**
     * Called each animation frame.
     * @param changed The animation data that changed
     * @param context The animation context
     */
    protected _onAnimationUpdate(changed: Partial<TokenAnimationData>, context: TokenAnimationContext): void;

    /**
     * Terminate the animations of this particular Token, if exists.
     * @param options Additional options.
     * @param options.reset Reset the TokenDocument?
     */
    stopAnimation(options?: { reset?: boolean }): void;

    /* -------------------------------------------- */
    /*  Animation Preparation Methods               */
    /* -------------------------------------------- */

    /**
     * Get the texture transition type.
     * Returns `"fade"` by default.
     * @param options The options that configure the animation behavior
     * @returns The transition type
     */
    protected _getAnimationTransition(options: TokenAnimationOptions): TokenAnimationTransition;

    /**
     * Prepare the animation data changes: performs special handling required for animating rotation.
     * @param from The animation data to animate from
     * @param changes The animation data changes
     * @param context The animation context
     * @param options The options that configure the animation behavior
     * @returns The animation attributes
     */
    protected _prepareAnimation(
        from: DeepReadonly<TokenAnimationData>,
        changes: Partial<TokenAnimationData>,
        context: Omit<TokenAnimationContext, "promise">,
        options: TokenAnimationOptions,
    ): CanvasAnimationAttribute[];

    /* -------------------------------------------- */
    /*  Methods
    /* -------------------------------------------- */

    /**
     * Check for collision when attempting a move to a new position.
     *
     * The result of this function must not be affected by the animation of this Token.
     * @param destination The central destination point of the attempted movement. The elevation defaults to the elevation of the origin.
     * @param options Additional options forwarded to PointSourcePolygon.testCollision
     * @param options.origin The origin to be used instead of the current origin. The elevation defaults to the current elevation.
     * @param  options.type The collision type
     * @param options.mode The collision mode to test: "any", "all", or "closest"
     * @returns The collision result depends on the mode of the test:
     *          * any: returns a boolean for whether any collision occurred
     *          * all: returns a sorted array of PolygonVertex instances
     *          * closest: returns a PolygonVertex instance or null
     */
    checkCollision(
        destination: Point | ElevatedPoint,
        { origin, type, mode }: { origin?: Point | ElevatedPoint; type?: WallRestrictionType; mode: "closest" },
    ): PolygonVertex | null;
    checkCollision(
        destination: Point | ElevatedPoint,
        { origin, type, mode }: { origin?: Point | ElevatedPoint; type?: WallRestrictionType; mode: "any" },
    ): boolean;
    checkCollision(
        destination: Point | ElevatedPoint,
        { origin, type, mode }: { origin?: Point | ElevatedPoint; type?: WallRestrictionType; mode: "all" },
    ): PolygonVertex[];
    checkCollision(
        destination: Point | ElevatedPoint,
        { origin, type, mode }?: { origin?: Point | ElevatedPoint; type?: WallRestrictionType; mode?: undefined },
    ): boolean;
    checkCollision(
        destination: Point | ElevatedPoint,
        {
            origin,
            type,
            mode,
        }?: { origin?: Point | ElevatedPoint; type?: WallRestrictionType; mode?: "any" | "all" | "closest" },
    ): boolean | PolygonVertex | PolygonVertex[] | null;

    /** Get the shape of this Token. */
    getShape(): TokenShape;

    /**
     * Get the center point for a given position or the current position.
     * @param position The position to be used instead of the current position
     * @returns The center point
     */
    getCenterPoint(position?: Point): Point;

    override getSnappedPosition(position?: Point): Point;

    override _pasteObject(offset: Point, { hidden, snap }: { hidden?: boolean; snap?: boolean }): object;

    /**
     * Measure the movement path for this Token.
     * @param waypoints The waypoints of movement
     * @param options Additional options that affect cost calculations (passed to {@link Token._getMovementCostFunction})
     */
    measureMovementPath(
        waypoints: TokenMeasureMovementPathWaypoint[],
        options: TokenMeasureMovementPathOptions,
    ): GridMeasurePathResult;

    /**
     * Create the movement cost function for this Token.
     * In square and hexagonal grids it calculates the cost for single grid space move between two grid space offsets.
     * For tokens that occupy more than one grid space the cost of movement is calculated as the median of all individual
     * grid space moves unless the cost of any of these is infinite, in which case total cost is always infinite.
     * In gridless grids the `from` and `to` parameters of the cost function are top-left offsets.
     * If the movement cost function is undefined, the cost equals the distance moved.
     * @param options Additional options that affect cost calculations
     */
    protected _getMovementCostFunction(options: TokenMeasureMovementPathOptions): TokenMovementCostFunction | void;

    /**
     * Constrain the given movement path.
     *
     * The result of this function must not be affected by the animation of this Token.
     * @param waypoints The waypoints of movement
     * @param options Additional options
     * @returns  The (constrained) path of movement and a boolean that is true if and only if the path was constrained.
     * If it wasn't constrained, then a copy of the path of all given waypoints with all default values filled in is returned.
     */
    constrainMovementPath(
        waypoints: TokenConstrainMovementPathWaypoint[],
        options?: TokenConstrainMovementPathOptions,
    ): [constrainedPath: TokenMovementWaypoint[], wasConstrained: boolean];

    /**
     * Find a movement path through the waypoints.
     * The path may not necessarily be one with the least cost.
     * The path returned may be partial, i.e. it doesn't go through all waypoints, but must always start with the first
     * waypoints unless the waypoints are empty, in which case an empty path is returned.
     *
     * The result of this function must not be affected by the animation of this Token.
     * @param waypoints The waypoints of movement
     * @param options Additional options
     * @returns The job of the movement pathfinder
     */
    findMovementPath(
        waypoints: TokenFindMovementPathWaypoint[],
        options: TokenFindMovementPathOptions,
    ): TokenFindMovementPathJob;

    /**
     * This function adds intermediate waypoints pre/post enter and exit for a {@link Region} if the Region
     * has at least one Behavior that could affect the movement, which is determined by
     * {@link foundry.data.regionBehaviors.RegionBehaviorType._getTerrainEffects}.
     * For each segment of the movement path the terrain data is created from all behaviors that
     * could affect the movement of this Token with {@link CONFIG.Token.movement.TerrainData.resolveTerrainEffects}.
     * This terrain data is included in the returned regionalized movement path.
     * This terrain data may then be used in {@link Token._getMovementCostFunction} and
     * {@link Token.constrainMovementPath}.
     * @param waypoints The waypoints of movement
     * @param options Additional options
     * @param options.preview Is preview?
     * @returns The movement path with terrain data
     */
    createTerrainMovementPath(
        waypoints: TokenGetTerrainMovementPathWaypoint[],
        { preview }: { preview?: boolean },
    ): TokenTerrainMovementWaypoint[];

    /**
     * Set this Token as an active target for the current game User.
     * @param targeted Is the Token now targeted?
     * @param options Additional option which modify how targets are acquired
     * @param options.releaseOthers Release other active targets?
     */
    setTarget(targeted: boolean, { releaseOthers }: { releaseOthers?: boolean }): void;

    /**
     * Handle updating the targeting state of this Token for a particular User.
     * @param targeted Is the token now targeted?
     * @param user The user whose targeting state has changed
     * @internal
     */
    _updateTarget(targeted: boolean, user: User): void;

    /** The external radius of the token in pixels. */
    get externalRadius(): number;

    /**
     * A generic transformation to turn a certain number of grid units into a radius in canvas pixels.
     * This function adds additional padding to the light radius equal to the external radius of the token.
     * This causes light to be measured from the outer token edge, rather than from the center-point.
     * @param units  The radius in grid units
     * @returns    The radius in pixels
     */
    getLightRadius(units: number): number;

    protected override _getShiftedPosition(dx: number, dy: number): Point;

    /**
     * Get the movement action in {@link CONFIG.Token.movement | CONFIG.Token.movement.actions} to be used for keyboard
     * movement.
     * The default implementation returns `this.document.movementAction`.
     */
    protected _getKeyboardMovementAction(): string;

    /**
     * Get the position for movement via the Token HUD.
     * @see {@link foundry.applications.hud.TokenHUD._onSubmit}
     * @internal
     */
    _getHUDMovementPosition(elevation: number): Partial<TokenPosition>;

    /**
     * Get the movement action in {@link CONFIG.Token.movement | CONFIG.Token.movement.actions} to be used for movement
     * via the Token HUD.
     * The default implementation returns `this.document.movementAction`.
     * @see {@link foundry.applications.hud.TokenHUD._onSubmit}
     */
    protected _getHUDMovementAction(): string;

    /**
     * Get the position for movement via the Token Config.
     * @see {@link foundry.applications.sheets.TokenConfig._processSubmitData}
     * @internal
     */
    _getConfigMovementPosition(changes: Partial<TokenPosition>): Partial<TokenPosition>;

    protected override _updateRotation({
        angle,
        delta,
        snap,
    }?: {
        angle?: number;
        delta?: number;
        snap?: number;
    }): number;

    /* -------------------------------------------- */
    /*  Event Listeners and Handlers                */
    /* -------------------------------------------- */

    protected override _onCreate(
        data: TDocument["_source"],
        options: DatabaseCreateCallbackOptions,
        userId: string,
    ): void;

    protected override _onUpdate(
        changed: DeepPartial<TDocument["_source"]>,
        options: DatabaseUpdateCallbackOptions,
        userId: string,
    ): void;

    protected override _onDelete(options: DatabaseDeleteCallbackOptions, userId: string): void;

    /**
     * Handle changes to Token behavior when a significant status effect is applied
     * @param statusId The status effect ID being applied, from {@link CONFIG.specialStatusEffects}
     * @param active Is the special status effect now active?
     */
    protected _onApplyStatusEffect(statusId: string, active: boolean): void;

    /**
     * Add/Modify a filter effect on this token.
     * @param statusId      The status effect ID being applied, from CONFIG.specialStatusEffects
     * @param active        Is the special status effect now active?
     * @internal
     */
    _configureFilterEffect(statusId: string, active: boolean): void;

    /**
     * Update the filter effects depending on special status effects
     * @internal
     */
    _updateSpecialStatusFilterEffects(): void;

    /**
     * Remove all filter effects on this placeable.
     * @internal
     */
    _removeAllFilterEffects(): void;

    protected override _onControl(options?: { releaseOthers?: boolean; pan?: boolean }): void;

    protected override _onRelease(options?: object): void;

    override _overlapsSelection(rectangle: PIXI.Rectangle): boolean;

    /* -------------------------------------------- */
    /*  Event Listeners and Handlers                */
    /* -------------------------------------------- */

    protected override _canControl(user: User, event?: PIXI.FederatedEvent): boolean;

    protected override _canHUD(user: User, event?: PIXI.FederatedEvent): boolean;

    protected override _canConfigure(user: User, event?: PIXI.FederatedEvent): boolean;

    protected override _canHover(user: User, event?: PIXI.FederatedEvent): boolean;

    protected override _canView(user: User, event?: PIXI.FederatedEvent): boolean;

    protected override _canDrag(user: User, event?: PIXI.FederatedEvent): boolean;

    protected override _onHoverIn(
        event: PIXI.FederatedPointerEvent,
        { hoverOutOthers }?: { hoverOutOthers?: boolean },
    ): boolean | void;

    protected override _onHoverOut(event: PIXI.FederatedPointerEvent): boolean | void;

    protected override _onClickLeft(event: TokenPointerEvent<this>): void;

    protected override _propagateLeftClick(event: PIXI.FederatedPointerEvent): boolean;

    protected override _onClickLeft2(event: PIXI.FederatedPointerEvent): void;

    protected override _onClickRight2(event: PIXI.FederatedPointerEvent): void;

    protected override _initializeDragLeft(event: PIXI.FederatedEvent): void;

    protected override _onDragLeftStart(event: TokenPointerEvent<this>): void;

    /**
     * Get the constrain options used during the drag operation.
     * @returns The constrain options
     */
    protected _getDragConstrainOptions(): Omit<TokenConstrainMovementPathOptions, "preview" | "history">;

    /**
     * Get the search options used during the drag operation to find the path of movement through the waypoints.
     * @returns The search options
     */
    protected _getDragPathfindingOptions(): TokenFindMovementPathOptions;

    /**
     * Get the movement action for the waypoints placed during a drag operation.
     * @returns The movement action
     */
    protected _getDragMovementAction(): string;

    protected override _onDragLeftDrop(event: PlaceablesLayerPointerEvent<this>): Promise<void | TDocument[]>;

    /** Prevent the drop event? Called by {@link Token._onDragLeftDrop}. */
    protected _shouldPreventDragLeftDrop(event: PIXI.FederatedEvent): boolean;

    protected override _prepareDragLeftDropUpdates(event: PIXI.FederatedEvent): Record<string, unknown>[] | null;

    protected override _onDragLeftMove(event: TokenPointerEvent<this>): void;

    /**
     * Update the destinations of the drag previews and rulers
     * @param point The (unsnapped) center point of the waypoint
     * @param options Additional options
     * @param options.snap Snap the destination?
     * @protected
     */
    protected _updateDragDestination(point: Point, { snap }: { snap?: boolean }): void;

    /**
     * Get the origin of the drag operation.
     * @internal
     */
    _getDragOrigin(): Point;

    /** Called by {@link foundry.canvas.layers.TokenLayer._onClickLeft} while this Token is in a drag workflow. */
    protected _onDragClickLeft(event: PIXI.FederatedEvent): void;

    /**
     * Add ruler waypoints and update ruler paths.
     * @param point The (unsnapped) center point of the waypoint
     * @param options Additional options
     * @param options.snap Snap the added waypoint?
     */
    protected _addDragWaypoint(point: Point, { snap }: { snap?: boolean }): void;

    /** Trigger drop event. This drop cannot be prevented by {@link Token._shouldPreventDragLeftDrop}. */
    protected _triggerDragLeftDrop(): void;

    /** Called by {@link foundry.canvas.layers.TokenLayer._onClickLeft2} while this Token is in a drag workflow. */
    protected _onDragClickLeft2(event: PIXI.FederatedEvent): void;

    /** Called by {@link foundry.canvas.layers.TokenLayer._onClickRight} while this Token is in a drag workflow. */
    protected _onDragClickRight(event: PIXI.FederatedEvent): void;

    /** Remove last ruler waypoints and update ruler paths. */
    protected _removeDragWaypoint(): void;

    /** Cancel the drag workflow. This cancellation cannot be prevented by {@link Token._onDragLeftCancel}. */
    protected _triggerDragLeftCancel(): void;

    /** Called by {@link foundry.canvas.layers.TokenLayer._onClickRight2} while this Token is in a drag workflow. */
    protected _onDragClickRight2(event: PIXI.FederatedEvent): void;

    protected override _onDragLeftCancel(event: PlaceablesLayerPointerEvent<this>): void;

    protected override _finalizeDragLeft(event: PIXI.FederatedEvent): void;

    protected override _onDragEnd(): void;

    /** Change the elevation of Token during dragging.  */
    protected _onDragMouseWheel(event: WheelEvent): void;

    /**
     * Change the elevation of the dragged Tokens.
     * @param delta The number vertical steps
     * @param options Additional options
     * @param options.precise Round elevations to multiples of the grid distance divided by `CONFIG.Canvas.elevationSnappingPrecision`?
     * If false, rounds to multiples of the grid distance.
     */
    protected _changeDragElevation(delta: number, { precise }: { precise?: boolean }): void;

    /**
     * Get the drag waypoint position.
     * @internal
     */
    _getDragWaypointPosition(
        current: DeepReadonly<Pick<TokenPosition, "x" | "y" | "elevation">>,
        changes: DeepReadonly<Partial<ElevatedPoint>>,
        { snap }: { snap?: boolean },
    ): Pick<TokenPosition, "x" | "y" | "elevation"> & Partial<TokenDimensions>;

    /** Recalculate the planned movement path of this Token for the current User. */
    recalculatePlannedMovementPath(): void;
}

export default interface Token<TDocument extends TokenDocument = TokenDocument> extends PlaceableObject<TDocument> {
    get layer(): TokenLayer<this>;
}

type TokenShape = Extract<PlaceableShape, PIXI.Circle | PIXI.Polygon | PIXI.Rectangle>;

interface TokenResourceData {
    attribute: string;
    type: "bar";
    value: number;
    max?: number;
    editable: boolean;
}

interface TokenPointerEvent<T extends Token> extends PlaceablesLayerPointerEvent<T> {
    interactionData: PlaceablesLayerPointerEvent<T>["interactionData"] & {
        clones?: T[];
    };
}

interface TokenAnimationOptions extends Omit<CanvasAnimationOptions, "context"> {
    /** A desired token movement speed in grid spaces per second */
    movementSpeed?: number;
    /** The desired texture transition type */
    transition?: TextureTransitionType;
}

interface ReticuleOptions {
    /**
     * The amount of margin between the targeting arrows and the token's bounding
     * box, expressed as a fraction of an arrow's size.
     */
    margin?: number;
    /** The alpha value of the arrows. */
    alpha?: number;
    /** The size of the arrows as a proportion of grid size. */
    size?: number;
    /** The color of the arrows. */
    color?: number;
    /** The arrows' border style configuration. */
    border?: {
        /** The border color. */
        color?: number;
        /** The border width. */
        width?: number;
    };
}

interface TokenAnimationData {
    /** The x position in pixels */
    x: number;
    /** The y position in pixels */
    y: number;
    /** The width in grid spaces */
    width: number;
    /** The height in grid spaces */
    height: number;
    /** The alpha value */
    alpha: number;
    /** The rotation in degrees */
    rotation: number;
    /** The texture data */
    texture: {
        /** The texture file path */
        src: string;
        /** The texture anchor X */
        anchorX: number;
        /** The texture anchor Y */
        anchorY: number;
        /** The texture scale X */
        scaleX: number;
        /** The texture scale Y */
        scaleY: number;
        /** The texture tint */
        tint: Color;
    };
    /** The ring data */
    ring: {
        /** The ring subject data */
        subject: {
            /** The ring subject texture */
            texture: string;
            /** The ring subject scale */
            scale: number;
        };
    };
}

export interface TokenAnimationContext {
    /** The name of the animation */
    name: string | symbol;
    /** The final animation state */
    to: Partial<TokenAnimationData>;
    /** The duration of the animation */
    duration: number;
    /** The current time of the animation */
    time: number;
    /** Asynchronous functions that are executed before the animation starts */
    preAnimate: ((context: TokenAnimationContext) => Promise<void>)[];
    /** Synchronous functions that are executed after the animation ended.
     *  They may be executed before the preAnimate functions have finished  if the animation is terminated.
     */
    postAnimate: ((context: TokenAnimationContext) => void)[];
    /**
     *  The promise of the animation, which resolves to true if the animation
     *  completed, to false if it was terminated, and rejects if an error occurred.
     *  Undefined in the first frame (at time 0) of the animation.
     */
    promise?: Promise<boolean>;
}

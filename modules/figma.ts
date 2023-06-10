// Figma Types are licensed under MIT, blah blah - https://github.com/figma/plugin-typings/blob/master/LICENSE

export type ArgFreeEventType =
    | 'selectionchange'
    | 'currentpagechange'
    | 'close'
    | 'timerstart'
    | 'timerstop'
    | 'timerpause'
    | 'timerresume'
    | 'timeradjust'
    | 'timerdone'
export interface PluginAPI {
    readonly apiVersion: '1.0.0'
    readonly command: string
    readonly editorType: 'figma' | 'figjam'
    readonly pluginId?: string
    readonly widgetId?: string
    readonly fileKey: string | undefined
    skipInvisibleInstanceChildren: boolean
    readonly timer?: TimerAPI
    readonly viewport: ViewportAPI
    readonly currentUser: User | null
    readonly activeUsers: ActiveUser[]
    readonly textreview?: TextReviewAPI
    readonly payments?: PaymentsAPI
    closePlugin(message?: string): void
    notify(message: string, options?: NotificationOptions): NotificationHandler
    commitUndo(): void
    triggerUndo(): void
    saveVersionHistoryAsync(title: string, description?: string): Promise<VersionHistoryResult>
    showUI(html: string, options?: ShowUIOptions): void
    readonly ui: UIAPI
    readonly clientStorage: ClientStorageAPI
    readonly parameters: ParametersAPI
    getNodeById(id: string): BaseNode | null
    getStyleById(id: string): BaseStyle | null
    readonly root: DocumentNode
    currentPage: PageNode
    on(type: ArgFreeEventType, callback: () => void): void
    on(type: 'run', callback: (event: RunEvent) => void): void
    on(type: 'drop', callback: (event: DropEvent) => boolean): void
    on(type: 'documentchange', callback: (event: DocumentChangeEvent) => void): void
    on(
        type: 'textreview',
        callback: (event: TextReviewEvent) => Promise<TextReviewRange[]> | TextReviewRange[],
    ): void
    once(type: ArgFreeEventType, callback: () => void): void
    once(type: 'run', callback: (event: RunEvent) => void): void
    once(type: 'drop', callback: (event: DropEvent) => boolean): void
    once(type: 'documentchange', callback: (event: DocumentChangeEvent) => void): void
    once(
        type: 'textreview',
        callback: (event: TextReviewEvent) => Promise<TextReviewRange[]> | TextReviewRange[],
    ): void
    off(type: ArgFreeEventType, callback: () => void): void
    off(type: 'run', callback: (event: RunEvent) => void): void
    off(type: 'drop', callback: (event: DropEvent) => boolean): void
    off(type: 'documentchange', callback: (event: DocumentChangeEvent) => void): void
    off(
        type: 'textreview',
        callback: (event: TextReviewEvent) => Promise<TextReviewRange[]> | TextReviewRange[],
    ): void
    readonly mixed: unique symbol
    createRectangle(): RectangleNode
    createLine(): LineNode
    createEllipse(): EllipseNode
    createPolygon(): PolygonNode
    createStar(): StarNode
    createVector(): VectorNode
    createText(): TextNode
    createFrame(): FrameNode
    createComponent(): ComponentNode
    createPage(): PageNode
    createSlice(): SliceNode
    createSticky(): StickyNode
    createConnector(): ConnectorNode
    createShapeWithText(): ShapeWithTextNode
    createCodeBlock(): CodeBlockNode
    createSection(): SectionNode
    createTable(numRows?: number, numColumns?: number): TableNode
    createNodeFromJSXAsync(jsx: any): Promise<SceneNode>
    createBooleanOperation(): BooleanOperationNode
    createPaintStyle(): PaintStyle
    createTextStyle(): TextStyle
    createEffectStyle(): EffectStyle
    createGridStyle(): GridStyle
    getLocalPaintStyles(): PaintStyle[]
    getLocalTextStyles(): TextStyle[]
    getLocalEffectStyles(): EffectStyle[]
    getLocalGridStyles(): GridStyle[]
    moveLocalPaintStyleAfter(targetNode: PaintStyle, reference: PaintStyle | null): void
    moveLocalTextStyleAfter(targetNode: TextStyle, reference: TextStyle | null): void
    moveLocalEffectStyleAfter(targetNode: EffectStyle, reference: EffectStyle | null): void
    moveLocalGridStyleAfter(targetNode: GridStyle, reference: GridStyle | null): void
    moveLocalPaintFolderAfter(targetFolder: string, reference: string | null): void
    moveLocalTextFolderAfter(targetFolder: string, reference: string | null): void
    moveLocalEffectFolderAfter(targetFolder: string, reference: string | null): void
    moveLocalGridFolderAfter(targetFolder: string, reference: string | null): void
    importComponentByKeyAsync(key: string): Promise<ComponentNode>
    importComponentSetByKeyAsync(key: string): Promise<ComponentSetNode>
    importStyleByKeyAsync(key: string): Promise<BaseStyle>
    listAvailableFontsAsync(): Promise<Font[]>
    loadFontAsync(fontName: FontName): Promise<void>
    readonly hasMissingFont: boolean
    createNodeFromSvg(svg: string): FrameNode
    createImage(data: Uint8Array): Image
    createImageAsync(src: string): Promise<Image>
    getImageByHash(hash: string): Image | null
    createVideoAsync(data: Uint8Array): Promise<Video>
    createLinkPreviewAsync(url: string): Promise<EmbedNode | LinkUnfurlNode>
    createGif(hash: string): MediaNode
    combineAsVariants(
        nodes: ReadonlyArray<ComponentNode>,
        parent: BaseNode & ChildrenMixin,
        index?: number,
    ): ComponentSetNode
    group(nodes: ReadonlyArray<BaseNode>, parent: BaseNode & ChildrenMixin, index?: number): GroupNode
    flatten(
        nodes: ReadonlyArray<BaseNode>,
        parent?: BaseNode & ChildrenMixin,
        index?: number,
    ): VectorNode
    union(
        nodes: ReadonlyArray<BaseNode>,
        parent: BaseNode & ChildrenMixin,
        index?: number,
    ): BooleanOperationNode
    subtract(
        nodes: ReadonlyArray<BaseNode>,
        parent: BaseNode & ChildrenMixin,
        index?: number,
    ): BooleanOperationNode
    intersect(
        nodes: ReadonlyArray<BaseNode>,
        parent: BaseNode & ChildrenMixin,
        index?: number,
    ): BooleanOperationNode
    exclude(
        nodes: ReadonlyArray<BaseNode>,
        parent: BaseNode & ChildrenMixin,
        index?: number,
    ): BooleanOperationNode
    ungroup(node: SceneNode & ChildrenMixin): Array<SceneNode>
    base64Encode(data: Uint8Array): string
    base64Decode(data: string): Uint8Array
    getFileThumbnailNode(): FrameNode | ComponentNode | ComponentSetNode | SectionNode | null
    setFileThumbnailNodeAsync(
        node: FrameNode | ComponentNode | ComponentSetNode | SectionNode | null,
    ): Promise<void>
}
export interface VersionHistoryResult {
    id: string
}
export type PaymentStatus = {
    type: 'UNPAID' | 'PAID' | 'NOT_SUPPORTED'
}
export interface PaymentsAPI {
    readonly status: PaymentStatus
    setPaymentStatusInDevelopment(status: PaymentStatus): void
    getUserFirstRanSecondsAgo(): number
    initiateCheckoutAsync(options?: {
        interstitial?: 'PAID_FEATURE' | 'TRIAL_ENDED' | 'SKIP'
    }): Promise<void>
    requestCheckout(): void
    getPluginPaymentTokenAsync(): Promise<string>
}
export interface ClientStorageAPI {
    getAsync(key: string): Promise<any | undefined>
    setAsync(key: string, value: any): Promise<void>
    deleteAsync(key: string): Promise<void>
    keysAsync(): Promise<string[]>
}
export interface NotificationOptions {
    timeout?: number
    error?: boolean
    onDequeue?: (reason: NotifyDequeueReason) => void
    button?: {
        text: string
        action: () => boolean | void
    }
}
export type NotifyDequeueReason = 'timeout' | 'dismiss' | 'action_button_click'
export interface NotificationHandler {
    cancel: () => void
}
export interface ShowUIOptions {
    visible?: boolean
    title?: string
    width?: number
    height?: number
    position?: {
        x: number
        y: number
    }
    themeColors?: boolean
}
export interface UIPostMessageOptions {
    origin?: string
}
export interface OnMessageProperties {
    origin: string
}
export type MessageEventHandler = (pluginMessage: any, props: OnMessageProperties) => void
export interface UIAPI {
    show(): void
    hide(): void
    resize(width: number, height: number): void
    reposition(x: number, y: number): void
    close(): void
    postMessage(pluginMessage: any, options?: UIPostMessageOptions): void
    onmessage: MessageEventHandler | undefined
    on(type: 'message', callback: MessageEventHandler): void
    once(type: 'message', callback: MessageEventHandler): void
    off(type: 'message', callback: MessageEventHandler): void
}
export interface TimerAPI {
    readonly remaining: number
    readonly total: number
    readonly state: 'STOPPED' | 'PAUSED' | 'RUNNING'
    pause: () => void
    resume: () => void
    start: (seconds: number) => void
    stop: () => void
}
export interface ViewportAPI {
    center: Vector
    zoom: number
    scrollAndZoomIntoView(nodes: ReadonlyArray<BaseNode>): void
    readonly bounds: Rect
}
export interface TextReviewAPI {
    requestToBeEnabledAsync(): Promise<void>
    requestToBeDisabledAsync(): Promise<void>
    readonly isEnabled: boolean
}
export interface ParameterValues {
    [key: string]: any
}
export interface SuggestionResults {
    setSuggestions(
        suggestions: Array<
            | string
            | {
                name: string
                data?: any
                icon?: string | Uint8Array
                iconUrl?: string
            }
        >,
    ): void
    setError(message: string): void
    setLoadingMessage(message: string): void
}
export type ParameterInputEvent<ParametersType = ParameterValues> = {
    query: string
    key: string
    parameters: Partial<ParametersType>
    result: SuggestionResults
}
export interface ParametersAPI {
    on(type: 'input', callback: (event: ParameterInputEvent) => void): void
    once(type: 'input', callback: (event: ParameterInputEvent) => void): void
    off(type: 'input', callback: (event: ParameterInputEvent) => void): void
}
export interface RunEvent<ParametersType = ParameterValues | undefined> {
    command: string
    parameters: ParametersType
}
export interface DropEvent {
    node: BaseNode | SceneNode
    x: number
    y: number
    absoluteX: number
    absoluteY: number
    items: DropItem[]
    files: DropFile[]
    dropMetadata?: any
}
export interface DropItem {
    type: string
    data: string
}
export interface DropFile {
    name: string
    type: string
    getBytesAsync(): Promise<Uint8Array>
    getTextAsync(): Promise<string>
}
export interface DocumentChangeEvent {
    documentChanges: DocumentChange[]
}
export interface BaseDocumentChange {
    id: string
    origin: 'LOCAL' | 'REMOTE'
}
export interface BaseNodeChange extends BaseDocumentChange {
    node: SceneNode | RemovedNode
}
export interface RemovedNode {
    readonly removed: true
    readonly type: NodeType
    readonly id: string
}
export interface CreateChange extends BaseNodeChange {
    type: 'CREATE'
}
export interface DeleteChange extends BaseNodeChange {
    type: 'DELETE'
}
export interface PropertyChange extends BaseNodeChange {
    type: 'PROPERTY_CHANGE'
    properties: NodeChangeProperty[]
}
export interface BaseStyleChange extends BaseDocumentChange {
    style: PaintStyle | TextStyle | GridStyle | EffectStyle | null
}
export interface StyleCreateChange extends BaseStyleChange {
    type: 'STYLE_CREATE'
}
export interface StyleDeleteChange extends BaseStyleChange {
    type: 'STYLE_DELETE'
    style: null
}
export interface StylePropertyChange extends BaseStyleChange {
    type: 'STYLE_PROPERTY_CHANGE'
    properties: StyleChangeProperty[]
}
export type DocumentChange =
    | CreateChange
    | DeleteChange
    | PropertyChange
    | StyleCreateChange
    | StyleDeleteChange
    | StylePropertyChange
export type NodeChangeProperty =
    | 'pointCount'
    | 'name'
    | 'width'
    | 'height'
    | 'parent'
    | 'pluginData'
    | 'constraints'
    | 'locked'
    | 'visible'
    | 'opacity'
    | 'blendMode'
    | 'layoutGrids'
    | 'guides'
    | 'characters'
    | 'styledTextSegments'
    | 'vectorNetwork'
    | 'effects'
    | 'exportSettings'
    | 'arcData'
    | 'autoRename'
    | 'fontName'
    | 'innerRadius'
    | 'fontSize'
    | 'lineHeight'
    | 'leadingTrim'
    | 'paragraphIndent'
    | 'paragraphSpacing'
    | 'listSpacing'
    | 'hangingPunctuation'
    | 'hangingList'
    | 'letterSpacing'
    | 'textAlignHorizontal'
    | 'textAlignVertical'
    | 'textCase'
    | 'textDecoration'
    | 'textAutoResize'
    | 'fills'
    | 'topLeftRadius'
    | 'topRightRadius'
    | 'bottomLeftRadius'
    | 'bottomRightRadius'
    | 'constrainProportions'
    | 'strokes'
    | 'strokeWeight'
    | 'strokeAlign'
    | 'strokeCap'
    | 'strokeJoin'
    | 'strokeMiterLimit'
    | 'booleanOperation'
    | 'overflowDirection'
    | 'dashPattern'
    | 'backgrounds'
    | 'handleMirroring'
    | 'cornerRadius'
    | 'cornerSmoothing'
    | 'relativeTransform'
    | 'x'
    | 'y'
    | 'rotation'
    | 'isMask'
    | 'clipsContent'
    | 'type'
    | 'overlayPositionType'
    | 'overlayBackgroundInteraction'
    | 'overlayBackground'
    | 'prototypeStartNode'
    | 'prototypeBackgrounds'
    | 'expanded'
    | 'fillStyleId'
    | 'strokeStyleId'
    | 'backgroundStyleId'
    | 'textStyleId'
    | 'effectStyleId'
    | 'gridStyleId'
    | 'description'
    | 'layoutMode'
    | 'paddingLeft'
    | 'paddingTop'
    | 'paddingRight'
    | 'paddingBottom'
    | 'itemSpacing'
    | 'layoutAlign'
    | 'counterAxisSizingMode'
    | 'primaryAxisSizingMode'
    | 'primaryAxisAlignItems'
    | 'counterAxisAlignItems'
    | 'layoutGrow'
    | 'layoutPositioning'
    | 'itemReverseZIndex'
    | 'hyperlink'
    | 'mediaData'
    | 'stokeTopWeight'
    | 'strokeBottomWeight'
    | 'strokeLeftWeight'
    | 'strokeRightWeight'
    | 'reactions'
    | 'flowStartingPoints'
    | 'shapeType'
    | 'connectorStart'
    | 'connectorEnd'
    | 'connectorLineType'
    | 'connectorStartStrokeCap'
    | 'connectorEndStrokeCap'
    | 'codeLanguage'
    | 'widgetSyncedState'
    | 'componentPropertyDefinitions'
    | 'componentPropertyReferences'
    | 'componentProperties'
    | 'embedData'
    | 'linkUnfurlData'
    | 'text'
    | 'authorVisible'
    | 'authorName'
    | 'code'
    | 'textBackground'
export type StyleChangeProperty =
    | 'name'
    | 'pluginData'
    | 'type'
    | 'description'
    | 'remote'
    | 'documentationLinks'
    | 'fontSize'
    | 'textDecoration'
    | 'letterSpacing'
    | 'lineHeight'
    | 'leadingTrim'
    | 'paragraphIndent'
    | 'paragraphSpacing'
    | 'listSpacing'
    | 'hangingPunctuation'
    | 'hangingList'
    | 'textCase'
    | 'paint'
    | 'effects'
    | 'layoutGrids'
export type TextReviewEvent = {
    text: string
}
export type TextReviewRange = {
    start: number
    end: number
    suggestions: string[]
    color?: 'RED' | 'GREEN' | 'BLUE'
}
export type Transform = [[number, number, number], [number, number, number]]
export interface Vector {
    readonly x: number
    readonly y: number
}
export interface Rect {
    readonly x: number
    readonly y: number
    readonly width: number
    readonly height: number
}
export interface RGB {
    readonly r: number
    readonly g: number
    readonly b: number
}
export interface RGBA {
    readonly r: number
    readonly g: number
    readonly b: number
    readonly a: number
}
export interface FontName {
    readonly family: string
    readonly style: string
}
export type TextCase =
    | 'ORIGINAL'
    | 'UPPER'
    | 'LOWER'
    | 'TITLE'
    | 'SMALL_CAPS'
    | 'SMALL_CAPS_FORCED'
export type TextDecoration = 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH'
export interface ArcData {
    readonly startingAngle: number
    readonly endingAngle: number
    readonly innerRadius: number
}
export interface DropShadowEffect {
    readonly type: 'DROP_SHADOW'
    readonly color: RGBA
    readonly offset: Vector
    readonly radius: number
    readonly spread?: number
    readonly visible: boolean
    readonly blendMode: BlendMode
    readonly showShadowBehindNode?: boolean
}
export interface InnerShadowEffect {
    readonly type: 'INNER_SHADOW'
    readonly color: RGBA
    readonly offset: Vector
    readonly radius: number
    readonly spread?: number
    readonly visible: boolean
    readonly blendMode: BlendMode
}
export interface BlurEffect {
    readonly type: 'LAYER_BLUR' | 'BACKGROUND_BLUR'
    readonly radius: number
    readonly visible: boolean
}
export type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect
export type ConstraintType = 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE'
export interface Constraints {
    readonly horizontal: ConstraintType
    readonly vertical: ConstraintType
}
export interface ColorStop {
    readonly position: number
    readonly color: RGBA
}
export interface ImageFilters {
    readonly exposure?: number
    readonly contrast?: number
    readonly saturation?: number
    readonly temperature?: number
    readonly tint?: number
    readonly highlights?: number
    readonly shadows?: number
}
export interface SolidPaint {
    readonly type: 'SOLID'
    readonly color: RGB
    readonly visible?: boolean
    readonly opacity?: number
    readonly blendMode?: BlendMode
}
export interface GradientPaint {
    readonly type: 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND'
    readonly gradientTransform: Transform
    readonly gradientStops: ReadonlyArray<ColorStop>
    readonly visible?: boolean
    readonly opacity?: number
    readonly blendMode?: BlendMode
}
export interface ImagePaint {
    readonly type: 'IMAGE'
    readonly scaleMode: 'FILL' | 'FIT' | 'CROP' | 'TILE'
    readonly imageHash: string | null
    readonly imageTransform?: Transform
    readonly scalingFactor?: number
    readonly rotation?: number
    readonly filters?: ImageFilters
    readonly visible?: boolean
    readonly opacity?: number
    readonly blendMode?: BlendMode
}
export interface VideoPaint {
    readonly type: 'VIDEO'
    readonly scaleMode: 'FILL' | 'FIT' | 'CROP' | 'TILE'
    readonly videoHash: string | null
    readonly videoTransform?: Transform
    readonly scalingFactor?: number
    readonly rotation?: number
    readonly filters?: ImageFilters
    readonly visible?: boolean
    readonly opacity?: number
    readonly blendMode?: BlendMode
}
export type Paint = SolidPaint | GradientPaint | ImagePaint | VideoPaint
export interface Guide {
    readonly axis: 'X' | 'Y'
    readonly offset: number
}
export interface RowsColsLayoutGrid {
    readonly pattern: 'ROWS' | 'COLUMNS'
    readonly alignment: 'MIN' | 'MAX' | 'STRETCH' | 'CENTER'
    readonly gutterSize: number
    readonly count: number
    readonly sectionSize?: number
    readonly offset?: number
    readonly visible?: boolean
    readonly color?: RGBA
}
export interface GridLayoutGrid {
    readonly pattern: 'GRID'
    readonly sectionSize: number
    readonly visible?: boolean
    readonly color?: RGBA
}
export type LayoutGrid = RowsColsLayoutGrid | GridLayoutGrid
export interface ExportSettingsConstraints {
    readonly type: 'SCALE' | 'WIDTH' | 'HEIGHT'
    readonly value: number
}
export interface ExportSettingsImage {
    readonly format: 'JPG' | 'PNG'
    readonly contentsOnly?: boolean
    readonly useAbsoluteBounds?: boolean
    readonly suffix?: string
    readonly constraint?: ExportSettingsConstraints
}
export interface ExportSettingsSVGBase {
    readonly contentsOnly?: boolean
    readonly useAbsoluteBounds?: boolean
    readonly suffix?: string
    readonly svgOutlineText?: boolean
    readonly svgIdAttribute?: boolean
    readonly svgSimplifyStroke?: boolean
}
export interface ExportSettingsSVG extends ExportSettingsSVGBase {
    readonly format: 'SVG'
}
export interface ExportSettingsSVGString extends ExportSettingsSVGBase {
    readonly format: 'SVG_STRING'
}
export interface ExportSettingsPDF {
    readonly format: 'PDF'
    readonly contentsOnly?: boolean
    readonly useAbsoluteBounds?: boolean
    readonly suffix?: string
}
export type ExportSettings = ExportSettingsImage | ExportSettingsSVG | ExportSettingsPDF
export type WindingRule = 'NONZERO' | 'EVENODD'
export interface VectorVertex {
    readonly x: number
    readonly y: number
    readonly strokeCap?: StrokeCap
    readonly strokeJoin?: StrokeJoin
    readonly cornerRadius?: number
    readonly handleMirroring?: HandleMirroring
}
export interface VectorSegment {
    readonly start: number
    readonly end: number
    readonly tangentStart?: Vector
    readonly tangentEnd?: Vector
}
export interface VectorRegion {
    readonly windingRule: WindingRule
    readonly loops: ReadonlyArray<ReadonlyArray<number>>
    readonly fills?: ReadonlyArray<Paint>
    readonly fillStyleId?: string
}
export interface VectorNetwork {
    readonly vertices: ReadonlyArray<VectorVertex>
    readonly segments: ReadonlyArray<VectorSegment>
    readonly regions?: ReadonlyArray<VectorRegion>
}
export interface VectorPath {
    readonly windingRule: WindingRule | 'NONE'
    readonly data: string
}
export type VectorPaths = ReadonlyArray<VectorPath>
export interface LetterSpacing {
    readonly value: number
    readonly unit: 'PIXELS' | 'PERCENT'
}
export type LineHeight =
    | {
        readonly value: number
        readonly unit: 'PIXELS' | 'PERCENT'
    }
    | {
        readonly unit: 'AUTO'
    }
export type LeadingTrim = 'CAP_HEIGHT' | 'NONE'
export type HyperlinkTarget = {
    type: 'URL' | 'NODE'
    value: string
}
export type TextListOptions = {
    type: 'ORDERED' | 'UNORDERED' | 'NONE'
}
export type BlendMode =
    | 'PASS_THROUGH'
    | 'NORMAL'
    | 'DARKEN'
    | 'MULTIPLY'
    | 'LINEAR_BURN'
    | 'COLOR_BURN'
    | 'LIGHTEN'
    | 'SCREEN'
    | 'LINEAR_DODGE'
    | 'COLOR_DODGE'
    | 'OVERLAY'
    | 'SOFT_LIGHT'
    | 'HARD_LIGHT'
    | 'DIFFERENCE'
    | 'EXCLUSION'
    | 'HUE'
    | 'SATURATION'
    | 'COLOR'
    | 'LUMINOSITY'
export interface Font {
    fontName: FontName
}
export interface StyledTextSegment {
    characters: string
    start: number
    end: number
    fontSize: number
    fontName: FontName
    fontWeight: number
    textDecoration: TextDecoration
    textCase: TextCase
    lineHeight: LineHeight
    letterSpacing: LetterSpacing
    fills: Paint[]
    textStyleId: string
    fillStyleId: string
    listOptions: TextListOptions
    indentation: number
    hyperlink: HyperlinkTarget | null
}
export type Reaction = {
    action: Action | null
    trigger: Trigger | null
}
export type Action =
    | {
        readonly type: 'BACK' | 'CLOSE'
    }
    | {
        readonly type: 'URL'
        url: string
    }
    | {
        readonly type: 'UPDATE_MEDIA_RUNTIME'
        readonly destinationId: string | null
        readonly mediaAction:
        | 'PLAY'
        | 'PAUSE'
        | 'TOGGLE_PLAY_PAUSE'
        | 'MUTE'
        | 'UNMUTE'
        | 'TOGGLE_MUTE_UNMUTE'
    }
    | {
        readonly type: 'UPDATE_MEDIA_RUNTIME'
        readonly destinationId?: string | null
        readonly mediaAction: 'SKIP_FORWARD' | 'SKIP_BACKWARD'
        readonly amountToSkip: number
    }
    | {
        readonly type: 'UPDATE_MEDIA_RUNTIME'
        readonly destinationId?: string | null
        readonly mediaAction: 'SKIP_TO'
        readonly newTimestamp: number
    }
    | {
        readonly type: 'NODE'
        readonly destinationId: string | null
        readonly navigation: Navigation
        readonly transition: Transition | null
        readonly preserveScrollPosition?: boolean
        readonly overlayRelativePosition?: Vector
        readonly resetVideoPosition?: boolean
        readonly resetScrollPosition?: boolean
        readonly resetInteractiveComponents?: boolean
    }
export interface SimpleTransition {
    readonly type: 'DISSOLVE' | 'SMART_ANIMATE' | 'SCROLL_ANIMATE'
    readonly easing: Easing
    readonly duration: number
}
export interface DirectionalTransition {
    readonly type: 'MOVE_IN' | 'MOVE_OUT' | 'PUSH' | 'SLIDE_IN' | 'SLIDE_OUT'
    readonly direction: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'
    readonly matchLayers: boolean
    readonly easing: Easing
    readonly duration: number
}
export type Transition = SimpleTransition | DirectionalTransition
export type Trigger =
    | {
        readonly type: 'ON_CLICK' | 'ON_HOVER' | 'ON_PRESS' | 'ON_DRAG'
    }
    | {
        readonly type: 'AFTER_TIMEOUT'
        readonly timeout: number
    }
    | {
        readonly type: 'MOUSE_ENTER' | 'MOUSE_LEAVE' | 'MOUSE_UP' | 'MOUSE_DOWN'
        readonly delay: number
    }
    | {
        readonly type: 'ON_KEY_DOWN'
        readonly device: 'KEYBOARD' | 'XBOX_ONE' | 'PS4' | 'SWITCH_PRO' | 'UNKNOWN_CONTROLLER'
        readonly keyCodes: ReadonlyArray<number>
    }
    | {
        readonly type: 'ON_MEDIA_HIT'
        readonly mediaHitTime: number
    }
    | {
        readonly type: 'ON_MEDIA_END'
    }
export type Navigation = 'NAVIGATE' | 'SWAP' | 'OVERLAY' | 'SCROLL_TO' | 'CHANGE_TO'
export interface Easing {
    readonly type:
    | 'EASE_IN'
    | 'EASE_OUT'
    | 'EASE_IN_AND_OUT'
    | 'LINEAR'
    | 'EASE_IN_BACK'
    | 'EASE_OUT_BACK'
    | 'EASE_IN_AND_OUT_BACK'
    | 'CUSTOM_CUBIC_BEZIER'
    | 'GENTLE'
    | 'QUICK'
    | 'BOUNCY'
    | 'SLOW'
    | 'CUSTOM_SPRING'
    readonly easingFunctionCubicBezier?: EasingFunctionBezier
    readonly easingFunctionSpring?: EasingFunctionSpring
}
export interface EasingFunctionBezier {
    x1: number
    y1: number
    x2: number
    y2: number
}
export interface EasingFunctionSpring {
    mass: number
    stiffness: number
    damping: number
    initialVelocity: number
}
export type OverflowDirection = 'NONE' | 'HORIZONTAL' | 'VERTICAL' | 'BOTH'
export type OverlayPositionType =
    | 'CENTER'
    | 'TOP_LEFT'
    | 'TOP_CENTER'
    | 'TOP_RIGHT'
    | 'BOTTOM_LEFT'
    | 'BOTTOM_CENTER'
    | 'BOTTOM_RIGHT'
    | 'MANUAL'
export type OverlayBackground =
    | {
        readonly type: 'NONE'
    }
    | {
        readonly type: 'SOLID_COLOR'
        readonly color: RGBA
    }
export type OverlayBackgroundInteraction = 'NONE' | 'CLOSE_ON_CLICK_OUTSIDE'
export type PublishStatus = 'UNPUBLISHED' | 'CURRENT' | 'CHANGED'
export interface ConnectorEndpointPosition {
    position: {
        x: number
        y: number
    }
}
export interface ConnectorEndpointPositionAndEndpointNodeId {
    position: {
        x: number
        y: number
    }
    endpointNodeId: string
}
export interface ConnectorEndpointEndpointNodeIdAndMagnet {
    endpointNodeId: string
    magnet: 'NONE' | 'AUTO' | 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'
}
export type ConnectorEndpoint =
    | ConnectorEndpointPosition
    | ConnectorEndpointEndpointNodeIdAndMagnet
    | ConnectorEndpointPositionAndEndpointNodeId
export type ConnectorStrokeCap =
    | 'NONE'
    | 'ARROW_EQUILATERAL'
    | 'ARROW_LINES'
    | 'TRIANGLE_FILLED'
    | 'DIAMOND_FILLED'
    | 'CIRCLE_FILLED'
export interface BaseNodeMixin extends PluginDataMixin {
    readonly id: string
    readonly parent: (BaseNode & ChildrenMixin) | null
    name: string
    readonly removed: boolean
    toString(): string
    remove(): void
    setRelaunchData(data: { [command: string]: string }): void
    getRelaunchData(): {
        [command: string]: string
    }
}
export interface PluginDataMixin {
    getPluginData(key: string): string
    setPluginData(key: string, value: string): void
    getPluginDataKeys(): string[]
    getSharedPluginData(namespace: string, key: string): string
    setSharedPluginData(namespace: string, key: string, value: string): void
    getSharedPluginDataKeys(namespace: string): string[]
}
export interface SceneNodeMixin {
    visible: boolean
    locked: boolean
    readonly stuckNodes: SceneNode[]
    readonly attachedConnectors: ConnectorNode[]
    componentPropertyReferences:
    | {
        [nodeProperty in 'visible' | 'characters' | 'mainComponent']?: string
    }
    | null
}
export interface StickableMixin {
    stuckTo: SceneNode | null
}
export interface ChildrenMixin {
    readonly children: ReadonlyArray<SceneNode>
    appendChild(child: SceneNode): void
    insertChild(index: number, child: SceneNode): void
    findChildren(callback?: (node: SceneNode) => boolean): SceneNode[]
    findChild(callback: (node: SceneNode) => boolean): SceneNode | null
    findAll(callback?: (node: SceneNode) => boolean): SceneNode[]
    findOne(callback: (node: SceneNode) => boolean): SceneNode | null
    findAllWithCriteria<T extends NodeType[]>(criteria: {
        types: T
    }): Array<
        {
            type: T[number]
        } & SceneNode
    >
    findWidgetNodesByWidgetId(widgetId: string): Array<WidgetNode>
}
export interface ConstraintMixin {
    constraints: Constraints
}
export interface DimensionAndPositionMixin {
    x: number
    y: number
    readonly width: number
    readonly height: number
    relativeTransform: Transform
    readonly absoluteTransform: Transform
    readonly absoluteBoundingBox: Rect | null
}
export interface LayoutMixin extends DimensionAndPositionMixin {
    readonly absoluteRenderBounds: Rect | null
    constrainProportions: boolean
    rotation: number
    layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT'
    layoutGrow: number
    layoutPositioning: 'AUTO' | 'ABSOLUTE'
    resize(width: number, height: number): void
    resizeWithoutConstraints(width: number, height: number): void
    rescale(scale: number): void
}
export interface BlendMixin extends MinimalBlendMixin {
    isMask: boolean
    effects: ReadonlyArray<Effect>
    effectStyleId: string
}
export interface ContainerMixin {
    expanded: boolean
}
export interface DeprecatedBackgroundMixin {
    backgrounds: ReadonlyArray<Paint>
    backgroundStyleId: string
}
export type StrokeCap = 'NONE' | 'ROUND' | 'SQUARE' | 'ARROW_LINES' | 'ARROW_EQUILATERAL'
export type StrokeJoin = 'MITER' | 'BEVEL' | 'ROUND'
export type HandleMirroring = 'NONE' | 'ANGLE' | 'ANGLE_AND_LENGTH'
export interface MinimalStrokesMixin {
    strokes: ReadonlyArray<Paint>
    strokeStyleId: string
    strokeWeight: number | PluginAPI['mixed']
    strokeJoin: StrokeJoin | PluginAPI['mixed']
    strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE'
    dashPattern: ReadonlyArray<number>
    strokeGeometry: VectorPaths
}
export interface IndividualStrokesMixin {
    strokeTopWeight: number
    strokeBottomWeight: number
    strokeLeftWeight: number
    strokeRightWeight: number
}
export interface MinimalFillsMixin {
    fills: ReadonlyArray<Paint> | PluginAPI['mixed']
    fillStyleId: string | PluginAPI['mixed']
}
export interface GeometryMixin extends MinimalStrokesMixin, MinimalFillsMixin {
    strokeCap: StrokeCap | PluginAPI['mixed']
    strokeMiterLimit: number
    outlineStroke(): VectorNode | null
    fillGeometry: VectorPaths
}
export interface CornerMixin {
    cornerRadius: number | PluginAPI['mixed']
    cornerSmoothing: number
}
export interface RectangleCornerMixin {
    topLeftRadius: number
    topRightRadius: number
    bottomLeftRadius: number
    bottomRightRadius: number
}
export interface ExportMixin {
    exportSettings: ReadonlyArray<ExportSettings>
    exportAsync(settings?: ExportSettings): Promise<Uint8Array>
    exportAsync(settings: ExportSettingsSVGString): Promise<string>
}
export interface FramePrototypingMixin {
    overflowDirection: OverflowDirection
    numberOfFixedChildren: number
    readonly overlayPositionType: OverlayPositionType
    readonly overlayBackground: OverlayBackground
    readonly overlayBackgroundInteraction: OverlayBackgroundInteraction
}
export interface VectorLikeMixin {
    vectorNetwork: VectorNetwork
    vectorPaths: VectorPaths
    handleMirroring: HandleMirroring | PluginAPI['mixed']
}
export interface ReactionMixin {
    reactions: ReadonlyArray<Reaction>
}
export interface DocumentationLink {
    readonly uri: string
}
export interface PublishableMixin {
    description: string
    documentationLinks: ReadonlyArray<DocumentationLink>
    readonly remote: boolean
    readonly key: string
    getPublishStatusAsync(): Promise<PublishStatus>
}
export interface DefaultShapeMixin
    extends BaseNodeMixin,
    SceneNodeMixin,
    ReactionMixin,
    BlendMixin,
    GeometryMixin,
    LayoutMixin,
    ExportMixin { }
export interface BaseFrameMixin
    extends BaseNodeMixin,
    SceneNodeMixin,
    ChildrenMixin,
    ContainerMixin,
    DeprecatedBackgroundMixin,
    GeometryMixin,
    CornerMixin,
    RectangleCornerMixin,
    BlendMixin,
    ConstraintMixin,
    LayoutMixin,
    ExportMixin,
    IndividualStrokesMixin {
    layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL'
    primaryAxisSizingMode: 'FIXED' | 'AUTO'
    counterAxisSizingMode: 'FIXED' | 'AUTO'
    primaryAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
    counterAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'BASELINE'
    paddingLeft: number
    paddingRight: number
    paddingTop: number
    paddingBottom: number
    itemSpacing: number
    itemReverseZIndex: boolean
    strokesIncludedInLayout: boolean
    horizontalPadding: number
    verticalPadding: number
    layoutGrids: ReadonlyArray<LayoutGrid>
    gridStyleId: string
    clipsContent: boolean
    guides: ReadonlyArray<Guide>
}
export interface DefaultFrameMixin extends BaseFrameMixin, FramePrototypingMixin, ReactionMixin { }
export interface OpaqueNodeMixin
    extends BaseNodeMixin,
    SceneNodeMixin,
    ExportMixin,
    DimensionAndPositionMixin { }
export interface MinimalBlendMixin {
    opacity: number
    blendMode: BlendMode
}
export interface VariantMixin {
    readonly variantProperties: {
        [property: string]: string
    } | null
}
export interface ComponentPropertiesMixin {
    readonly componentPropertyDefinitions: ComponentPropertyDefinitions
    addComponentProperty(
        propertyName: string,
        type: ComponentPropertyType,
        defaultValue: string | boolean,
        options?: ComponentPropertyOptions,
    ): string
    editComponentProperty(
        propertyName: string,
        newValue: {
            name?: string
            defaultValue?: string | boolean
            preferredValues?: InstanceSwapPreferredValue[]
        },
    ): string
    deleteComponentProperty(propertyName: string): void
}
export interface TextSublayerNode extends MinimalFillsMixin {
    readonly hasMissingFont: boolean
    paragraphIndent: number
    paragraphSpacing: number
    listSpacing: number
    hangingPunctuation: boolean
    hangingList: boolean
    fontSize: number | PluginAPI['mixed']
    fontName: FontName | PluginAPI['mixed']
    readonly fontWeight: number | PluginAPI['mixed']
    textCase: TextCase | PluginAPI['mixed']
    textDecoration: TextDecoration | PluginAPI['mixed']
    letterSpacing: LetterSpacing | PluginAPI['mixed']
    lineHeight: LineHeight | PluginAPI['mixed']
    leadingTrim: LeadingTrim | PluginAPI['mixed']
    hyperlink: HyperlinkTarget | null | PluginAPI['mixed']
    characters: string
    insertCharacters(start: number, characters: string, useStyle?: 'BEFORE' | 'AFTER'): void
    deleteCharacters(start: number, end: number): void
    getRangeFontSize(start: number, end: number): number | PluginAPI['mixed']
    setRangeFontSize(start: number, end: number, value: number): void
    getRangeFontName(start: number, end: number): FontName | PluginAPI['mixed']
    setRangeFontName(start: number, end: number, value: FontName): void
    getRangeFontWeight(start: number, end: number): number | PluginAPI['mixed']
    getRangeAllFontNames(start: number, end: number): FontName[]
    getRangeTextCase(start: number, end: number): TextCase | PluginAPI['mixed']
    setRangeTextCase(start: number, end: number, value: TextCase): void
    getRangeTextDecoration(start: number, end: number): TextDecoration | PluginAPI['mixed']
    setRangeTextDecoration(start: number, end: number, value: TextDecoration): void
    getRangeLetterSpacing(start: number, end: number): LetterSpacing | PluginAPI['mixed']
    setRangeLetterSpacing(start: number, end: number, value: LetterSpacing): void
    getRangeLineHeight(start: number, end: number): LineHeight | PluginAPI['mixed']
    setRangeLineHeight(start: number, end: number, value: LineHeight): void
    getRangeHyperlink(start: number, end: number): HyperlinkTarget | null | PluginAPI['mixed']
    setRangeHyperlink(start: number, end: number, value: HyperlinkTarget | null): void
    getRangeFills(start: number, end: number): Paint[] | PluginAPI['mixed']
    setRangeFills(start: number, end: number, value: Paint[]): void
    getRangeTextStyleId(start: number, end: number): string | PluginAPI['mixed']
    setRangeTextStyleId(start: number, end: number, value: string): void
    getRangeFillStyleId(start: number, end: number): string | PluginAPI['mixed']
    setRangeFillStyleId(start: number, end: number, value: string): void
    getRangeListOptions(start: number, end: number): TextListOptions | PluginAPI['mixed']
    setRangeListOptions(start: number, end: number, value: TextListOptions): void
    getRangeIndentation(start: number, end: number): number | PluginAPI['mixed']
    setRangeIndentation(start: number, end: number, value: number): void
    getStyledTextSegments<
        StyledTextSegmentFields extends (keyof Omit<
            StyledTextSegment,
            'characters' | 'start' | 'end'
        >)[],
    >(
        fields: StyledTextSegmentFields,
        start?: number,
        end?: number,
    ): Array<
        Pick<StyledTextSegment, StyledTextSegmentFields[number] | 'characters' | 'start' | 'end'>
    >
}
export interface DocumentNode extends BaseNodeMixin {
    readonly type: 'DOCUMENT'
    readonly children: ReadonlyArray<PageNode>
    appendChild(child: PageNode): void
    insertChild(index: number, child: PageNode): void
    findChildren(callback?: (node: PageNode) => boolean): Array<PageNode>
    findChild(callback: (node: PageNode) => boolean): PageNode | null
    findAll(callback?: (node: PageNode | SceneNode) => boolean): Array<PageNode | SceneNode>
    findOne(callback: (node: PageNode | SceneNode) => boolean): PageNode | SceneNode | null
    findAllWithCriteria<T extends NodeType[]>(criteria: {
        types: T
    }): Array<
        {
            type: T[number]
        } & (PageNode | SceneNode)
    >
}
export interface PageNode extends BaseNodeMixin, ChildrenMixin, ExportMixin {
    readonly type: 'PAGE'
    clone(): PageNode
    guides: ReadonlyArray<Guide>
    selection: ReadonlyArray<SceneNode>
    selectedTextRange: {
        node: TextNode
        start: number
        end: number
    } | null
    flowStartingPoints: ReadonlyArray<{
        nodeId: string
        name: string
    }>
    backgrounds: ReadonlyArray<Paint>
    prototypeBackgrounds: ReadonlyArray<Paint>
    readonly prototypeStartNode: FrameNode | GroupNode | ComponentNode | InstanceNode | null
}
export interface FrameNode extends DefaultFrameMixin {
    readonly type: 'FRAME'
    clone(): FrameNode
}
export interface GroupNode
    extends BaseNodeMixin,
    SceneNodeMixin,
    ReactionMixin,
    ChildrenMixin,
    ContainerMixin,
    DeprecatedBackgroundMixin,
    BlendMixin,
    LayoutMixin,
    ExportMixin {
    readonly type: 'GROUP'
    clone(): GroupNode
}
export interface SliceNode extends BaseNodeMixin, SceneNodeMixin, LayoutMixin, ExportMixin {
    readonly type: 'SLICE'
    clone(): SliceNode
}
export interface RectangleNode
    extends DefaultShapeMixin,
    ConstraintMixin,
    CornerMixin,
    RectangleCornerMixin,
    IndividualStrokesMixin {
    readonly type: 'RECTANGLE'
    clone(): RectangleNode
}
export interface LineNode extends DefaultShapeMixin, ConstraintMixin {
    readonly type: 'LINE'
    clone(): LineNode
}
export interface EllipseNode extends DefaultShapeMixin, ConstraintMixin, CornerMixin {
    readonly type: 'ELLIPSE'
    clone(): EllipseNode
    arcData: ArcData
}
export interface PolygonNode extends DefaultShapeMixin, ConstraintMixin, CornerMixin {
    readonly type: 'POLYGON'
    clone(): PolygonNode
    pointCount: number
}
export interface StarNode extends DefaultShapeMixin, ConstraintMixin, CornerMixin {
    readonly type: 'STAR'
    clone(): StarNode
    pointCount: number
    innerRadius: number
}
export interface VectorNode extends DefaultShapeMixin, ConstraintMixin, CornerMixin, VectorLikeMixin {
    readonly type: 'VECTOR'
    clone(): VectorNode
}
export interface TextNode extends DefaultShapeMixin, ConstraintMixin, TextSublayerNode {
    readonly type: 'TEXT'
    clone(): TextNode
    textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED'
    textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM'
    textAutoResize: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT' | 'TRUNCATE'
    autoRename: boolean
    textStyleId: string | PluginAPI['mixed']
}
export type ComponentPropertyType = 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP' | 'VARIANT'
export type InstanceSwapPreferredValue = {
    type: 'COMPONENT' | 'COMPONENT_SET'
    key: string
}
export type ComponentPropertyOptions = {
    preferredValues?: InstanceSwapPreferredValue[]
}
export type ComponentPropertyDefinitions = {
    [propertyName: string]: {
        type: ComponentPropertyType
        defaultValue: string | boolean
        preferredValues?: InstanceSwapPreferredValue[]
        variantOptions?: string[]
    }
}
export interface ComponentSetNode extends BaseFrameMixin, PublishableMixin, ComponentPropertiesMixin {
    readonly type: 'COMPONENT_SET'
    clone(): ComponentSetNode
    readonly defaultVariant: ComponentNode
    readonly variantGroupProperties: {
        [property: string]: {
            values: string[]
        }
    }
}
export interface ComponentNode
    extends DefaultFrameMixin,
    PublishableMixin,
    VariantMixin,
    ComponentPropertiesMixin {
    readonly type: 'COMPONENT'
    clone(): ComponentNode
    createInstance(): InstanceNode
    readonly instances: InstanceNode[]
}
export type ComponentProperties = {
    [propertyName: string]: {
        type: ComponentPropertyType
        value: string | boolean
        preferredValues?: InstanceSwapPreferredValue[]
    }
}
export interface InstanceNode extends DefaultFrameMixin, VariantMixin {
    readonly type: 'INSTANCE'
    clone(): InstanceNode
    mainComponent: ComponentNode | null
    swapComponent(componentNode: ComponentNode): void
    setProperties(properties: { [propertyName: string]: string | boolean }): void
    readonly componentProperties: ComponentProperties
    detachInstance(): FrameNode
    scaleFactor: number
    readonly exposedInstances: InstanceNode[]
    isExposedInstance: boolean
    readonly overrides: {
        id: string
        overriddenFields: NodeChangeProperty[]
    }[]
    resetOverrides(): void
}
export interface BooleanOperationNode
    extends DefaultShapeMixin,
    ChildrenMixin,
    CornerMixin,
    ContainerMixin {
    readonly type: 'BOOLEAN_OPERATION'
    clone(): BooleanOperationNode
    booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE'
}
export interface StickyNode extends OpaqueNodeMixin, MinimalFillsMixin, MinimalBlendMixin {
    readonly type: 'STICKY'
    readonly text: TextSublayerNode
    authorVisible: boolean
    authorName: string
    clone(): StickyNode
}
export interface StampNode extends DefaultShapeMixin, ConstraintMixin, StickableMixin {
    readonly type: 'STAMP'
    clone(): StampNode
    getAuthorAsync(): Promise<BaseUser | null>
}
export interface TableNode extends OpaqueNodeMixin, MinimalFillsMixin, MinimalBlendMixin {
    readonly type: 'TABLE'
    clone(): TableNode
    readonly numRows: number
    readonly numColumns: number
    cellAt(rowIndex: number, columnIndex: number): TableCellNode
    insertRow(rowIndex: number): void
    insertColumn(columnIndex: number): void
    removeRow(rowIndex: number): void
    removeColumn(columnIndex: number): void
    moveRow(fromIndex: number, toIndex: number): void
    moveColumn(fromIndex: number, toIndex: number): void
    resizeRow(rowIndex: number, height: number): void
    resizeColumn(columnIndex: number, width: number): void
}
export interface TableCellNode extends MinimalFillsMixin {
    readonly type: 'TABLE_CELL'
    readonly text: TextSublayerNode
    readonly rowIndex: number
    readonly columnIndex: number
    readonly toString: string
    readonly parent: TableNode
    readonly height: number
    readonly width: number
}
export interface HighlightNode
    extends DefaultShapeMixin,
    ConstraintMixin,
    CornerMixin,
    ReactionMixin,
    VectorLikeMixin,
    StickableMixin {
    readonly type: 'HIGHLIGHT'
    clone(): HighlightNode
}
export interface WashiTapeNode extends DefaultShapeMixin, StickableMixin {
    readonly type: 'WASHI_TAPE'
    clone(): WashiTapeNode
}
export interface ShapeWithTextNode
    extends OpaqueNodeMixin,
    MinimalFillsMixin,
    MinimalBlendMixin,
    MinimalStrokesMixin {
    readonly type: 'SHAPE_WITH_TEXT'
    shapeType:
    | 'SQUARE'
    | 'ELLIPSE'
    | 'ROUNDED_RECTANGLE'
    | 'DIAMOND'
    | 'TRIANGLE_UP'
    | 'TRIANGLE_DOWN'
    | 'PARALLELOGRAM_RIGHT'
    | 'PARALLELOGRAM_LEFT'
    | 'ENG_DATABASE'
    | 'ENG_QUEUE'
    | 'ENG_FILE'
    | 'ENG_FOLDER'
    readonly text: TextSublayerNode
    readonly cornerRadius?: number
    rotation: number
    resize(width: number, height: number): void
    rescale(scale: number): void
    clone(): ShapeWithTextNode
}
export interface CodeBlockNode extends OpaqueNodeMixin, MinimalBlendMixin {
    readonly type: 'CODE_BLOCK'
    code: string
    codeLanguage:
    | 'TYPESCRIPT'
    | 'CPP'
    | 'RUBY'
    | 'CSS'
    | 'JAVASCRIPT'
    | 'HTML'
    | 'JSON'
    | 'GRAPHQL'
    | 'PYTHON'
    | 'GO'
    | 'SQL'
    | 'SWIFT'
    | 'KOTLIN'
    | 'RUST'
    | 'BASH'
    | 'PLAINTEXT'
    clone(): CodeBlockNode
}
export interface LabelSublayerNode {
    fills: Paint[] | PluginAPI['mixed']
}
export interface ConnectorNode extends OpaqueNodeMixin, MinimalBlendMixin, MinimalStrokesMixin {
    readonly type: 'CONNECTOR'
    readonly text: TextSublayerNode
    readonly textBackground: LabelSublayerNode
    readonly cornerRadius?: number
    connectorLineType: 'ELBOWED' | 'STRAIGHT'
    connectorStart: ConnectorEndpoint
    connectorEnd: ConnectorEndpoint
    connectorStartStrokeCap: ConnectorStrokeCap
    connectorEndStrokeCap: ConnectorStrokeCap
    rotation: number
    clone(): ConnectorNode
}
export interface WidgetNode extends OpaqueNodeMixin, StickableMixin {
    readonly type: 'WIDGET'
    readonly widgetId: string
    readonly widgetSyncedState: {
        [key: string]: any
    }
    clone(): WidgetNode
    cloneWidget(
        syncedStateOverrides: {
            [name: string]: any
        },
        syncedMapOverrides?: {
            [mapName: string]: {
                [key: string]: any
            }
        },
    ): WidgetNode
    setWidgetSyncedState(
        syncedState: {
            [name: string]: any
        },
        syncedMap?: {
            [mapName: string]: {
                [key: string]: any
            }
        },
    ): void
}
export interface EmbedData {
    srcUrl: string
    canonicalUrl: string | null
    title: string | null
    description: string | null
    provider: string | null
}
export interface EmbedNode extends OpaqueNodeMixin, SceneNodeMixin {
    readonly type: 'EMBED'
    readonly embedData: EmbedData
    clone(): EmbedNode
}
export interface LinkUnfurlData {
    url: string
    title: string | null
    description: string | null
    provider: string | null
}
export interface LinkUnfurlNode extends OpaqueNodeMixin, SceneNodeMixin {
    readonly type: 'LINK_UNFURL'
    readonly linkUnfurlData: LinkUnfurlData
    clone(): LinkUnfurlNode
}
export interface MediaData {
    hash: string
}
export interface MediaNode extends OpaqueNodeMixin {
    readonly type: 'MEDIA'
    readonly mediaData: MediaData
    resize(width: number, height: number): void
    resizeWithoutConstraints(width: number, height: number): void
    clone(): MediaNode
}
export interface SectionNode extends ChildrenMixin, MinimalFillsMixin, OpaqueNodeMixin {
    readonly type: 'SECTION'
    clone(): SectionNode
    resizeWithoutConstraints(width: number, height: number): void
}
export type BaseNode = DocumentNode | PageNode | SceneNode
export type SceneNode =
    | SliceNode
    | FrameNode
    | GroupNode
    | ComponentSetNode
    | ComponentNode
    | InstanceNode
    | BooleanOperationNode
    | VectorNode
    | StarNode
    | LineNode
    | EllipseNode
    | PolygonNode
    | RectangleNode
    | TextNode
    | StickyNode
    | ConnectorNode
    | ShapeWithTextNode
    | CodeBlockNode
    | StampNode
    | WidgetNode
    | EmbedNode
    | LinkUnfurlNode
    | MediaNode
    | SectionNode
    | HighlightNode
    | WashiTapeNode
    | TableNode
export type NodeType = BaseNode['type']
export type StyleType = 'PAINT' | 'TEXT' | 'EFFECT' | 'GRID'
export type InheritedStyleField =
    | 'fillStyleId'
    | 'strokeStyleId'
    | 'backgroundStyleId'
    | 'textStyleId'
    | 'effectStyleId'
    | 'gridStyleId'
    | 'strokeStyleId'
export interface StyleConsumers {
    node: SceneNode
    fields: InheritedStyleField[]
}
export interface BaseStyle extends PublishableMixin, PluginDataMixin {
    readonly id: string
    readonly type: StyleType
    readonly consumers: StyleConsumers[]
    name: string
    remove(): void
}
export interface PaintStyle extends BaseStyle {
    type: 'PAINT'
    paints: ReadonlyArray<Paint>
}
export interface TextStyle extends BaseStyle {
    type: 'TEXT'
    fontSize: number
    textDecoration: TextDecoration
    fontName: FontName
    letterSpacing: LetterSpacing
    lineHeight: LineHeight
    leadingTrim: LeadingTrim
    paragraphIndent: number
    paragraphSpacing: number
    listSpacing: number
    hangingPunctuation: boolean
    hangingList: boolean
    textCase: TextCase
}
export interface EffectStyle extends BaseStyle {
    type: 'EFFECT'
    effects: ReadonlyArray<Effect>
}
export interface GridStyle extends BaseStyle {
    type: 'GRID'
    layoutGrids: ReadonlyArray<LayoutGrid>
}
export interface Image {
    readonly hash: string
    getBytesAsync(): Promise<Uint8Array>
    getSizeAsync(): Promise<{
        width: number
        height: number
    }>
}
export interface Video {
    readonly hash: string
}
export interface BaseUser {
    readonly id: string | null
    readonly name: string
    readonly photoUrl: string | null
}
export interface User extends BaseUser {
    readonly color: string
    readonly sessionId: number
}
export interface ActiveUser extends User {
    readonly position: Vector | null
    readonly viewport: Rect
    readonly selection: string[]
}

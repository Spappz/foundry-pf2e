import { ApplicationRenderContext } from "./../../../../foundry/client/applications/_types.mjs";
import { ContextMenuEntry } from "./../../../../foundry/client/applications/ux/context-menu.mjs";
import { ChatSpeakerData } from "./../../../../foundry/common/documents/chat-message.mjs";
import { ChatMessagePF2e } from "./../../chat-message/index.ts";
declare class ChatLogPF2e extends fa.sidebar.tabs.ChatLog {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    _onRender(context: ApplicationRenderContext, options: fa.api.HandlebarsRenderOptions): Promise<void>;
    /** Replace parent method in order to use DamageRoll class as needed */
    processMessage(
        message: string,
        options?: {
            speaker?: ChatSpeakerData;
        },
    ): Promise<ChatMessagePF2e | undefined>;
    protected _getEntryContextOptions(): ContextMenuEntry[];
}
export { ChatLogPF2e };

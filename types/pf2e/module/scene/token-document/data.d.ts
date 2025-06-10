import { DocumentFlags } from "./../../../../foundry/common/data/_module.mjs";
import { ModelPropsFromSchema } from "./../../../../foundry/common/data/fields.mjs";
import { TokenSchema } from "./../../../../foundry/common/documents/token.mjs";
type TokenFlagsPF2e = DocumentFlags & {
    pf2e: {
        [key: string]: unknown;
        linkToActorSize: boolean;
        autoscale: boolean;
    };
};
type DetectionModeEntry = ModelPropsFromSchema<TokenSchema>["detectionModes"][number];
export type { DetectionModeEntry, TokenFlagsPF2e };

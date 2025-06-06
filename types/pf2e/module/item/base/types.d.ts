import { CreatureTrait } from "@actor/creature/types.ts";
import { AbilityTrait } from "@item/ability/types.ts";
import { KingmakerTrait } from "@item/campaign-feature/types.ts";
import { NPCAttackTrait } from "@item/melee/types.ts";
import { PhysicalItemTrait } from "@item/physical/types.ts";
type ItemTrait = AbilityTrait | CreatureTrait | PhysicalItemTrait | NPCAttackTrait | KingmakerTrait;
export type { ItemTrait };

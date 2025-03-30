import type {ChampionName, ItemId, Timestamp} from './match';

interface DamageMetadata {
    basic: boolean;
    magicDamage: number;
    name: ChampionName;
    participantId: number;
    physicalDamage: number;
    spellName: string;
    spellSlot: number;
    trueDamage: number;
    type: 'OTHER' | 'MINION' | 'MONSTER';
}

interface Position {
    x: number;
    y: number;
}

type TeamId = 100 | 200;
type LaneType = 'TOP_LANE' | 'MID_LANE' | 'BOT_LANE';

type EliteMonsterType = 'HORDE' | 'DRAGON' | 'RIFTHERALD' | 'ATAKHAN' | 'BARON'; // TODO: check baron type
type EliteMonsterSubtype = 'FIRE_DRAGON' | 'CHEMTECH_DRAGON' | 'HEXTECH_DRAGON'; // TODO: more monster subtypes

export interface BaseEvent {
    timestamp: Timestamp;
    type: string;
}


export interface ItemPurchaseEvent extends BaseEvent {
    itemId: ItemId;
    participantId: number;
    type: 'ITEM_PURCHASED';
}

export interface ItemUndoEvent extends BaseEvent {
    afterId: ItemId;
    beforeId: ItemId;
    goldGain: number;
    participantId: number;
    type: 'ITEM_UNDO';
}

export interface LevelUpEvent extends BaseEvent {
    level: number;
    participantId: number;
    type: 'LEVEL_UP';
}

export interface SkillLevelUpEvent extends BaseEvent {
    levelUpType: string;
    participantId: number;
    skillSlot: number;
    type: 'SKILL_LEVEL_UP';
}

export interface WardPlaceEvent extends BaseEvent {
    creatorId: number;
    wardType: string;
    type: 'WARD_PLACED';
}

export interface ItemDestroyEvent extends BaseEvent {
    creatorId: number;
    wardType: string;
    type: 'ITEM_DESTROYED';
}

export interface ChampionKillEvent extends BaseEvent {
    assistingParticipantIds?: number[];
    bounty: number;
    killStreakLength: number;
    killerId: number;
    position: Position;
    shutdownBounty: number;
    victimDamageDealt: DamageMetadata[];
    victimDamageReceived: DamageMetadata[];
    victimId: number;
    type: 'CHAMPION_KILL';
}

export interface ChampionSpecialKillEvent extends BaseEvent {
    killType: 'KILL_MULTI' | 'KILL_FIRST_BLOOD';
    killerId: number;
    multiKillLength?: number;
    position: Position;
    type: 'CHAMPION_SPECIAL_KILL';
}

export interface FeatUpdateEvent extends BaseEvent {
    featType: number;
    featValue: number;
    teamId: TeamId;
    type: 'FEAT_UPDATE';
}

export interface TurretPlateDestroyedEvent extends BaseEvent {
    killerId: number;
    laneType: LaneType;
    position: Position;
    teamId: TeamId;
    type: 'TURRET_PLATE_DESTROYED'
}

export interface EliteMonsterKillEvent extends BaseEvent {
    assistingParticipantIds: number[];
    bounty: number;
    killerId: number;
    killerTeamId: TeamId;
    monsterSubType?: EliteMonsterSubtype;
    monsterType: EliteMonsterType;
    position: Position;
    type: 'ELITE_MONSTER_KILL';
}

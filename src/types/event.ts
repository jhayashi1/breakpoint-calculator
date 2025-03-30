import type {ItemId, Timestamp} from './match';

export interface BaseEvent {
    timestamp: Timestamp;
    type: string;
}

export interface ItemPurchaseEvent extends BaseEvent {
    itemId: ItemId;
    participantId: number;
    type: 'ITEM_PURCHASED';
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
    position: {
        x: number;
        y: number;
    };
    shutdownBounty: number;
    type: 'CHAMPION_KILL';
}

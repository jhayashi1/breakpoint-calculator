import type {CHAMPION_MAP} from '../constants/champions';
import type {ITEM_MAP} from '../constants/items';
import type {QUEUE_ID_MAP} from '../constants/queue-id';


export type PlayerId = string;
export type MatchId = string;
export type GameResult = 'GameComplete';
export type GameMode = 'CLASSIC' | 'ODIN' | 'ARAM' | 'TUTORIAL' | 'URF' | 'DOOMBOTSTEEMO' | 'ONEFORALL' | 'ASCENSION' | 'FIRSTBLOOD' | 'KINGPORO' | 'SIEGE' | 'ASSASSINATE' | 'ARSR' | 'DARKSTAR' | 'STARGUARDIAN' | 'PROJECT' | 'GAMEMODEX' | 'ODYSSEY' | 'NEXUSBLITZ' | 'ULTBOOK';
export type GameType = 'MATCHED_GAME' | 'TUTORIAL_GAME' | 'CUSTOM_GAME';
export type QueueId = keyof typeof QUEUE_ID_MAP;
export type PlatformId = 'BR1' | 'EUN1' | 'EUW1' | 'JP1' | 'KR' | 'LA1' | 'LA2' | 'NA1' | 'OC1' | 'TR1' | 'RU' | 'PH2' | 'SG2' | 'TH2' | 'TW2' | 'VN2';
export type ChampionId = keyof typeof CHAMPION_MAP;
export type ItemId = keyof typeof ITEM_MAP;
export type Feat = 'EPIC_MONSTER_KILL' | 'FIRST_BLOOD' | 'FIRST_TURRET';
export type FeatState = 0 | 1001;
export type Objective = 'atakhan' | 'baron' | 'champion' | 'dragon' | 'horde' | 'inhibitor' | 'riftHerald' | 'tower';
export type Timestamp = number;
export type Seconds = number;

interface MatchMetadata {
    dataVersion: string,
    matchId: string,
    participants: PlayerId[]
};

export interface MatchInfoResponse {
    metadata: MatchMetadata
    info: {
        endOfGameResult: GameResult,
        gameCreation: Timestamp,
        gameDuration: Seconds,
        gameEndTimestamp: Timestamp,
        gameId: number,
        gameMode: GameMode,
        gameName: string,
        gameStartTimestamp: Timestamp,
        gameType: GameType,
        gameVersion: string,
        mapId: number,
        participants: Record<string, string>[],
        platformId: PlatformId,
        queueId: QueueId,
        teams: {
            bans: {
                championId: ChampionId;
                pickTurn: number;
            }
            feats: Record<Feat, FeatState>;
            objectives: Record<Objective, {
                first: boolean;
                kills: number;
            }>;
            teamId: 100 | 200;
            win: boolean;
        }[],
        tournamentCode: string;
    }
}

export interface MatchTimelineResponse {
    data: {
        url: string;
        headers: Record<string, string>;
        request_body: string;
        data: {
            metadata: MatchMetadata
            info: {
                endOfGameResult: GameResult,
                frameInterval: number;
                frames: {
                    events: {
                        timestamp: Timestamp;
                        realTimestamp?: Timestamp;
                        participantId?: number;
                        creatorId?: number;
                        levelUpType?: string;
                        skillSlot?: number;
                        itemId?: number;
                        type: string;
                        wardType?: string;
                    }[]
                }[];
            }
        }
    }
}

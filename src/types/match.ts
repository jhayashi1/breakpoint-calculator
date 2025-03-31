import type {PlayerId, MatchId, Timestamp, Seconds} from './shared';
import type {QUEUE_ID_MAP} from '../constants/queue-id';
import type {ChampionId, ParticipantFrame} from './champions';
import type {Feat, FeatState, Objective} from './game';
import type {MatchEvent} from './event';

export type GameResult = 'GameComplete';
export type GameMode = 'CLASSIC' | 'ODIN' | 'ARAM' | 'TUTORIAL' | 'URF' | 'DOOMBOTSTEEMO' | 'ONEFORALL' | 'ASCENSION' | 'FIRSTBLOOD' | 'KINGPORO' | 'SIEGE' | 'ASSASSINATE' | 'ARSR' | 'DARKSTAR' | 'STARGUARDIAN' | 'PROJECT' | 'GAMEMODEX' | 'ODYSSEY' | 'NEXUSBLITZ' | 'ULTBOOK';
export type GameType = 'MATCHED_GAME' | 'TUTORIAL_GAME' | 'CUSTOM_GAME';
export type QueueId = keyof typeof QUEUE_ID_MAP;
export type PlatformId = 'BR1' | 'EUN1' | 'EUW1' | 'JP1' | 'KR' | 'LA1' | 'LA2' | 'NA1' | 'OC1' | 'TR1' | 'RU' | 'PH2' | 'SG2' | 'TH2' | 'TW2' | 'VN2';

interface MatchMetadata {
    dataVersion: string,
    matchId: MatchId,
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
    metadata: MatchMetadata;
    info: {
        endOfGameResult: GameResult,
        frameInterval: number;
        frames: {
            events: MatchEvent[];
            participantFrames: Record<number, ParticipantFrame>;
        }[];
    };
    gameId: number;
    participants: {
        participantId: number;
        puuid: PlayerId;
    }[]
}

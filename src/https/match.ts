import {API_BASE} from '../constants/api';
import {get} from './call';

export const getMatchInfo = async (matchId: string, auth: string): Promise<Response> => {
    return await get(`${API_BASE}/lol/match/v5/matches/${matchId}`, auth);
};

export const getMatchTimeline = async (matchId: string, auth: string): Promise<Response> => {
    return await get(`${API_BASE}/lol/match/v5/matches/${matchId}/timeline`, auth);
};

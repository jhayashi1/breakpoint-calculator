import {readFileSync, writeFileSync} from 'fs';
import {getMatchInfo, getMatchTimeline} from './https/match';
import type {MatchTimelineResponse} from './types/match';

const API_TOKEN = readFileSync('api.txt').toString();
const MATCH_ID = 'NA1_5254485468';
const e = [
    'OTHER',
    'ITEM_PURCHASED',
    'ITEM_SOLD',
    'ITEM_UNDO',
    'LEVEL_UP',
    'SKILL_LEVEL_UP',
    'WARD_PLACED',
    'WARD_KILL',
    'ITEM_DESTROYED',
    'CHAMPION_KILL',
    'CHAMPION_SPECIAL_KILL',
    'FEAT_UPDATE',
    'TURRET_PLATE_DESTROYED',
    'BUILDING_KILL',
    'OBJECTIVE_BOUNTY_PRESTART',
    'ELITE_MONSTER_KILL',
    'DRAGON_SOUL_GIVEN',
    'GAME_END',
];

const response = await getMatchTimeline(MATCH_ID, API_TOKEN);
// const response = await getMatchInfo(MATCH_ID, API_TOKEN);
const json = await response.json() as MatchTimelineResponse;
writeFileSync('test.json', JSON.stringify(json, null, 4));
const events = json.info.frames.map((frame) => frame.events.filter((event) => !e.includes(event.type))).filter((event) => event.length);
console.log(events);

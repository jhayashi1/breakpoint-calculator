import {appendFileSync, readFileSync, writeFileSync} from 'fs';
import {getMatchInfo} from './https/match';
import type {MatchInfoResponse} from './types/match';
import {appendJson} from './utils/append-json';

const API_TOKEN = readFileSync('api.txt').toString();
const GAME_PREFIX = 'NA1_';
const LAST_ID_PATH = 'last.txt';

let gameId = Number(readFileSync(LAST_ID_PATH).toString());

while (true) {
    const id = `${GAME_PREFIX}${gameId}`;
    try {
        const response = await getMatchInfo(id, API_TOKEN);

        if (response.status !== 200) {

            if (response.status !== 429 && response.status !== 404) {
                console.log(`${id}: ${response.statusText}`);
            }

            if (response.status === 429) {
                console.log(`too many requests, backing off at ${id}`);
                writeFileSync(LAST_ID_PATH, String(gameId));
                await new Promise((r) => setTimeout(r, 120 * 1000));
            } else {
                gameId++;
            }

            continue;
        }

        const json = await response.json() as MatchInfoResponse;

        if (json.info.queueId === 420) {
            const champIds = json.info.participants.map((participant) => participant.championId);
            console.log(`ranked game ${id}`);
            appendFileSync('data/ranked-games.txt', `\n${id}`);

            if (champIds.some((champ) => champ === 92)) {
                console.log(`game with riven ${id}`);
                const output = json.info.participants.filter((participant) => participant.championId === 92).map((participant) => ({participantId: participant.participantId, matchId: id}))[0];
                appendJson('data/riven-games.json', output);
            }

            if (champIds.some((champ) => champ === 720)) {
                console.log(`game with yone ${id}`);
                const output = json.info.participants.filter((participant) => participant.championId === 720).map((participant) => ({participantId: participant.participantId, matchId: id}))[0];
                appendJson('data/yone-games.json', output);
            }

            if (champIds.some((champ) => champ === 23)) {
                console.log(`game with trynd ${id}`);
                const output = json.info.participants.filter((participant) => participant.championId === 23).map((participant) => ({participantId: participant.participantId, matchId: id}))[0];
                appendJson('data/tryndamere-games.json', output);
            }
        }

        gameId++;
    } catch (e) {
        console.error(e);
        gameId++;
    }

}

// const response = await getMatchTimeline(MATCH_ID, API_TOKEN);
// const response = await getMatchInfo(MATCH_ID, API_TOKEN);
// const json = await response.json() as MatchTimelineResponse;
// writeFileSync('test.json', JSON.stringify(json, null, 4));
// const events = json.info.frames.map((frame) => frame.events.filter((event) => !e.includes(event.type))).filter((event) => event.length);
// console.log(events);

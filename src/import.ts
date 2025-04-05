import {readFileSync, writeFileSync} from 'fs';
import {getMatchInfo} from './https/match';
import type {MatchInfoResponse} from './types/match';

const API_TOKEN = readFileSync('api.txt').toString();
const games = [
    'NA1_5254485550',
    'NA1_5254485566',
    'NA1_5254486261',
    'NA1_5254486429',
    'NA1_5254487652',
    'NA1_5254487703',
    'NA1_5254487754',
    'NA1_5254487771',
    'NA1_5254487811',
    'NA1_5254488061',
    'NA1_5254488317',
    'NA1_5254488445',
    'NA1_5254488693',
    'NA1_5254488924',
    'NA1_5254489233',
    'NA1_5254489459',
    'NA1_5254489818',
    'NA1_5254489935',
    'NA1_5254489978',
    'NA1_5254490174',
    'NA1_5254490211',
    'NA1_5254490613',
    'NA1_5254490921',
    'NA1_5254491048',
    'NA1_5254491151',
    'NA1_5254491187',
    'NA1_5254491209',
    'NA1_5254491310',
    'NA1_5254491523',
    'NA1_5254491859',
    'NA1_5254491944',
    'NA1_5254492261',
    'NA1_5254492568',
    'NA1_5254492611',
    'NA1_5254492638',
    'NA1_5254493223',
    'NA1_5254493282',
    'NA1_5254493301',
    'NA1_5254493338',
    'NA1_5254494397',
    'NA1_5254494430',
    'NA1_5254494997',
    'NA1_5254495180',
    'NA1_5254495305',
    'NA1_5254495319',
    'NA1_5254495649',
    'NA1_5254495710',
    'NA1_5254495972',
    'NA1_5254496270',
    'NA1_5254496334',
    'NA1_5254496645',
    'NA1_5254496817',
    'NA1_5254496937',
    'NA1_5254497181',
    'NA1_5254497290',
    'NA1_5254497498',
    'NA1_5254497521',
    'NA1_5254497570',
    'NA1_5254497631',
    'NA1_5254497816',
    'NA1_5254497923',
    'NA1_5254498380',
    'NA1_5254498412',
    'NA1_5254498466',
    'NA1_5254498536',
    'NA1_5254498733',
    'NA1_5254498785',
    'NA1_5254499401',
    'NA1_5254499548',
    'NA1_5254499714',
    'NA1_5254499817',
    'NA1_5254500072',
    'NA1_5254500152',
    'NA1_5254500657',
    'NA1_5254500888',
    'NA1_5254501198',
    'NA1_5254501298',
    'NA1_5254501549',
];

const formatted = await Promise.all(games.map(async (game) => {
    let response = await getMatchInfo(game, API_TOKEN);
    let json = await response.json() as MatchInfoResponse;

    if (response.status !== 200) {
        if (response.status !== 429 && response.status !== 404) {
            console.log(`${game}: ${response.statusText}`);
        }

        while (response.status === 429) {
            console.log(`too many requests, backing off at ${game}`);
            await new Promise((r) => setTimeout(r, 120 * 1000));
            response = await getMatchInfo(game, API_TOKEN);
            json = await response.json() as MatchInfoResponse;
        }
    }

    console.log(`${game} ${response.status}`);
    return json.info?.participants?.filter((participant) => participant.championId === 23)
        .map((participant) => ({participantId: participant.participantId, matchId: game}));
}));

writeFileSync('data/tryndamere-games.json', JSON.stringify(formatted, null, 4));

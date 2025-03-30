import {readFileSync} from 'fs';
import {getMatchTimeline} from './https/match';

const API_TOKEN = readFileSync('api.txt').toString();
const MATCH_ID = 'NA1_5255902090';

const response = await getMatchTimeline(MATCH_ID, API_TOKEN);

console.log(JSON.stringify(await response.json(), null, 4));

import {writeFileSync} from 'fs';
import {readJson} from './read-json';

export const appendJson = (path: string, value: any): void => {
    const json = readJson(path) as Object[];
    json.push(value);
    writeFileSync(path, JSON.stringify(json, null, 4));
};

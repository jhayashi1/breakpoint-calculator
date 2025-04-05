import {readFileSync} from 'fs';

export const readJson = (path: string): Object => {
    return JSON.parse(readFileSync(path).toString());
};

export const get = async (url: string, auth: string): Promise<Response> => {
    return await fetch(url, {
        headers: {
            'X-Riot-Token'   : auth,
            'Accept-Language': 'en-US,en;q=0.7',
            'Accept-Charset' : 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        method: 'GET',
    });
};

export const post = async (url: string, body: Record<string, string> | undefined, auth: string): Promise<Response> => {
    return await fetch(url, {
        headers: {
            authorization    : `Bearer ${auth}`,
            accept           : 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.7',
            'content-type'   : 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body  : JSON.stringify(body),
        method: 'POST',
    });
};

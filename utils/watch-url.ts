export const WATCH_PATHNAME_REGEX = /^\/(?:(\D+)\/)?watch\/([^/]+)\/.*/;
export const ALLOWED_DOMAIN = 'www.crunchyroll.com';

export function isWatchUrl(url: URL | string): boolean {
    const theUrl = new URL(url);
    console.log(theUrl, theUrl.hostname, theUrl.pathname, ALLOWED_DOMAIN, WATCH_PATHNAME_REGEX.test(theUrl.pathname));
    return ALLOWED_DOMAIN === theUrl.hostname && WATCH_PATHNAME_REGEX.test(theUrl.pathname);
}

export function matchWatchUrl(url: URL | string): RegExpMatchArray | null {
    return isWatchUrl(url) ? WATCH_PATHNAME_REGEX.exec(new URL(url).pathname) : null;
}
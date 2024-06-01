/**
 * url_for options type
 * @example
 * // to call this type
 * type urlOpt = Parameters<typeof import('hexo-util')['url_for']>[1];
 */
interface UrlForOptions {
    relative?: boolean;
}
/**
 * get url relative to base URL (config_yml.url)
 * @param path relative path inside `source` folder (config_yml.source_dir)
 * @param options
 * @returns
 * @example
 * // global `hexo` must be exist when used this function inside plugin
 * const Hutil = require('hexo-util')
 * console.log(Hutil.url_for.bind(hexo)('path/to/file/inside/source.css')); // https://example.com/path/to/file/inside/source.css
 */
declare function urlForHelper(path?: string, options?: UrlForOptions | null): string;
export = urlForHelper;

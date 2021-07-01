/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, {AxiosInstance, AxiosPromise} from 'axios';
import {Configuration} from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import {BASE_PATH, BaseAPI, COLLECTION_FORMATS, RequestArgs, RequiredError} from '../base';
import {NewRepositoryTO, RepositoryTO, RepositoryUpdateTO} from '../models';

/**
 * BpmRepositoryControllerApi - axios parameter creator
 * @export
 */
export const BpmRepositoryControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary Create a new Repository
         * @param {NewRepositoryTO} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRepository: async (body: NewRepositoryTO, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling createRepository.');
            }
            const localVarPath = `/api/bpmnrepo`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Delete a Repository if you own it
         * @param {string} repositoryId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRepository: async (repositoryId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'repositoryId' is not null or undefined
            if (repositoryId === null || repositoryId === undefined) {
                throw new RequiredError('repositoryId', 'Required parameter repositoryId was null or undefined when calling deleteRepository.');
            }
            const localVarPath = `/api/bpmnrepo/{repositoryId}`
                .replace(`{${"repositoryId"}}`, encodeURIComponent(String(repositoryId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = {method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Get all Repositories
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllRepositories: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/bpmnrepo`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Get a single Repository by providing its ID
         * @param {string} repositoryId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSingleRepository: async (repositoryId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'repositoryId' is not null or undefined
            if (repositoryId === null || repositoryId === undefined) {
                throw new RequiredError('repositoryId', 'Required parameter repositoryId was null or undefined when calling getSingleRepository.');
            }
            const localVarPath = `/api/bpmnrepo/{repositoryId}`
                .replace(`{${"repositoryId"}}`, encodeURIComponent(String(repositoryId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Update a Repository
         * @param {RepositoryUpdateTO} body
         * @param {string} repositoryId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateRepository: async (body: RepositoryUpdateTO, repositoryId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling updateRepository.');
            }
            // verify required parameter 'repositoryId' is not null or undefined
            if (repositoryId === null || repositoryId === undefined) {
                throw new RequiredError('repositoryId', 'Required parameter repositoryId was null or undefined when calling updateRepository.');
            }
            const localVarPath = `/api/bpmnrepo/{repositoryId}`
                .replace(`{${"repositoryId"}}`, encodeURIComponent(String(repositoryId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = {method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BpmRepositoryControllerApi - functional programming interface
 * @export
 */
export const BpmRepositoryControllerApiFp = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary Create a new Repository
         * @param {NewRepositoryTO} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRepository(body: NewRepositoryTO, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await BpmRepositoryControllerApiAxiosParamCreator(configuration).createRepository(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary Delete a Repository if you own it
         * @param {string} repositoryId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteRepository(repositoryId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await BpmRepositoryControllerApiAxiosParamCreator(configuration).deleteRepository(repositoryId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary Get all Repositories
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllRepositories(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<RepositoryTO>>> {
            const localVarAxiosArgs = await BpmRepositoryControllerApiAxiosParamCreator(configuration).getAllRepositories(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary Get a single Repository by providing its ID
         * @param {string} repositoryId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSingleRepository(repositoryId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RepositoryTO>> {
            const localVarAxiosArgs = await BpmRepositoryControllerApiAxiosParamCreator(configuration).getSingleRepository(repositoryId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary Update a Repository
         * @param {RepositoryUpdateTO} body
         * @param {string} repositoryId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateRepository(body: RepositoryUpdateTO, repositoryId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await BpmRepositoryControllerApiAxiosParamCreator(configuration).updateRepository(body, repositoryId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * BpmRepositoryControllerApi - factory interface
 * @export
 */
export const BpmRepositoryControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         *
         * @summary Create a new Repository
         * @param {NewRepositoryTO} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRepository(body: NewRepositoryTO, options?: any): AxiosPromise<void> {
            return BpmRepositoryControllerApiFp(configuration).createRepository(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Delete a Repository if you own it
         * @param {string} repositoryId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRepository(repositoryId: string, options?: any): AxiosPromise<void> {
            return BpmRepositoryControllerApiFp(configuration).deleteRepository(repositoryId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Get all Repositories
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllRepositories(options?: any): AxiosPromise<Array<RepositoryTO>> {
            return BpmRepositoryControllerApiFp(configuration).getAllRepositories(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Get a single Repository by providing its ID
         * @param {string} repositoryId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSingleRepository(repositoryId: string, options?: any): AxiosPromise<RepositoryTO> {
            return BpmRepositoryControllerApiFp(configuration).getSingleRepository(repositoryId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Update a Repository
         * @param {RepositoryUpdateTO} body
         * @param {string} repositoryId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateRepository(body: RepositoryUpdateTO, repositoryId: string, options?: any): AxiosPromise<void> {
            return BpmRepositoryControllerApiFp(configuration).updateRepository(body, repositoryId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * BpmRepositoryControllerApi - object-oriented interface
 * @export
 * @class BpmRepositoryControllerApi
 * @extends {BaseAPI}
 */
export class BpmRepositoryControllerApi extends BaseAPI {
    /**
     *
     * @summary Create a new Repository
     * @param {NewRepositoryTO} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BpmRepositoryControllerApi
     */
    public createRepository(body: NewRepositoryTO, options?: any) {
        return BpmRepositoryControllerApiFp(this.configuration).createRepository(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Delete a Repository if you own it
     * @param {string} repositoryId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BpmRepositoryControllerApi
     */
    public deleteRepository(repositoryId: string, options?: any) {
        return BpmRepositoryControllerApiFp(this.configuration).deleteRepository(repositoryId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Get all Repositories
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BpmRepositoryControllerApi
     */
    public getAllRepositories(options?: any) {
        return BpmRepositoryControllerApiFp(this.configuration).getAllRepositories(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Get a single Repository by providing its ID
     * @param {string} repositoryId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BpmRepositoryControllerApi
     */
    public getSingleRepository(repositoryId: string, options?: any) {
        return BpmRepositoryControllerApiFp(this.configuration).getSingleRepository(repositoryId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Update a Repository
     * @param {RepositoryUpdateTO} body
     * @param {string} repositoryId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BpmRepositoryControllerApi
     */
    public updateRepository(body: RepositoryUpdateTO, repositoryId: string, options?: any) {
        return BpmRepositoryControllerApiFp(this.configuration).updateRepository(body, repositoryId, options).then((request) => request(this.axios, this.basePath));
    }
}

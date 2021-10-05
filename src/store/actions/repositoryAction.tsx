import {AxiosResponse} from "axios";
import {RepositoryApi, RepositoryTO} from "../../api";
import helpers from "../../util/helperFunctions";

export const getRepository = async(repoId: string): Promise<AxiosResponse<RepositoryTO>> => {
    const repositoryController = new RepositoryApi();
    const config = helpers.getClientConfig();
    const response = repositoryController.getSingleRepository(repoId, config);
    return response;
};


export const fetchRepositories = async (): Promise<AxiosResponse<RepositoryTO[]>> => {
    const repositoryController = new RepositoryApi();
    const config = helpers.getClientConfig();
    const response = await repositoryController.getAllRepositories(config);
    return response;
}
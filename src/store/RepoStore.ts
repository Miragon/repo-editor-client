import {action, makeObservable, observable, runInAction} from "mobx";
import {BpmnRepositoryControllerApi, BpmnRepositoryRequestTO} from "../api";


class nameAndId {
    repoId: string | undefined;
    repoName: string | undefined;
}

export default class RepoStore {
    @observable
    repositories: BpmnRepositoryRequestTO[] = [];

    bpmnRepositoryController: BpmnRepositoryControllerApi;

    isInitialized = false;
    constructor() {
        makeObservable(this);
        this.bpmnRepositoryController = new BpmnRepositoryControllerApi({});
    }


    @action
    initialize = async (): Promise<void> => {
        console.log("initializing RepoStore");
        if(!this.isInitialized){
            this.fetchAllRepos().then(allRepos => {
                allRepos.forEach(repo => {
                    runInAction(() => this.repositories.push(repo));
                })

            });
            console.log("___________________________REPOS:");
            console.log(this.repositories)
            this.isInitialized = true;
        }
    }

    getRepo = (repositoryId: string): BpmnRepositoryRequestTO|undefined => {
        console.log("Getting single repo");
        console.log(this.repositories);
        return this.repositories.find(repository => repository.bpmnRepositoryId === repositoryId);
    }

    getAllRepos = (): BpmnRepositoryRequestTO[] => {
        return this.repositories;
    }

    getRepoName = (repositoryId: string): string|undefined => {
        const bpmnRepositoryRequestTO = this.repositories.find(repository => repository.bpmnRepositoryId === repositoryId);
        if(bpmnRepositoryRequestTO != undefined){
            return bpmnRepositoryRequestTO.bpmnRepositoryName;
        }
        else{
            return "unknown";
        }
    }


    getListOfRepoNamesAndIds = (): nameAndId[] => {
        const repoNamesAndIds: nameAndId[] = [];
        this.repositories.forEach(bpmnRepositoryRequestTO => {
            repoNamesAndIds.push({repoId: bpmnRepositoryRequestTO.bpmnRepositoryId, repoName: bpmnRepositoryRequestTO.bpmnRepositoryName})
        });
        return repoNamesAndIds;

    }

    getListOfRepoIds = (): string[] => {
        console.log("Creating List of repository Ids....");
        const repositoryIds: string[] = [];
        this.repositories.forEach(bpmnRepositoryRequestTO => {
            if(bpmnRepositoryRequestTO.bpmnRepositoryId != null){
                repositoryIds.push(bpmnRepositoryRequestTO.bpmnRepositoryId);
            }
        });
        return repositoryIds;
    }


    //change to private
    public fetchAllRepos = async (): Promise<BpmnRepositoryRequestTO[]> => {
        try{
            return await this.bpmnRepositoryController.getAllRepositories();
        } catch (response){
            switch (response.status) {
                case 502:
                    console.log("Error");
                    break;
                default:
                    console.log("Error");
                    break;
            }
            return [];
        }
    }
}
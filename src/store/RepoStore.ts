import {action, makeObservable, observable, runInAction} from "mobx";
import {BpmnRepositoryControllerApi, BpmnRepositoryTO} from "../api";
import {List} from "@material-ui/core";


export default class RepoStore {
    @observable
    repositories: BpmnRepositoryTO[] = [];

    bpmnRepositoryController: BpmnRepositoryControllerApi;
    isInitialized = false;
    constructor() {
        makeObservable(this);
        this.bpmnRepositoryController = new BpmnRepositoryControllerApi();
    }


    @action
    initialize = async (): Promise<void> => {
        console.log("initializing RepoStore");
        if(!this.isInitialized){
            this.fetchAllRepos().then(allRepos => {
                runInAction(() => this.repositories = allRepos);

            });
            console.log(this.repositories)
            this.isInitialized = true;
        }
    }

    getRepo = (repositoryId: string): BpmnRepositoryTO|undefined => {
        console.log("Getting sinlge repo");
        console.log(this.repositories);
        return this.repositories.find(repository => repository.bpmnRepositoryId === repositoryId);
    }

    getAllRepos = (): BpmnRepositoryTO[] => {
        return this.repositories;
    }

    getListOfRepoIds = (): string[] => {
        console.log("Creating List of repository Ids....");
        const repositoryIds: string[] = [];
        this.repositories.forEach(bpmnRepositoryTO => {
            if(bpmnRepositoryTO.bpmnRepositoryId != null){
                repositoryIds.push(bpmnRepositoryTO.bpmnRepositoryId);
            }
        });
        return repositoryIds;
    }


    //change to private
    public fetchAllRepos = async (): Promise<BpmnRepositoryTO[]> => {
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
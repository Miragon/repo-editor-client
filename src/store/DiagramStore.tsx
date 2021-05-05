import {action, makeObservable, observable, runInAction} from "mobx";
import {BpmnDiagramControllerApi, BpmnDiagramTO} from "../api";
import {useStore} from "../providers/RootStoreProvider";
import {DatePipe} from "@angular/common";
import {type} from "os";
import {DateTime} from "luxon";


export default class DiagramStore {
    @observable
    diagrams: BpmnDiagramTO[] = [];

    @observable
    recentDiagrams: BpmnDiagramTO[] = [];

    @observable
    starredDiagrams: BpmnDiagramTO[] = [];

    @observable
    repoIds: string[] = [];

    bpmnDiagramController: BpmnDiagramControllerApi;
    allInitialized = false;
    recentInitialized = false;
    starredInitialized = false;
    constructor() {
        makeObservable(this);
        this.bpmnDiagramController = new BpmnDiagramControllerApi();
    }

    @action
    initialize = async (repoIds: string[]): Promise<void> => {
        console.log("initializing DiagramStore");

        //Pbly overkill as soon as some more repos exist -> remove and only query all repos for the repo-selection-area, not all diagrams
        if (!this.allInitialized) {
            console.log("In if clause of diagramStore")
            repoIds.forEach(repoId => {
                this.fetchAllDiagrams(repoId).then(allDiagrams => {
                    allDiagrams.forEach(diagram => {
                        runInAction( () => this.diagrams.push(diagram));
                    });
                });
            })
            this.allInitialized = true;
        }
    }

    @action
    initializeRecent = async (): Promise<void> => {
        if(!this.recentInitialized){
        console.log("Fetching most recent diagrams");
        this.fetchRecent().then(recentDiagrams => {
            recentDiagrams.forEach(diagram => {
                runInAction(() => this.recentDiagrams.push(diagram))
            });
        });
        this.recentInitialized = true;
        }
    }

    @action
    initializeStarred = async (): Promise<void> => {
        if(!this.starredInitialized){
            console.log("Fetching most recent diagrams");
            this.fetchStarred().then(starredDiagrams => {
                starredDiagrams.forEach(diagram => {
                    runInAction(() => this.starredDiagrams.push(diagram))
                });
            });
            this.starredInitialized = true;

        }
    }

    public convertDate = (updatedDate: Date): string | null => {
        const date = new Date(updatedDate);
        const displayedDate = date.getDay().toString() + "." + date.getMonth().toString() + "." + date.getFullYear();
        return displayedDate;
}

    public fetchStarred = async (): Promise<BpmnDiagramTO[]> => {
        try {
            return await this.bpmnDiagramController.getStarred();
        } catch (response) {
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


    public fetchRecent = async (): Promise<BpmnDiagramTO[]> => {
        try {
            return await this.bpmnDiagramController.getRecent();
        } catch (response) {
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


    public fetchAllDiagrams = async (repositoryId: string): Promise<BpmnDiagramTO[]> => {
        try {
            return await this.bpmnDiagramController.getDiagramsFromRepo(repositoryId);
        } catch (response) {
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

    getStarredDiagrams = (): BpmnDiagramTO[] => {
        return this.starredDiagrams;
    }

    getRecentDiagrams = (): BpmnDiagramTO[] => {
        return this.recentDiagrams;
    }

    getAllDiagrams = (): BpmnDiagramTO[] => {
        return this.diagrams;
    }
}
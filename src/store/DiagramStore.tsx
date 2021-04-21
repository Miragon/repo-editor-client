import {action, makeObservable, observable, runInAction} from "mobx";
import {BpmnDiagramControllerApi, BpmnDiagramTO} from "../api";
import {useStore} from "../providers/RootStoreProvider";


export default class DiagramStore {
    @observable
    diagrams: BpmnDiagramTO[] = [];
    @observable
    repoIds: string[] = [];

    bpmnDiagramController: BpmnDiagramControllerApi;
    isInitialized = false;
    constructor() {
        makeObservable(this);
        this.bpmnDiagramController = new BpmnDiagramControllerApi();
    }

    @action
    initialize = async (repoIds: string[]): Promise<void> => {
        console.log("initializing DiagramStore");

        if (!this.isInitialized) {
            console.log("In if clause of diagramStore")
            repoIds.forEach(repoId => {
                this.fetchAllDiagrams(repoId).then(allDiagrams => {
                    allDiagrams.forEach(diagram => {
                        runInAction( () => this.diagrams.push(diagram));
                    });
                });
            })
            console.log("Diagrams: ");
            console.log(this.diagrams);

        }
    }
    getAllDiagrams = (): BpmnDiagramTO[] => {
        const diagramList = this.diagrams;
        return diagramList.sort();
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
}
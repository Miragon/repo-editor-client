import {makeObservable, observable} from "mobx";
import {BpmnDiagramVersionControllerApi, BpmnDiagramVersionTO, SaveTypeEnum} from "../api";


export default class VersionStore {
    @observable
    versions: BpmnDiagramVersionTO[] = [];


    bpmnDiagramVersionController: BpmnDiagramVersionControllerApi;


    constructor() {
        makeObservable(this);
        this.bpmnDiagramVersionController = new BpmnDiagramVersionControllerApi();
    }

    public createDiagramVersion = async (repoId: string, diagramId: string): Promise<Response | undefined> => {
    try{
        const versionUploadTO = {
            //hardcoded string is an empty bpmn Diagram
            bpmnAsXML: "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                "<!-- created with bpmn-js / http://bpmn.io -->" +
                "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"0\" height=\"0\" viewBox=\"0 0 0 0\" version=\"1.1\"></svg>",
            saveType: SaveTypeEnum.RELEASE
        }

        return await this.bpmnDiagramVersionController.createOrUpdateVersion(versionUploadTO, repoId, diagramId);

    } catch (response) {
        switch (response.status) {
            case 502:
                console.log("Error");
                break;
            default:
                console.log("Error");
                break;
        }
        return undefined;
        }
    }

    public importDiagramVersion = async (repoId: string, diagramId: string, xmlString: string): Promise<Response | undefined>  => {
        try {
            const versionUploadTO = {
                bpmnAsXML: xmlString,
                saveType: SaveTypeEnum.RELEASE
            }
            return await this.bpmnDiagramVersionController.createOrUpdateVersion(versionUploadTO, repoId, diagramId);
        } catch (response) {
            switch (response.status) {
                case 502:
                    console.log("Error");
                    break;
                default:
                    console.log("Error");
                    break;
            }
            return undefined;
        }
    }
}
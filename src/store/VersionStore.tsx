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

    public importDiagram = async (repoId: string, diagramId: string, xmlString: string): Promise<Response | undefined>  => {
        try {
            const versionUploadTO = {
                bpmnAsXML: xmlString,
                saveType: SaveTypeEnum.RELEASE
            }

/*                file.text().then(fileString => {
                    versionUploadTO = {
                        bpmnAsXML: fileString,
                        saveType: SaveTypeEnum.RELEASE
                    }
                    response = this.bpmnDiagramVersionController.createOrUpdateVersion(versionUploadTO, repoId, diagramId);
                }) */
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
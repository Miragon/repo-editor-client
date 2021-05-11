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
            bpmnAsXML: `<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
                        <bpmn:process id="Process_1" isExecutable="false" />
                        <bpmndi:BPMNDiagram id="BPMNDiagram_1">
                        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1" />
                        </bpmndi:BPMNDiagram>
                        </bpmn:definitions> `,

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
import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import {BpmnDiagramVersionUploadTO, BpmnDiagramVersionUploadTOSaveTypeEnum} from "../../api/models";
import helpers from "../../constants/Functions";
import {CREATED_DIAGRAM, GET_VERSIONS, SUCCESS, SYNC_STATUS, UNHANDLEDERROR} from "./diagramAction";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";

export const DEFAULT_FILE = "Default XML String"

export const createOrUpdateVersion = (bpmnRepositoryId: string, bpmnDiagramId: string, file: string, saveType: BpmnDiagramVersionUploadTOSaveTypeEnum, comment?: string) => {

    return async (dispatch: Dispatch) => {
        const versionController = new api.BpmnDiagramVersionControllerApi()
        try{
            const bpmnDiagramVersionUploadTO: BpmnDiagramVersionUploadTO = {
                bpmnAsXML: file,
                bpmnDiagramVersionComment: comment,
                saveType: saveType
            }
            const config = helpers.getClientConfig()
            const response = await versionController.createOrUpdateVersion(bpmnDiagramVersionUploadTO, bpmnRepositoryId, bpmnDiagramId, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: SUCCESS, successMessage: "Version Created"})
                dispatch({type: CREATED_DIAGRAM, createdDiagram: null})
                dispatch({type: SYNC_STATUS, dataSynced: false})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.CREATE_OR_UPDATE_VERSION, [bpmnRepositoryId, bpmnDiagramId, file, saveType, comment]))

        }
    }
}


export const getAllVersions = (bpmnRepositoryId: string, bpmnDiagramId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const versionController = new api.BpmnDiagramVersionControllerApi()
            const config = helpers.getClientConfig()
            const response = await versionController.getAllVersions(bpmnRepositoryId, bpmnDiagramId, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: GET_VERSIONS, versions: response.data})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.GET_ALL_VERSIONS, [bpmnRepositoryId, bpmnDiagramId]))

        }
    }
}

import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import {BpmnDiagramVersionUploadTO, BpmnDiagramVersionUploadTOSaveTypeEnum} from "../../api/models";
import helpers from "../../constants/Functions";
import {CREATED_DIAGRAM, GET_VERSIONS, HANDLEDERROR, SUCCESS, SYNC_STATUS, UNHANDLEDERROR} from "./diagramAction";
import {defaultErrors} from "../../components/Exception/defaultErrors";
import {ActionType} from "./actions";

export const DEFAULT_FILE = "Default XML String"

export const createOrUpdateVersion = (bpmnRepositoryId: string, bpmnDiagramId: string, file: string, saveType: BpmnDiagramVersionUploadTOSaveTypeEnum, comment?: string) => {
    console.log("Creating Version...")

    return async (dispatch: Dispatch) => {
        const versionController = new api.BpmnDiagramVersionControllerApi()
        try{
            const bpmnDiagramVersionUploadTO: BpmnDiagramVersionUploadTO = {
                bpmnAsXML: file,
                bpmnDiagramVersionComment: comment,
                saveType: saveType
            }
            const config = helpers.getClientConfig(localStorage.getItem("oauth_token"))
            const response = await versionController.createOrUpdateVersion(bpmnDiagramVersionUploadTO, bpmnRepositoryId, bpmnDiagramId, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: SUCCESS, successMessage: "Version Created"})
                dispatch({type: CREATED_DIAGRAM, createdDiagram: null})
                dispatch({type: SYNC_STATUS, dataSynced: false})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: response.status + "" + JSON.stringify(response), retryMethod: (() => dispatch({type: ActionType.CREATE_OR_UPDATE_VERSION, payload: [bpmnRepositoryId, bpmnDiagramId, file, comment] }))})
            }
        } catch (error){
            if(error.response){
                switch(error.response.data.status) {
                    case "400":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["400"], retryMethod: (() => dispatch({type: ActionType.CREATE_OR_UPDATE_VERSION, payload: [bpmnRepositoryId, bpmnDiagramId, file, comment] }))})
                        return;
                    case "401":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["401"], retryMethod: (() => dispatch({type: ActionType.CREATE_OR_UPDATE_VERSION, payload: [bpmnRepositoryId, bpmnDiagramId, file, comment] }))})
                        return;
                    case "403":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["403"], retryMethod: (() => dispatch({type: ActionType.CREATE_OR_UPDATE_VERSION, payload: [bpmnRepositoryId, bpmnDiagramId, file, comment] }))})
                        return;
                    case "404":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["404"], retryMethod: (() => dispatch({type: ActionType.CREATE_OR_UPDATE_VERSION, payload: [bpmnRepositoryId, bpmnDiagramId, file, comment] }))})
                        return;
                    case "409":
                        dispatch({type: HANDLEDERROR, errorMessage: error.response.data.message, retryMethod: (() => dispatch({type: ActionType.CREATE_OR_UPDATE_VERSION, payload: [bpmnRepositoryId, bpmnDiagramId, file, comment] }))})
                        return;
                    default:
                        dispatch({type: UNHANDLEDERROR, errorMessage: `Error ${error.response.status}`, retryMethod: (() => dispatch({type: ActionType.CREATE_OR_UPDATE_VERSION, payload: [bpmnRepositoryId, bpmnDiagramId, file, comment] }))})
                        return;

                }
            }
        }
    }
}

export const getAllVersions = (bpmnRepositoryId: string, bpmnDiagramId: string) => {
    return async (dispatch: Dispatch) => {
        try {

            const versionController = new api.BpmnDiagramVersionControllerApi()
            const config = helpers.getClientConfig(localStorage.getItem("oauth_token"))
            const response = await versionController.getAllVersions(bpmnRepositoryId, bpmnDiagramId, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: GET_VERSIONS, versions: response.data})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: response.status + "" + JSON.stringify(response), retryMethod: (() => dispatch({type: ActionType.GET_ALL_VERSIONS, payload: [bpmnRepositoryId, bpmnDiagramId] }))})
            }
        } catch (error){
            if(error.response){
                switch(error.response.data.status) {
                    case "400":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["400"], retryMethod: (() => dispatch({type: ActionType.GET_ALL_VERSIONS, payload: [bpmnRepositoryId, bpmnDiagramId] }))})
                        return;
                    case "401":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["401"], retryMethod: (() => dispatch({type: ActionType.GET_ALL_VERSIONS, payload: [bpmnRepositoryId, bpmnDiagramId] }))})
                        return;
                    case "403":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["403"], retryMethod: (() => dispatch({type: ActionType.GET_ALL_VERSIONS, payload: [bpmnRepositoryId, bpmnDiagramId] }))})
                        return;
                    case "404":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["404"], retryMethod: (() => dispatch({type: ActionType.GET_ALL_VERSIONS, payload: [bpmnRepositoryId, bpmnDiagramId] }))})
                        return;
                    case "409":
                        dispatch({type: HANDLEDERROR, errorMessage: error.response.data.message, retryMethod: (() => dispatch({type: ActionType.GET_ALL_VERSIONS, payload: [bpmnRepositoryId, bpmnDiagramId] }))})
                        return;
                    default:
                        dispatch({type: UNHANDLEDERROR, errorMessage: `Error ${error.response.status}`, retryMethod: (() => dispatch({type: ActionType.GET_ALL_VERSIONS, payload: [bpmnRepositoryId, bpmnDiagramId] }))})
                        return;

                }
            }
        }
    }
}
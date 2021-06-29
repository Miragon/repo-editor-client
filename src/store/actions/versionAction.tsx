import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import {DiagramVersionUploadTO, DiagramVersionUploadTOSaveTypeEnum} from "../../api/models";
import helpers from "../../constants/Functions";
import {CREATED_DIAGRAM, GET_VERSIONS, SUCCESS, SYNC_STATUS, UNHANDLEDERROR} from "../constants";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";

export const DEFAULT_FILE = "Default XML String"

export const createOrUpdateVersion = (bpmnDiagramId: string, file: string, saveType: DiagramVersionUploadTOSaveTypeEnum, comment?: string) => {

    return async (dispatch: Dispatch) => {
        const versionController = new api.DiagramVersionControllerApi()
        try {
            const DiagramVersionUploadTO: DiagramVersionUploadTO = {
                xml: file,
                versionComment: comment,
                saveType: saveType
            }
            const config = helpers.getClientConfig()
            const response = await versionController.createOrUpdateVersion(DiagramVersionUploadTO, bpmnDiagramId, config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: SUCCESS, successMessage: "Version Created"})
                dispatch({type: CREATED_DIAGRAM, createdDiagram: null})
                dispatch({type: SYNC_STATUS, dataSynced: false})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.CREATE_OR_UPDATE_VERSION, [bpmnDiagramId, file, saveType, comment]))

        }
    }
}


export const getAllVersions = (bpmnDiagramId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const versionController = new api.DiagramVersionControllerApi()
            const config = helpers.getClientConfig()
            const response = await versionController.getAllVersions(bpmnDiagramId, config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: GET_VERSIONS, versions: response.data})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.GET_ALL_VERSIONS, [bpmnDiagramId]))

        }
    }
}

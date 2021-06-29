import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import helpers from "../../constants/Functions";
import {NewDiagramTO} from "../../api/models";
import {ACTIVE_DIAGRAMS} from "./repositoryAction";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";

export const GET_FAVORITE = "GET_FAVORITE"
export const GET_RECENT = "GET_RECENT"
export const DIAGRAM_UPLOAD = "DIAGRAM_UPLOAD"
export const HANDLEDERROR = "HANDLEDERROR"
export const UNHANDLEDERROR = "UNHANDLEDERROR"
export const UNHANDLEDERRORRETRY = "UNHANDLEDERRORRETRY"
export const SYNC_STATUS = "SYNC_STATUS"
export const SUCCESS = "SUCCESS"
export const GET_VERSIONS = "GET_VERSIONS"
export const ASSIGNED_USERS = "ASSIGNED_USERS"
export const CURRENT_USER_INFO = "CURRENT_USER_INFO"
export const SEARCH_USERS = "SEARCH_USERS"
export const USERQUERY_EXECUTED = "USERQUERY_EXECUTED"
export const SEARCH_DIAGRAMS = "SEARCH_DIAGRAMS"
export const CREATED_DIAGRAM = "CREATED_DIAGRAM"


export const fetchFavoriteDiagrams = () => {
    return async (dispatch: Dispatch) => {
        const diagramController = new api.DiagramControllerApi()

        try {
            const config = helpers.getClientConfig()
            const response = await diagramController.getStarred(config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: GET_FAVORITE, favoriteDiagrams: response.data})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.FETCH_FAVORITE_DIAGRAMS, []))

        }
    }
}


export const fetchRecentDiagrams = () => {
    return async (dispatch: Dispatch) => {
        const diagramController = new api.DiagramControllerApi()

        try {
            const config = helpers.getClientConfig()
            const response = await diagramController.getRecent(config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: GET_RECENT, recentDiagrams: response.data})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.FETCH_RECENT_DIAGRAMS, []))

        }
    }
}


export const createDiagram = (repositoryId: string, diagramName: string, diagramDescription: string, fileType?: string, diagramId?: string) => {
    //TODO update muss wieder funktionieren

    return async (dispatch: Dispatch) => {
        const diagramController = new api.DiagramControllerApi()
        try {


            const config = helpers.getClientConfig()
            let response: any;

            let message = "Diagram created"
            if (diagramId) {
                const diagramUpdate: NewDiagramTO = {
                    name: diagramName,
                    description: diagramDescription,
                    fileType: fileType ? fileType : "BPMN",
                }
                response = await diagramController.updateDiagram(diagramUpdate, diagramId, config)
                message = "Diagram updated"
            } else {
                const newDiagram: NewDiagramTO = {
                    name: diagramName,
                    description: diagramDescription,
                    fileType: fileType ? fileType : "BPMN",
                }
                response = await diagramController.createDiagram(newDiagram, repositoryId, config)
            }


            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: SUCCESS, successMessage: message})
                if (!diagramId) {
                    dispatch({type: CREATED_DIAGRAM, createdDiagram: response.data})
                }
                dispatch({type: SYNC_STATUS, dataSynced: false})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.CREATE_DIAGRAM, [repositoryId, diagramName, diagramDescription, fileType, diagramId]))

        }
    }
}

export const fetchDiagramsFromRepo = (repoId: string) => {
    return async (dispatch: Dispatch) => {
        const diagramController = new api.DiagramControllerApi()
        try {
            const config = helpers.getClientConfig()
            const response = await diagramController.getDiagramsFromRepo(repoId, config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: ACTIVE_DIAGRAMS, activeDiagrams: response.data})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.FETCH_DIAGRAMS_FROM_REPO, [repoId]))

        }
    }
}


export const uploadDiagram = (repositoryId: string, diagramName: string, diagramDescription: string) => {
    return async (dispatch: Dispatch) => {
        const diagramController = new api.DiagramControllerApi()
        try {
            const newDiagram: NewDiagramTO = {
                name: diagramName,
                description: diagramDescription,
                fileType: "bpmn"
            }
            const config = helpers.getClientConfig()
            const response = await diagramController.createDiagram(newDiagram, repositoryId, config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: DIAGRAM_UPLOAD, uploadedDiagram: response.data})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.UPLOAD_DIAGRAM, [repositoryId, diagramName, diagramDescription]))

        }
    }
}


export const searchDiagram = (typedTitle: string) => {
    return async (dispatch: Dispatch) => {
        const diagramController = new api.DiagramControllerApi()
        try {
            const config = helpers.getClientConfig()
            const response = await diagramController.searchDiagrams(typedTitle, config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: SEARCH_DIAGRAMS, searchedDiagrams: response.data})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.SEARCH_DIAGRAM, [typedTitle]))

        }
    }
}


export const deleteDiagram = (bpmnRepositoryId: string, bpmnDiagramId: string) => {

    return async (dispatch: Dispatch) => {
        const diagramController = new api.DiagramControllerApi()
        try {
            const config = helpers.getClientConfig()
            const response = await diagramController.deleteDiagram(bpmnRepositoryId, bpmnDiagramId, config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: SYNC_STATUS, dataSynced: false})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.DELETE_DIAGRAM, [bpmnRepositoryId, bpmnDiagramId]))
        }
    }
}

import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import helpers from "../../constants/Functions";
import {NewDiagramTO} from "../../api/models";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";
import {
    ACTIVE_DIAGRAMS,
    CREATED_DIAGRAM,
    DEFAULT_SVG,
    DIAGRAM_UPLOAD,
    GET_FAVORITE,
    GET_RECENT,
    SEARCH_DIAGRAMS,
    SYNC_STATUS,
    UNHANDLEDERROR
} from "../constants";


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


export const createDiagram = (repoId: string, name: string, description: string, fileType?: string) => {
    //TODO update muss wieder funktionieren
    return async (dispatch: Dispatch) => {
        const diagramController = new api.DiagramControllerApi()
        try {
            const config = helpers.getClientConfig()
            const newDiagramTO: NewDiagramTO = {
                name: name,
                description: description,
                fileType: fileType ? fileType : "BPMN",
                svgPreview: DEFAULT_SVG
            }
            const response = await diagramController.createDiagram(newDiagramTO, repoId, config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: CREATED_DIAGRAM, createdDiagram: response.data})
                dispatch({type: SYNC_STATUS, dataSynced: false})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.CREATE_DIAGRAM, [repoId, name, description, fileType]))

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


export const uploadDiagram = (repoId: string, name: string, description: string) => {
    return async (dispatch: Dispatch) => {
        const diagramController = new api.DiagramControllerApi()
        try {
            const newDiagram: NewDiagramTO = {
                name: name,
                description: description,
                fileType: "bpmn"
            }
            const config = helpers.getClientConfig()
            const response = await diagramController.createDiagram(newDiagram, repoId, config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: DIAGRAM_UPLOAD, uploadedDiagram: response.data})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.UPLOAD_DIAGRAM, [repoId, name, description]))

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


export const deleteDiagram = (diagramId: string) => {

    return async (dispatch: Dispatch) => {
        const diagramController = new api.DiagramControllerApi()
        try {
            const config = helpers.getClientConfig()
            const response = await diagramController.deleteDiagram(diagramId, config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: SYNC_STATUS, dataSynced: false})
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.DELETE_DIAGRAM, [diagramId]))
        }
    }
}

import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import helpers from "../../constants/Functions";
import {BpmnDiagramUploadTO} from "../../api/models";
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
        const diagramController = new api.BpmnDiagramControllerApi()

        try{
            const config = helpers.getClientConfig()
            const response = await diagramController.getStarred(config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: GET_FAVORITE, favoriteDiagrams: response.data})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.FETCH_FAVORITE_DIAGRAMS, []))

        }
    }
}



export const fetchRecentDiagrams = () => {
    return async (dispatch: Dispatch) => {
        const diagramController = new api.BpmnDiagramControllerApi()

        try{
            const config = helpers.getClientConfig()
            const response = await diagramController.getRecent(config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: GET_RECENT, recentDiagrams: response.data})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.FETCH_RECENT_DIAGRAMS, []))

        }
    }
}



export const createDiagram = (bpmnRepositoryId: string, bpmnDiagramName: string, bpmnDiagramDescription: string, fileType?: string, bpmnDiagramId?: string) => {
    console.log("DiagramAction")
    return async (dispatch: Dispatch) => {
        console.log("DiagramAction")

        const diagramController = new api.BpmnDiagramControllerApi()
        try{
            const bpmnDiagramUploadTO: BpmnDiagramUploadTO = {
                bpmnDiagramName: bpmnDiagramName,
                bpmnDiagramDescription: bpmnDiagramDescription,
                fileType: fileType ? fileType : "BPMN",
                bpmnDiagramId: bpmnDiagramId ? bpmnDiagramId : null
            }
            let message = "Diagram created"
            if(bpmnDiagramId){
                message = "Diagram updated"
            }
            const config = helpers.getClientConfig()
            const response = await diagramController.createOrUpdateDiagram(bpmnDiagramUploadTO, bpmnRepositoryId, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: SUCCESS, successMessage: message})
                if(!bpmnDiagramId){
                    dispatch({type: CREATED_DIAGRAM, createdDiagram: response.data})
                }
                dispatch({type: SYNC_STATUS, dataSynced: false})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.CREATE_DIAGRAM, [bpmnRepositoryId, bpmnDiagramName, bpmnDiagramDescription, fileType, bpmnDiagramId]))

        }
    }
}

export const fetchDiagramsFromRepo = (repoId: string) => {
    return async (dispatch: Dispatch) => {
        const diagramController = new api.BpmnDiagramControllerApi()
        try{
            const config = helpers.getClientConfig()
            const response = await diagramController.getDiagramsFromRepo(repoId, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: ACTIVE_DIAGRAMS, activeDiagrams: response.data})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.FETCH_DIAGRAMS_FROM_REPO, [repoId]))

        }
    }
}


export const uploadDiagram = (bpmnRepositoryId: string, bpmnDiagramName: string, bpmnDiagramDescription: string) => {
    return async (dispatch: Dispatch) => {
        const diagramController = new api.BpmnDiagramControllerApi()
        try{
            const bpmnDiagramUploadTO: BpmnDiagramUploadTO = {
                bpmnDiagramName: bpmnDiagramName,
                bpmnDiagramDescription: bpmnDiagramDescription,
                fileType: "bpmn"
            }
            const config = helpers.getClientConfig()
            const response = await diagramController.createOrUpdateDiagram(bpmnDiagramUploadTO, bpmnRepositoryId, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: DIAGRAM_UPLOAD, uploadedDiagram: response.data})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.UPLOAD_DIAGRAM, [bpmnRepositoryId, bpmnDiagramName, bpmnDiagramDescription]))

        }
    }
}


export const searchDiagram = (typedTitle: string) => {
    return async (dispatch: Dispatch) => {
        const diagramController = new api.BpmnDiagramControllerApi()
        try{
            const config = helpers.getClientConfig()
            const response = await diagramController.searchDiagrams(typedTitle, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: SEARCH_DIAGRAMS, searchedDiagrams: response.data})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.SEARCH_DIAGRAM, [typedTitle]))

        }
    }
}


export const deleteDiagram = (bpmnRepositoryId: string, bpmnDiagramId: string) => {

    return async (dispatch: Dispatch) => {
        const diagramController = new api.BpmnDiagramControllerApi()
        try{
            const config = helpers.getClientConfig()
            const response = await diagramController.deleteDiagram(bpmnRepositoryId, bpmnDiagramId, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: SYNC_STATUS, dataSynced: false})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.DELETE_DIAGRAM, [bpmnRepositoryId, bpmnDiagramId]))
        }
    }
}

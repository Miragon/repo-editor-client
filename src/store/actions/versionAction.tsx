import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import {ArtifactVersionTO, ArtifactVersionUpdateTO, VersionApi} from "../../api/api";
import {ArtifactVersionUploadTO, ArtifactVersionUploadTOSaveTypeEnum} from "../../api";
import helpers from "../../util/helperFunctions";
import {GET_VERSION, HANDLEDERROR, SUCCESS, SYNC_STATUS_VERSION} from "../../constants/Constants";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";
import {AxiosResponse} from "axios";

export const createVersion = async (artifactId: string, file: string, saveType: ArtifactVersionUploadTOSaveTypeEnum, comment?: string): Promise<AxiosResponse<ArtifactVersionTO>> => {
    const versionController = new api.VersionApi();
    const config = helpers.getClientConfig();
    const artifactVersionUploadTO: ArtifactVersionUploadTO = {file, comment, saveType};
    const response = await versionController.createVersion(artifactId, artifactVersionUploadTO, config);
    return response
}

export const updateVersion = async (versionId: string, file?: string, comment?: string): Promise<AxiosResponse<ArtifactVersionTO>> => {
    const versionController = new api.VersionApi();
    const config = helpers.getClientConfig();
    const artifactVersionUpdateTO: ArtifactVersionUpdateTO = {
        versionId, file
    }
    const response = await versionController.updateVersion(artifactVersionUpdateTO, config);
    return response
}


export const getAllVersions = (bpmnArtifactId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            const versionController = new api.VersionApi();
            const config = helpers.getClientConfig();
            const response = await versionController.getAllVersions(bpmnArtifactId, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: SYNC_STATUS_VERSION, dataSynced: true});
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.GET_ALL_VERSIONS, [bpmnArtifactId]));
        }
    };
};


export const getSingleVersion = (artifactId: string, versionId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            const versionController = new api.VersionApi();
            const config = helpers.getClientConfig();
            const response = await versionController.getVersion(artifactId, versionId, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({ type: GET_VERSION, version: response.data });
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.LATEST_VERSION, [artifactId, versionId]));
        }
    };
};


export const getMilestoneVersion = async(artifactId: string, milestone: string): Promise<AxiosResponse<ArtifactVersionTO>> => {
    const versionController = new VersionApi();
    const config = helpers.getClientConfig();
    const response = await versionController.getMilestoneVersion(artifactId, milestone, config);
    return response;
}



export const getLatestVersion = async (artifactId: string): Promise<AxiosResponse<ArtifactVersionTO>> => {
    const versionController = new VersionApi();
    const config = helpers.getClientConfig();
    const response = await versionController.getLatestVersion(artifactId, config);
    return response;
}


export const download = (artifactId: string, artifactVersionId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            const versionController = new api.VersionApi();
            const config = helpers.getClientConfig();
            const response = await versionController.downloadVersion(artifactId, artifactVersionId, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({ type: SUCCESS, successMessage: "version.downloading" });
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.LATEST_VERSION, [artifactId]));
        }
    };
};
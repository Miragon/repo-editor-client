import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import {ArtifactVersionUpdateTO} from "../../api/api";
import {ArtifactVersionUploadTO, ArtifactVersionUploadTOSaveTypeEnum} from "../../api";
import helpers from "../../util/helperFunctions";
import {GET_VERSION, HANDLEDERROR, SUCCESS, SYNC_STATUS_VERSION} from "../../constants/Constants";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";

export const createVersion = (artifactId: string, file: string, saveType: ArtifactVersionUploadTOSaveTypeEnum, comment?: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const versionController = new api.VersionApi();
        try {
            const artifactVersionUploadTO: ArtifactVersionUploadTO = {
                file: file,
                versionComment: comment,
                saveType: saveType
            };
            const config = helpers.getClientConfig();
            const response = await versionController.createVersion(artifactId, artifactVersionUploadTO, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({ type: SUCCESS, successMessage: "version.created" });
                dispatch({ type: SYNC_STATUS_VERSION, dataSynced: false });
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.CREATE_OR_UPDATE_VERSION, [artifactId, file, saveType, comment]));
        }
    };
};

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


export const getLatestVersion = (artifactId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            const versionController = new api.VersionApi();
            const config = helpers.getClientConfig();
            const response = await versionController.getLatestVersion(artifactId, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({ type: GET_VERSION, version: response.data });
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.LATEST_VERSION, [artifactId]));
        }
    };
};

export const updateVersion = (versionId: string, file: string, versionComment?: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            const artifactVersionUpdateTO: ArtifactVersionUpdateTO = {
                versionId, file, versionComment,
            }
            const versionController = new api.VersionApi();
            const config = helpers.getClientConfig();
            const response = await versionController.updateVersion(artifactVersionUpdateTO, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({ type: GET_VERSION, version: response.data });
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.LATEST_VERSION, [versionId, file, versionComment]));
        }
    };
};

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
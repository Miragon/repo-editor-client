import {Dispatch} from "@reduxjs/toolkit";
import {ArtifactApi, ArtifactTO, ArtifactUpdateTO, NewArtifactTO} from "../../api";
import helpers from "../../util/helperFunctions";
import {
    ARTIFACTS_BY_REPO_AND_TYPE,
    GET_ARTIFACT,
    HANDLEDERROR,
    SUCCESS,
    SYNC_STATUS_ARTIFACT
} from "../../constants/Constants";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";
import {AxiosResponse} from "axios";


export const createArtifact = async (repoId: string, name: string, description: string, fileType: string): Promise<AxiosResponse<ArtifactTO>> => {
    const artifactController = new ArtifactApi();
    const config = helpers.getClientConfig();
    const newArtifactTO: NewArtifactTO = {
        name: name,
        description: description,
        fileType: fileType,
        svgPreview: ""
    };
    const response = await artifactController.createArtifact(repoId, newArtifactTO, config)
    return response
}


export const updateArtifact = (name: string, description: string | undefined, artifactId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const artifactController = new ArtifactApi();
        try {
            const config = helpers.getClientConfig();
            // eslint-disable-next-line object-shorthand
            const artifactUpdateTO: ArtifactUpdateTO = {
                name: name,
                description: description ? description : ""
            }
            const response = await artifactController.updateArtifact(artifactId, artifactUpdateTO, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: SYNC_STATUS_ARTIFACT, dataSynced: false})
                dispatch({ type: SUCCESS, successMessage: "artifact.updated" });
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.FETCH_ARTIFACTS_FROM_REPO, [name, description]));
        }
    };
};



export const addToFavorites = (artifactId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const artifactController = new ArtifactApi();
        try {
            const config = helpers.getClientConfig();
            const response = await artifactController.setStarred(artifactId, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({ type: SYNC_STATUS_ARTIFACT, dataSynced: false });
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.SET_STARRED, [artifactId]));
        }
    };
};

export const copyToRepo = (repositoryId: string, artifactId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const artifactController = new ArtifactApi();
        try {
            const config = helpers.getClientConfig();
            const response = await artifactController.copyToRepository(repositoryId, artifactId, config);
            if(Math.floor(response.status / 100) === 2) {
                dispatch({type: SUCCESS, successMessage: "artifact.copied"})
            } else {
                dispatch({type: HANDLEDERROR, errorMessage: "error.couldNotProcess"})
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.COPY_TO_REPO, [repositoryId, artifactId]))
        }
    }
}


export const deleteArtifact = (artifactId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const artifactController = new ArtifactApi();
        try {
            const config = helpers.getClientConfig();
            const response = await artifactController.deleteArtifact(artifactId, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({ type: SYNC_STATUS_ARTIFACT, dataSynced: false });
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.DELETE_ARTIFACTS, [artifactId]));
        }
    };
};


export const getByRepositoryIdAndType = (repositoryId: string, type: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const artifactController = new ArtifactApi();
        try {
            const config = helpers.getClientConfig();
            const response = await artifactController.getByRepoIdAndType(repositoryId, type, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({ type: SUCCESS, successMessage: "Fetched ReponType" });
                dispatch({type: ARTIFACTS_BY_REPO_AND_TYPE, artifactsByRepoAndType: response.data})
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.GET_ALL_SHARED_ARTIFACTS, []));
        }
    };
};

export const getArtifact = (artifactId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const artifactController = new ArtifactApi();
        try {
            const config = helpers.getClientConfig();
            const response = await artifactController.getArtifact(artifactId, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: GET_ARTIFACT, artifact: response.data})
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.GET_ARTIFACT, [artifactId]));
        }
    };
};

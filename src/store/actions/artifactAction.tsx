import {Dispatch} from "@reduxjs/toolkit";
import {
    ArtifactApi,
    ArtifactUpdateTO,
    ArtifactVersionUploadTO,
    ArtifactVersionUploadTOSaveTypeEnum,
    NewArtifactTO,
    VersionApi
} from "../../api";
import helpers from "../../util/helperFunctions";
import {
    ARTIFACTS_BY_REPO_AND_TYPE,
    CREATED_ARTIFACT,
    GET_ARTIFACT,
    HANDLEDERROR,
    SUCCESS,
    SYNC_STATUS_ARTIFACT,
    SYNC_STATUS_RECENT,
    SYNC_STATUS_VERSION
} from "../../constants/Constants";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";


export const createArtifact = (
    repoId: string,
    name: string,
    description: string,
    fileType: string,
    svgPreview: string
) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const artifactController = new ArtifactApi();
        try {
            const config = helpers.getClientConfig();
            const newArtifactTO: NewArtifactTO = {
                name: name,
                description: description,
                fileType: fileType || "BPMN",
                svgPreview: svgPreview
            };
            const response = await artifactController.createArtifact(repoId, newArtifactTO, config);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({ type: SYNC_STATUS_ARTIFACT, dataSynced: false });
                dispatch({type: SYNC_STATUS_RECENT, dataSynced: false})
            } else {
                dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.CREATE_ARTIFACT, [
                repoId, name, description, fileType, svgPreview
            ]));
        }
    };
};


export const createArtifactWithDefaultVersion = (repoId: string, name: string, description: string, file: string, fileType: string, svgPreview: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const artifactController = new ArtifactApi();
        try {
            const config = helpers.getClientConfig();
            const newArtifactTO: NewArtifactTO = { name, description, fileType, svgPreview };

            await artifactController.createArtifact(repoId, newArtifactTO, config)
                .then(response => {
                    if (Math.floor(response.status / 100) === 2) {
                        dispatch({type: CREATED_ARTIFACT, createdArtifact: response.data})
                        const artifactVersionUploadTO: ArtifactVersionUploadTO = {
                            saveType: ArtifactVersionUploadTOSaveTypeEnum.Milestone,
                            file: file
                        }
                        const versionController = new VersionApi();
                        try {
                            const config = helpers.getClientConfig();
                            versionController.createVersion(response.data.id, artifactVersionUploadTO, config)
                                .then(response2 => {
                                    if (Math.floor(response2.status / 100) === 2) {
                                        dispatch({type: SUCCESS, successMessage: "artifact.createdDefault"});
                                        dispatch({type: SYNC_STATUS_ARTIFACT, dataSynced: false });
                                        dispatch({type: SYNC_STATUS_VERSION, dataSynced: false});
                                    } else {
                                        dispatch({type: HANDLEDERROR, errorMessage: "error.couldNotProcess"});
                                    }
                                }
                                );
                        } catch (error) {
                            dispatch(handleError(error, ActionType.CREATE_OR_UPDATE_VERSION, [response.data.id, file, ArtifactVersionUploadTOSaveTypeEnum.Milestone]));
                        }

                    } else {
                        dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
                    }
                });



        } catch (error) {
            dispatch(handleError(error, ActionType.CREATE_ARTIFACT, [
                repoId, name, description, fileType, svgPreview
            ]));
        }
    };
};




export const createNewArtifactWithVersionFile = (repoId: string, name: string, description: string, file: string, fileType: string, svgPreview: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const artifactController = new ArtifactApi();
        try {
            const config = helpers.getClientConfig();
            const newArtifactTO: NewArtifactTO = {name, description, fileType, svgPreview};
            await artifactController.createArtifact(repoId, newArtifactTO, config)
                .then(response => {
                    if (Math.floor(response.status / 100) === 2) {
                        const artifactVersionUploadTO: ArtifactVersionUploadTO = {
                            saveType: ArtifactVersionUploadTOSaveTypeEnum.Milestone,
                            file: file
                        }
                        const versionController = new VersionApi();
                        try {
                            const config = helpers.getClientConfig();
                            versionController.createVersion(response.data.id, artifactVersionUploadTO, config)
                                .then(response2 => {
                                    if (Math.floor(response2.status / 100) === 2) {
                                        dispatch({type: SUCCESS, successMessage: "artifact.createdFromExisting"});
                                        dispatch({type: SYNC_STATUS_ARTIFACT, dataSynced: false });
                                        dispatch({type: SYNC_STATUS_VERSION, dataSynced: false});
                                        dispatch({type: CREATED_ARTIFACT, createdArtifact: response.data});
                                        console.log("Created with file")
                                    } else {
                                        dispatch({type: HANDLEDERROR, errorMessage: "error.couldNotProcess"});
                                    }
                                }
                                );
                        } catch (error) {
                            dispatch(handleError(error, ActionType.CREATE_OR_UPDATE_VERSION, [response.data.id, file, ArtifactVersionUploadTOSaveTypeEnum.Milestone]));
                        }
                    } else {
                        dispatch({ type: HANDLEDERROR, errorMessage: "error.couldNotProcess" });
                    }
                });


        } catch (error) {
            dispatch(handleError(error, ActionType.CREATE_ARTIFACT, [
                repoId, name, description, fileType, svgPreview
            ]));
        }
    };
};


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

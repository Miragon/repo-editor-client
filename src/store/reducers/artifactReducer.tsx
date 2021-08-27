import {CaseReducer} from "@reduxjs/toolkit";
import {ArtifactTO, ArtifactTypeTO} from "../../api";
import {
    ARTIFACT_UPLOAD,
    ARTIFACTS_BY_REPO_AND_TYPE,
    CREATED_ARTIFACT,
    FILETYPES,
    GET_ARTIFACT,
} from "../../constants/Constants";

const initialState = {
    artifacts: Array<ArtifactTO>(),
    artifact: null,
    createdArtifact: null,
    uploadedArtifact: null,
    fileTypes: Array<ArtifactTypeTO>(),
    artifactsByRepoAndType: Array<ArtifactTO>()
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ARTIFACT_UPLOAD:
            return {
                ...state,
                uploadedArtifact: action.uploadedArtifact
            };
        case CREATED_ARTIFACT:
            return {
                ...state,
                createdArtifact: action.createdArtifact
            }
        case GET_ARTIFACT:
            return {
                ...state,
                artifact: action.artifact
            }
        case FILETYPES:
            return {
                ...state,
                fileTypes: action.fileTypes
            }
        case ARTIFACTS_BY_REPO_AND_TYPE:
            return {
                ...state,
                artifactsByRepoAndType: action.artifactsByRepoAndType
            }
    }
    return state;
};

export default reducer;

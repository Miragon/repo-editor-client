import * as api from "../../api/api";
import {ArtifactVersionTO, ArtifactVersionUpdateTO, VersionApi} from "../../api/api";
import {ArtifactVersionUploadTO, ArtifactVersionUploadTOSaveTypeEnum} from "../../api";
import helpers from "../../util/helperFunctions";
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



export const getMilestoneVersion = async(artifactId: string, milestone: number): Promise<AxiosResponse<ArtifactVersionTO>> => {
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


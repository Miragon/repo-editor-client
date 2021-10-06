import * as api from "../../api/api";
import {ArtifactMilestoneTO, ArtifactMilestoneUpdateTO, MilestoneApi} from "../../api/api";
import {ArtifactMilestoneUploadTO, ArtifactMilestoneUploadTOSaveTypeEnum} from "../../api";
import helpers from "../../util/helperFunctions";
import {AxiosResponse} from "axios";

export const createMilestone = async (artifactId: string, file: string, saveType: ArtifactMilestoneUploadTOSaveTypeEnum, comment?: string): Promise<AxiosResponse<ArtifactMilestoneTO>> => {
    const milestoneController = new api.MilestoneApi();
    const config = helpers.getClientConfig();
    const artifactMilestoneUploadTO: ArtifactMilestoneUploadTO = {file, comment, saveType};
    const response = await milestoneController.createMilestone(artifactId, artifactMilestoneUploadTO, config);
    return response
}

export const updateMilestone = async (milestoneId: string, file?: string, comment?: string): Promise<AxiosResponse<ArtifactMilestoneTO>> => {
    const milestoneController = new api.MilestoneApi();
    const config = helpers.getClientConfig();
    const artifactMilestoneUpdateTO: ArtifactMilestoneUpdateTO = {
        milestoneId, file
    }
    const response = await milestoneController.updateMilestone(artifactMilestoneUpdateTO, config);
    return response
}



export const getByMilestoneNumber = async(artifactId: string, milestone: number): Promise<AxiosResponse<ArtifactMilestoneTO>> => {
    const milestoneController = new MilestoneApi();
    const config = helpers.getClientConfig();
    const response = await milestoneController.getByMilestoneNumber(artifactId, milestone, config);
    return response;
}



export const getLatestMilestone = async (artifactId: string): Promise<AxiosResponse<ArtifactMilestoneTO>> => {
    const milestoneController = new MilestoneApi();
    const config = helpers.getClientConfig();
    const response = await milestoneController.getLatestMilestone(artifactId, config);
    return response;
}


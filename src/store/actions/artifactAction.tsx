import {ArtifactApi, ArtifactTO, NewArtifactTO} from "../../api";
import helpers from "../../util/helperFunctions";
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



export const getArtifact = async(artifactId: string): Promise<AxiosResponse<ArtifactTO>> => {
    const artifactController = new ArtifactApi();
    const config = helpers.getClientConfig();
    const response = artifactController.getArtifact(artifactId, config);
    return response;
};


export const lockArtifact = async(artifactId: string): Promise<AxiosResponse<ArtifactTO>> => {
    const artifactController = new ArtifactApi();
    const config = helpers.getClientConfig();
    const response = artifactController.lockArtifact(artifactId, config);
    return response;
}

export const unlockArtifact = async(artifactId: string): Promise<AxiosResponse<ArtifactTO>> => {
    const artifactController = new ArtifactApi();
    const config = helpers.getClientConfig();
    const response = artifactController.unlockArtifact(artifactId, config);
    return response;
}
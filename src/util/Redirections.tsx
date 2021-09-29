import {ArtifactTypeTO} from "../api";

export const openFileInTool = (fileTypes: Array<ArtifactTypeTO>, fileType: string, repositoryId: string, artifactId: string, errorMessage: string, milestone?: string): void => {
    const urlNamespace = fileTypes.find((types: ArtifactTypeTO) => types.name.toLowerCase() === fileType.toLowerCase())?.url;
    if(urlNamespace){
        if (milestone) {
            window.open(`/${urlNamespace}/#/${artifactId}/${milestone}`, "_blank");
        } else {
            window.open(`/${urlNamespace}/#/${artifactId}/latest`, "_blank");
        }
    }
    else {
        alert("");
    }
}

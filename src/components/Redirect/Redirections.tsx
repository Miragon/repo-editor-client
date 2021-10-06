import {ArtifactTypeTO} from "../../api";

export const openFileInTool = (fileTypes: Array<ArtifactTypeTO>, fileType: string, repositoryId: string, artifactId: string, errorMessage: string, milestoneId?: string): void => {
    const urlNamespace = fileTypes.find((types: ArtifactTypeTO) => types.name.toLowerCase() === fileType.toLowerCase())?.url;
    if(urlNamespace){
        if(milestoneId){
            window.open(`/${urlNamespace}/${artifactId}/${milestoneId}`, "_blank");
        }
        else{
            window.open(`/${urlNamespace}/${repositoryId}/${artifactId}/latest`, "_blank");
        }
    }
    else {
        alert(errorMessage);
    }
}

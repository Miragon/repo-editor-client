import {FileTypesTO} from "../../api";

export const openFileInTool = (fileTypes: Array<FileTypesTO>, fileType: string, repositoryId: string, artifactId: string, errorMessage: string, versionId?: string): void => {
    const urlNamespace = fileTypes.find((types: FileTypesTO) => types.name.toLowerCase() === fileType.toLowerCase())?.url;
    if(urlNamespace){
        if(versionId){
            window.open(`/${urlNamespace}/${artifactId}/${versionId}`, "_blank");
        }
        else{
            window.open(`/${urlNamespace}/${repositoryId}/${artifactId}/latest`, "_blank");
        }
    }
    else {
        alert(errorMessage);
    }
}

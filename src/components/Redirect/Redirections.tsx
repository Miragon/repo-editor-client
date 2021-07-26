export const openFileInTool = (urlNamespace: string, repositoryId: string, artifactId: string, errorMessage: string, versionId?: string): void => {
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

import React, {useEffect, useState} from "react";
import './DiagramContainer.css'
import DiagramCard from "./Holder/DiagramCard";
import {useStore} from "../../providers/RootStoreProvider";
import {BpmnRepositoryTO} from "../../api";
import {observer} from "mobx-react";



const StarredDiagrams: React.FC = observer(() => {

    const store = useStore();
    const category = "Favorites";

    useEffect(() => {
        (async () => await store.diagramStore.initializeStarred())();
        //Store.diagramStore

    }, [store.diagramStore])

return <div className="DiagramContainer">
    <h1>{category}</h1>
    <div className="ScrollBarDiagram">
        {store.diagramStore.getStarredDiagrams().map(diagram => (
            // eslint-disable-next-line react/jsx-key
            <a href={"/modeler/" + diagram.bpmnRepositoryId + "/" + diagram.bpmnDiagramId + "/latest"}>
            <DiagramCard
                diagramTitle={diagram.bpmnDiagramName}
                image={diagram.svgPreview}
                updatedDate={diagram.updatedDate}
                description={diagram.bpmnDiagramDescription}
                repositoryId={diagram.bpmnRepositoryId} />
            </a>
        ))}

    </div>
</div>

});
//<DiagramCard diagramTitle="Favourites hardcoded" updatedDate={undefined} description="Description description description description description" repoName="Sample Repo Name"/>

export default  StarredDiagrams;



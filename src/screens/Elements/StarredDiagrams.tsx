import React, {useEffect, useState} from "react";
import './DiagramContainer.css'
import DiagramPrevTypescript from "../components/DiagramPrevTypescript";
import {useStore} from "../providers/RootStoreProvider";
import {BpmnRepositoryTO} from "../api";
import {observer} from "mobx-react";



const StarredDiagrams: React.FC = observer(() => {

    const store = useStore();
    const category = "Favourites";

    useEffect(() => {
        (async () => await store.diagramStore.initializeStarred())();
        //Store.diagramStore

    }, [store.diagramStore])

return <div className="DiagramContainer">
    <h1>{category}</h1>
    <div className="ScrollBar">
        {store.diagramStore.getStarredDiagrams().map(diagram => (
            // eslint-disable-next-line react/jsx-key
            <DiagramPrevTypescript
                diagramTitle={diagram.bpmnDiagramName}
                updatedDate={diagram.updatedDate}
                description={diagram.bpmnDiagramDescription}
                repoName={diagram.bpmnRepositoryId} />
        ))}
        <DiagramPrevTypescript diagramTitle="Favourites hardcoded" updatedDate={undefined} description="Description description description description description" repoName="Sample Repo Name"/>
    </div>
</div>

});

export default  StarredDiagrams;



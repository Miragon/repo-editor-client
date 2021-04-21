import React, {useEffect, useState} from "react";
import './DiagramContainer.css'
import DiagramPrevTypescript from "../components/DiagramPrevTypescript";
import {useStore} from "../providers/RootStoreProvider";
import {BpmnRepositoryTO} from "../api";
import {observer} from "mobx-react";


interface LatestDiagramsProps {
    repoIds: string[];
}

//observer!!
const LatestDiagrams: React.FC<LatestDiagramsProps> = observer((props: LatestDiagramsProps) =>{

    //Code for getting the latest
    const store = useStore();

    const category = "Latest";

    useEffect(() => {
        console.log("____________________")
        console.log(props.repoIds);
        (async () => await store.diagramStore.initialize(props.repoIds))();
        //Store.diagramStore

    }, [props.repoIds, store.diagramStore])

//Have to fetch all diagrams sorted by changedDate
    //-> fetch the repoid list
        //-> create a diagramStore, pass the repoids and query all the diagrams
            //sort and return as arraylist, which can be returned one by one by using .map


    return <div className="DiagramContainer"><h1>{category}</h1>
        <div className="ScrollBar">
            {store.diagramStore.getAllDiagrams().map(diagram => (
                // eslint-disable-next-line react/jsx-key
                <DiagramPrevTypescript
                    diagramTitle={diagram.bpmnDiagramName}
                    updatedDate={diagram.updatedDate}
                    description={diagram.bpmnDiagramDescription}
                    repoName={diagram.bpmnRepositoryId} />
            ))}
            <DiagramPrevTypescript diagramTitle="Hardcoded sample in LatestDiagrams.tsx" updatedDate={undefined} description="Description description description description description" repoName="Sample Repo Name"/>
</div>
    </div>
});

export default LatestDiagrams;
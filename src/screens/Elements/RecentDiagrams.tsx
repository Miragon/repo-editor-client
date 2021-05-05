import React, {useEffect} from "react";
import './DiagramContainer.css'
import DiagramCard from "./Holder/DiagramCard";
import {useStore} from "../../providers/RootStoreProvider";
import {observer} from "mobx-react";


const RecentDiagrams: React.FC = observer(() =>{

    const store = useStore();
    const category = "Recent";

    useEffect(() => {
        (async () => await store.diagramStore.initializeRecent())();
        //Store.diagramStore

    }, [store.diagramStore])


    return <div className="DiagramContainer">
                <h1>{category}</h1>
                <div className="ScrollBarDiagram">
                    {store.diagramStore.getRecentDiagrams().map(diagram => (
                        // eslint-disable-next-line react/jsx-key
                        <a href={"/modeler/" + diagram.bpmnRepositoryId + "/" + diagram.bpmnDiagramId + "/latest/"}>
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
//                        <DiagramCard diagramTitle="Hardcoded sample in RecentDiagrams.tsx" updatedDate={undefined} description="Description description description description description" repoName="Sample Repo Name"/>

export default RecentDiagrams;
import React from "react";
import './DiagramContainer.css'

interface ContainerProps {
    category: string;
}


const DiagramContainer: React.FC<ContainerProps> = (props: ContainerProps) =>{



        return <div className="DiagramContainer"><h1>{props.category}</h1>
            <div className="ScrollBarDiagram">

 </div>
        </div>
}
//<DiagramCard diagramTitle="From RecentDiagrams" updatedDate={undefined} description="Description description description description description" repoName="Sample Repo Name"/>

export default DiagramContainer;
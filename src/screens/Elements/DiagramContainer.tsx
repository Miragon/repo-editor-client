import React from "react";
import './DiagramContainer.css'
import DiagramPrevTypescript from "../components/DiagramPrevTypescript";

interface ContainerProps {
    category: string;
}


const DiagramContainer: React.FC<ContainerProps> = (props: ContainerProps) =>{



        return <div className="DiagramContainer"><h1>{props.category}</h1>
            <div className="ScrollBar">
                <DiagramPrevTypescript diagramTitle="From RecentDiagrams" updatedDate={undefined} description="Description description description description description" repoName="Sample Repo Name"/>
 </div>
        </div>
}

export default DiagramContainer;
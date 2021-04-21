import React from "react";
import '../Box.css';
import picture from '../screens/DiagramSample.png';

type DiagramProps = {
    diagramTitle: string;
    updatedDate: Date | undefined;
    description: string;
    repoName: string;
}


const DiagramPrevTypescript: React.FC<DiagramProps> = (props:DiagramProps) => {
        //Insert code with API request
        return <div className="DiagramPrev">
            <div className="Box">
                <div className="header">{props.diagramTitle}</div>
                <div className="image"><img src={picture}/></div>
                <div className="date">{(props.updatedDate != undefined) ? props.updatedDate : undefined}</div>
                <div className="description">{props.description}</div>
                <a href="#"><div className="repoLabel">{props.repoName}</div></a>

            </div>
        </div>
}

export default DiagramPrevTypescript;
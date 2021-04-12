import React from "react";
import './Box.css';
import picture from './DiagramSample.png';

type DiagramProps = {
    diagramTitle: string;
    updatedDate: string;
    description: string;
    repoName: string;
}

type DiagramState = {
    counter: number;
}

export default class DiagramPrevTypescript extends React.Component<DiagramProps, DiagramState>{
    render(){
        //Insert code with API request



        return <div className="DiagramPrev">
            <div className="Box">
                <div className="header">{this.props.diagramTitle}</div>
                <div className="image"><img src={picture}/></div>
                <div className="date">{this.props.updatedDate}</div>
                <div className="description">{this.props.description}</div>
                <a href="#"><div className="repoLabel">{this.props.repoName}</div></a>

            </div>
        </div>
    }
}


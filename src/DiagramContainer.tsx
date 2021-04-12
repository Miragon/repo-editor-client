import React from "react";
import './DiagramPrevTypescript'
import DiagramPrevTypescript from "./DiagramPrevTypescript";

type ContainerProps = {
    category: string;
    diagrams: DiagramPrevTypescript;
}

type ContainerState = {

}

export default class DiagramContainer extends React.Component<ContainerProps, ContainerState>{
    render(){
        return <div></div>;
    }

}
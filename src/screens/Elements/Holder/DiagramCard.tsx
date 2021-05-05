import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useStore} from "../../../providers/RootStoreProvider";

const useStyles = makeStyles(() => ({

DiagramBox: {
    transition: "box-shadow .3s",
    width: "250px",
    height: "300px",
    margin: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    background: "linear-gradient(to bottom, #ededed 30%, transparent)",
    float: "left",
    position: "relative",
    cursor: "pointer",
    "&:hover":{
        boxShadow: "0 0 11px rgba(33,33,33,.2)"
    }
},

header: {
    textAlign: "left",
    padding: "10px",
    color: "#424242",
    fontSize: "15px",
    fontWeight: "bold",
    fontFamily: "Arial"
},

image: {
    position: "absolute",
    top: "15%",
    borderTop: "3px solid #3c91b0",
    borderBottom: "1px solid #ccc",
    backgroundColor: "white",
    width: "100%",
    height: "60%",
    textAlign: "center"
},

img: {
    margin: "auto",
    width: "95%",
    height: "95%"
},

date: {
    position: "absolute",
    top: "76%",
    right: "2px",
    color: "dimgrey",
    fontWeight: "lighter",
    fontSize: "10px",
    fontFamily: "Arial"

},

description: {
    whiteSpace: "normal",
    position: "absolute",
    top: "81%",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "dimgrey",
    fontSize: "11px",
    fontFamily: "Arial"
},

repoLabel: {
    position: "absolute",
    height: "8%",
    width: "100%",
    bottom: "0",
    left: "0",
    right: "0",
    paddingTop: "4px",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    margin: "auto",
    textAlign: "center",
    color: "white",
    fontWeight: "lighter",
    fontSize: "12px",
    fontFamily: "Arial",
    overflow: "hidden",
    backgroundColor: "#3c91b0",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
            backgroundColor: "#3c91b0",
            color: "white",
            fontWeight: "bold",
            height: "20%",
            margin: "auto"
    }
}
}));

type DiagramProps = {
    diagramTitle: string;
    image: string | undefined;
    updatedDate: Date | undefined;
    description: string;
    repositoryId: string;
}


const DiagramCard: React.FC<DiagramProps> = (props:DiagramProps) => {
    const classes = useStyles();
    const store = useStore();

        return <div className={classes.DiagramBox}>
                <div className={classes.header}>{props.diagramTitle}</div>
                <img className={classes.image} src={`data:image/svg+xml;utf-8,${encodeURIComponent(props.image || "")}`}></img>
                <div className={classes.date}>{(props.updatedDate != undefined) ? store.diagramStore.convertDate(props.updatedDate) : undefined}</div>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.repoLabel}>{store.repoStore.getRepoName(props.repositoryId)}</div>
            </div>
}

export default DiagramCard;
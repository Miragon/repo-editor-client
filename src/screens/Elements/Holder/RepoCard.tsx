import React from "react";
import teamIcon from '../../team-icon.svg';
import diagramIcon from '../../diagram-icon.svg';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
RepoBox: {
    flex: "0 0 auto",
    transition: "box-shadow .3s",
    width: "250px",
    height: "130px",
    margin: "10px",
    borderRadius: "10px",
    background: "linear-gradient(to bottom, #3c91b0 40%, #55a1bd 60%, #78d3f5 90%)",
    float: "left",
    position: "relative",
    cursor: "pointer",
    "&:hover": {
        boxShadow: "0 0 11px rgba(33,33,33,.2)"
}
},

repoHeader: {
    textAlign: "left",
    padding: "10px",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    textDecoration: "underline"
},


repoDescription: {
    whiteSpace: "normal",
    position: "absolute",
    top: "30%",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "white",
    fontSize: "12px",
},
    repoInfo: {
        position: "absolute",
        top: "80%",
        right: "10px",
        width: "120px",
        textAlign: "center",
        height: "25px"
    },

    diagramInfo: {
        position: "absolute",
        width: "60px",
        left: "0px"
    },

    teamInfo: {
        position:"absolute",
        width: "60px",
        left: "60px",
        color: "#f7f7f7"
    },

    icon: {
        width: "25px",
        height: "25px",
    },
    number: {
        position: "absolute",
        left: "50px",
        top: "5px",
        color: "#f7f7f7"
    }
}));

type RepoProps = {
    repoTitle: string;
    //updatedDate: Date | undefined;
    description: string;
    existingDiagrams: number;
    assignedUsers: number;
}
//            <p>{props.existingDiagrams}</p>
//            <div className="date">{(props.updatedDate != undefined) ? props.updatedDate : undefined}</div>
const RepoCard: React.FC<RepoProps> = (props:RepoProps) => {
    const classes = useStyles();
    //Insert code with API request
    return <div className={classes.RepoBox}>
        <div className={classes.repoInfo}>
            <div className={classes.diagramInfo}>
                <img className={classes.icon} src={diagramIcon} />
                <div className={classes.number}>{props.existingDiagrams}</div>
            </div>
            <div className={classes.teamInfo}>
                <img className={classes.icon} src={teamIcon} />
                <div className={classes.number}>{props.assignedUsers}</div>
            </div>
        </div>
            <div className={classes.repoHeader}>{props.repoTitle}</div>
            <div className={classes.repoDescription}>{props.description}</div>

        </div>

}

export default RepoCard;
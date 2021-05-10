import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';


const useStyles = makeStyles((theme) => ({
RepoBox: {
    flex: "0 0 auto",
    transition: "box-shadow .3s",
    width: "250px",
    height: "130px",
    margin: "10px",
    borderRadius: "10px",
    background: "linear-gradient(to bottom, "+theme.palette.primary.main+" 40%, "+theme.palette.primary.light+" 90%)",
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
        top: "75%",
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
        width: "20px",
        color: theme.palette.secondary.main
    },
    number: {
        position: "absolute",
        left: "50px",
        top: "3px",
        color: theme.palette.secondary.main
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
                <div>
                    {React.createElement(DescriptionIcon, {
                    className: classes.icon
                    })}
                </div>
                <div className={classes.number}>{(props.existingDiagrams == 0 || props.existingDiagrams == undefined || props.existingDiagrams == null) ? 0 : props.existingDiagrams}</div>
            </div>
            <div className={classes.teamInfo}>
                <div>
                    {React.createElement(PeopleIcon, {
                        className: classes.icon
                    })}
                </div>
                <div className={classes.number}>{(props.assignedUsers == 0 || props.assignedUsers == undefined || props.assignedUsers == null) ? 1 : props.assignedUsers}</div>
            </div>
        </div>
            <div className={classes.repoHeader}>{props.repoTitle}</div>
            <div className={classes.repoDescription}>{props.description}</div>

        </div>

}

export default RepoCard;
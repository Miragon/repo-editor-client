import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import TableChartIcon from "@material-ui/icons/TableChart";
import {ReactComponent as BpmnIcon} from "../../../img/bpmnIcon_gears.svg";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow .3s",
        height: "300px",
        cursor: "pointer",
        marginRight: "0.5rem",
        marginBottom: "0.5rem",
        background: `linear-gradient(to bottom, ${theme.palette.primary.main} 30%, transparent)`,
        borderRadius: "4px",
        textDecoration: "none",
        "&:hover": {
            boxShadow: theme.shadows[4]
        }
    },
    header: {
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    text: {
        padding: "8px",
        display: "flex",
        flexDirection: "column",
    },
    title: {
        fontWeight: "bold",
        fontSize: "14px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    repository: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: "12px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    fileType: {
        width: "25px",
        height: "25px",
        margin: "5px",
        color: "#FFFFFF",
        textDecoration: "none"
    },
    image: {
        backgroundColor: "#EEE",
        flexGrow: 1,
        border: "1px solid #ccc",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
        borderTop: "none"
    }

}));

interface DiagramProps {
    diagramTitle: string;
    image: string | undefined;
    diagramRepo: string;
    fileType: string;
    className?: string;
}

const DiagramCard: React.FC<DiagramProps> = (props: DiagramProps) => {
    const classes = useStyles();

    const image = `data:image/svg+xml;utf-8,${encodeURIComponent(props.image || "")}`;

    return (
        <div className={clsx(classes.container, props.className)}>
            <div className={classes.header}>
                <div className={classes.text}>
                    <span className={classes.repository}>
                        {props.diagramRepo}
                    </span>
                    <span className={classes.title}>
                        {props.diagramTitle}
                    </span>
                </div>
                    
                <div className={classes.fileType} >
                    {(props.fileType === "dmn") ?
                        <TableChartIcon/>
                        :
                        <BpmnIcon/>

                    }
                </div>

            </div>

            <img
                alt="Preview"
                className={classes.image}
                src={image} />

        </div>
    );
};

export default DiagramCard;

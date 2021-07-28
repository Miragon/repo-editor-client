import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import {FileTypesTO} from "../../../api";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import Icon from "@material-ui/core/Icon";
import New from "../../../img/New.svg";
import {Tooltip} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow .3s",
        minHeight: "300px",
        maxHeight: "300px",
        maxWidth: "300px",
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
        overflow: "hidden"
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
        minWidth: "25px",
        maxWidth: "25px",
        minHeight: "25px",
        maxHeight: "25px",
        margin: "5px",
        color: theme.palette.primary.contrastText,
    },
    image: {
        backgroundColor: "#EEE",
        flexGrow: 1,
        border: "1px solid #ccc",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
        borderTop: "none"
    },
    emptyImage: {
        backgroundColor: "#EEE",
        border: "1px solid #ccc",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
        borderTop: "none",
        width: "200px",
        height:"200px"
    }

}));

interface ArtifactProps {
    artifactTitle: string;
    image: string | undefined;
    artifactRepo: string;
    fileType: string;
    className?: string;
}

const ArtifactCard: React.FC<ArtifactProps> = (props: ArtifactProps) => {
    const classes = useStyles();

    const image = `data:image/svg+xml;utf-8,${encodeURIComponent(props.image || "")}`;
    const fileTypes: Array<FileTypesTO> = useSelector((state: RootState) => state.artifacts.fileTypes);
    const [svgKey, setSvgKey] = useState<string>("");

    useEffect(() => {
        if(fileTypes && props.fileType){
            const svgIcon = fileTypes.find(fileType => fileType.name === props.fileType)?.svgIcon;
            setSvgKey(svgIcon ? svgIcon : "");
        }
    }, [fileTypes, props.fileType])


    return (
        <div className={clsx(classes.container, props.className)}>
            <div className={classes.header}>
                <div className={classes.text}>
                    <span className={classes.repository}>
                        {props.artifactRepo}
                    </span>
                    <Tooltip title={props.artifactTitle}>
                        <span className={classes.title}>
                            {props.artifactTitle}
                        </span>
                    </Tooltip>
                </div>
                <Icon className={classes.fileType}>{svgKey}</Icon>
            </div>

            {props.image ?
                <img
                    alt="Preview"
                    className={classes.image}
                    src={image} />
                :

                <img
                    alt="New"
                    className={classes.image}
                    src={New} />
            }


        </div>
    );
};

export default ArtifactCard;

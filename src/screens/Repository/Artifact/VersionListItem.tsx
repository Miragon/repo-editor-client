import {DeploymentTO} from "../../../api";
import {Button, ListItem, Tooltip} from "@material-ui/core";
import helpers from "../../../constants/Functions";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PopupSettings from "../../../components/Form/PopupSettings";
import DeployVersionDialog from "./DeployVersionDialog";
import DeploymentHistory from "./DeploymentHistory";
import SaveAsNewArtifactDialog from "./SaveAsNewArtifactDialog";
import {DropdownButtonItem} from "../../../components/Form/DropdownButton";
import {fetchTargets} from "../../../store/actions/deploymentAction";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() => ({

    nested: {
        backgroundColor: "white",
        paddingLeft: "5%",
        fontSize: "1rem",
        color: "black",
        minHeight: "50px",
        maxHeight: "50px",
        borderBottom: ".5px solid lightgrey",
        transition: "background-color .3s ",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        "&:hover": {
            backgroundColor: "#ededed",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 14px;"
        }
    },
    versionNumber: {
        maxWidth: "10%",
        minWidth: "10%",
        fontSize: "1.25rem"
    },
    content: {
        display: "flex",
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    middlePanel: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    comment: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxBlockSize: "1.5rem"
    },
    deployment: {
        whiteSpace: "nowrap",
        textTransform: "none"

    },
    rightPanel: {
        display: "flex",
        whiteSpace: "nowrap",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "15px"
    },
    icons: {
        color: "black",
    },
}),
);

interface Props {
    artifactTitle: string;
    milestone: number;
    comment?: string;
    updatedDate: string;
    id: string;
    artifactId: string;
    file: string;
    type: string;
    repoId: string;
    deployments: Array<DeploymentTO>
}


const VersionListItem: React.FC<Props> = ((props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const ref = useRef<HTMLButtonElement>(null);
    const {t} = useTranslation("common");


    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [historyOpen, setHistoryOpen] = useState<boolean>(false);
    const [deployVersionOpen, setDeployVersionOpen] = useState<boolean>(false);
    const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);


    const openDeploymentHistory = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setHistoryOpen(true);
    }

    const options: DropdownButtonItem[] = [
        {
            id: "DeployVersion",
            label: t("version.deploy"),
            type: "button",
            onClick: () => {
                dispatch(fetchTargets())
                setDeployVersionOpen(true);

            }
        },
        {
            id: "DownloadVersion",
            label: t("version.download"),
            type: "button",
            onClick: () => {
                const filePath = `/api/version/${props.artifactId}/${props.id}/download`
                const link = document.createElement("a");
                link.href = filePath;
                link.download = filePath.substr(filePath.lastIndexOf("/") + 1);
                link.click();
            }
        },
        {
            id: "DeploymentHistory",
            label: t("version.deploymentHistory"),
            type: "button",
            onClick: () => {
                setHistoryOpen(true);
            }

        },
        {
            id: "SaveAsNewArtifact",
            label: t("version.saveAsNewArtifact"),
            type: "button",
            onClick: () => {
                setSaveDialogOpen(true);
            }

        },
    ];

    //                <ListItemText primary={props.comment ? props.comment : <i>No comment available</i>} />
    return (
        <>
            <ListItem className={classes.nested}>
                <div className={classes.versionNumber}>
                    {props.milestone}
                </div>
                <div className={classes.content}>
                    <div className={classes.middlePanel}>
                        <Tooltip title={props.comment ? props.comment : "No comment available"}>
                            <div className={classes.comment}>
                                {props.comment}
                            </div>
                        </Tooltip>
                        {props.deployments.length > 0 ?
                            <div>
                                <Button
                                    ref={ref}
                                    color="secondary"
                                    className={classes.deployment}
                                    onClick={event => openDeploymentHistory(event)}
                                    variant="contained"
                                    aria-multiline={false}
                                    size={"small"}>
                                    {props.deployments.length > 1 ?
                                        `${props.deployments.length} ${t("deployment.deployments")}`
                                        :
                                        `${props.deployments[0].target}`
                                    }
                                </Button>
                            </div>

                            :
                            <div>

                            </div>}
                    </div>

                    <div className={classes.rightPanel}>
                        <div>
                            {helpers.reformatDate(props.updatedDate)}
                        </div>
                        <IconButton ref={ref} onClick={() => setSettingsOpen(true)} >
                            <MoreVert className={classes.icons}/>
                        </IconButton>
                    </div>
                </div>
            </ListItem>

            <PopupSettings
                open={settingsOpen}
                reference={ref.current}
                onCancel={() => setSettingsOpen(false)}
                options={options} />

            <DeployVersionDialog
                open={deployVersionOpen}
                onCancelled={() => setDeployVersionOpen(false)}
                artifactId={props.artifactId}
                versionId={props.id}
                versionNumber={props.milestone} />

            <DeploymentHistory
                versionId={props.id}
                artifactTitle={props.artifactTitle}
                versionComment={props.comment}
                milestone={props.milestone}
                open={historyOpen}
                onCancelled={() => setHistoryOpen(false)}
                deployments={props.deployments} />

            <SaveAsNewArtifactDialog
                open={saveDialogOpen}
                repoId={props.repoId}
                artifactId={props.artifactId}
                onCancelled={() => setSaveDialogOpen(false)}
                type={props.type}
                versionNo={props.milestone}
                file={props.file}/>
        </>
    );
})

export default VersionListItem
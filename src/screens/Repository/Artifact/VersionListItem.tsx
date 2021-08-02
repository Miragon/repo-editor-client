import {DeploymentTO} from "../../../api";
import {ListItem, ListItemText} from "@material-ui/core";
import helpers from "../../../constants/Functions";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../theme";
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
        backgroundColor: theme.palette.primary.light,
        paddingLeft: "10%",
        color: theme.palette.primary.contrastText,
        minHeight: "70px",
        maxHeight: "70px",
        transition: "background-color .3s",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark
        }
    },
    versionNumber: {
        maxWidth: "10%",
        minWidth: "10%",
        fontSize: "1.25rem"
    },
    icons: {
        color: theme.palette.primary.contrastText,
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

    return (
        <>
            <ListItem className={classes.nested}>
                <div className={classes.versionNumber}>
                    {props.milestone}
                </div>
                <ListItemText primary={props.comment ? props.comment : <i>No comment available</i>} />
                <div>
                    {helpers.reformatDate(props.updatedDate)}
                </div>
                <IconButton ref={ref} onClick={() => setSettingsOpen(true)} >
                    <MoreVert className={classes.icons}/>
                </IconButton>
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
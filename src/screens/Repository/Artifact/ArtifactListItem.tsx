import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {ArtifactVersionTO, FileTypesTO} from "../../../api";
import {RootState} from "../../../store/reducers/rootReducer";
import {Collapse, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExpandLess, ExpandMore, MoreVert} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../theme";
import PopupSettings from "../../../components/Form/PopupSettings";
import {DropdownButtonItem} from "../../../components/Form/DropdownButton";
import {deleteArtifact, getAllVersions, getLatestVersion} from "../../../store/actions";
import IconButton from "@material-ui/core/IconButton";
import CreateVersionDialog from "./CreateVersionDialog";
import EditArtifactDialog from "./EditArtifactDialog";
import {ACTIVE_VERSIONS, LATEST_VERSION} from "../../../store/constants";
import Icon from "@material-ui/core/Icon";
import helpers from "../../../constants/Functions";
import VersionDetails from "./VersionDetails";

const useStyles = makeStyles(() => ({
    listItem: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        marginTop: "10px",
        borderBottom: "1px solid white",
        transition: "background-color .3s",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    icons: {
        color: theme.palette.primary.contrastText,
    },
    contentContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rightPanel: {
        minWidth: "60px",
        maxWidth: "60px",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center"

    },
    middlePanel: {
        flexGrow: 10,
        display: "flex",
        flexDirection: "column"
    },
    expandIcon: {
        alignSelf: "center"
    },
    collapsible: {
        margin: "0px",
        padding: "0px"
    }

}));

interface Props {
    artifactTitle: string;
    createdDate: string | undefined;
    updatedDate: string | undefined;
    description: string;
    repoId: string;
    artifactId: string;
    fileType: string;
    favorite?: boolean;
}


const ArtifactListItem: React.FC<Props> = ((props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const ref = useRef<HTMLButtonElement>(null);
    const {t} = useTranslation("common");


    const artifactVersionTOs: Array<ArtifactVersionTO> = useSelector((state: RootState) => state.versions.versions);
    const latestVersion: ArtifactVersionTO | null = useSelector((state: RootState) => state.versions.latestVersion);
    const versionSynced: boolean = useSelector((state: RootState) => state.dataSynced.versionSynced)
    const fileTypes: Array<FileTypesTO> = useSelector((state: RootState) => state.artifacts.fileTypes);


    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [createVersionOpen, setCreateVersionOpen] = useState<boolean>(false);
    const [editArtifactOpen, setEditArtifactOpen] = useState<boolean>(false);
    const [downloadReady, setDownloadReady] = useState<boolean>(false);
    const [svgKey, setSvgKey] = useState<string>("");


    useEffect(() => {
        if(fileTypes && props.fileType){
            const svgIcon = fileTypes.find(fileType => fileType.name === props.fileType)?.svgIcon;
            setSvgKey(svgIcon ? svgIcon: "");
        }
    }, [fileTypes, props.fileType])

    useEffect(() => {
        if(artifactVersionTOs){
            setOpen(artifactVersionTOs[0]?.artifactId === props.artifactId)
        }
    }, [artifactVersionTOs, props.artifactId])

    const handleOpenVersions = () => {
        if(!open){
            setOpen(!open);
            dispatch(getAllVersions(props.artifactId))
        }
        else {
            setOpen(!open);
            dispatch({type: ACTIVE_VERSIONS, artifacts: []})
        }
    }

    const handleOpenSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setSettingsOpen(true);
    }

    const options: DropdownButtonItem[] = [

        {
            id: "CreateVersion",
            label: "version.create",
            type: "button",
            onClick: () => {
                dispatch(getLatestVersion(props.artifactId))
                setCreateVersionOpen(true);
            }
        },
        {
            id: "EditArtifact",
            label: "artifact.edit",
            type: "button",
            onClick: () => {
                setEditArtifactOpen(true);
            }
        },
        {
            id: "DownloadArtifact",
            label: "artifact.download",
            type: "button",
            onClick: () => {
                dispatch(getLatestVersion(props.artifactId))
                setDownloadReady(true)
            }
        },
        {
            id: "divider1",
            type: "divider",
            label: "",
            onClick: () => { /* Do nothing */
            }
        },
        {
            id: "DeleteArtifact",
            label: "artifact.delete",
            type: "button",
            onClick: () => {
                // eslint-disable-next-line no-restricted-globals
                if (confirm(t("artifact.confirmDelete", {artifactName: props.artifactTitle}))) {
                    dispatch(deleteArtifact(props.artifactId));
                }
            }
        }
    ];

    const download = (useCallback((latestVersion: ArtifactVersionTO) => {
        if(downloadReady) {
            console.log("file Ready - starting download...")
            const filePath = `/api/version/${latestVersion.artifactId}/${latestVersion.id}/download`
            const link = document.createElement("a");
            link.href = filePath;
            link.download = filePath.substr(filePath.lastIndexOf("/") + 1);
            link.click();
            dispatch({type: LATEST_VERSION, latestVersion: null})
            setDownloadReady(false)
        }
    }, [downloadReady, dispatch]))

    useEffect(() => {
        if(latestVersion){
            download(latestVersion);
        }
    }, [download, latestVersion])




    return (
        <>
            <ListItem className={classes.listItem} button onClick={() => handleOpenVersions()}>
                <ListItemIcon>
                    <Icon className={classes.icons}>{svgKey}</Icon>
                </ListItemIcon>

                <div className={classes.contentContainer}>

                    <div className={classes.middlePanel}>
                        <ListItemText primary={props.artifactTitle} secondaryTypographyProps={{color: "secondary"}} secondary={props.description}/>

                        {open ? <ExpandLess className={classes.expandIcon}/> : <ExpandMore className={classes.expandIcon}/>}
                    </div>

                    <div className={classes.rightPanel}>
                        {helpers.reformatDate(props.updatedDate)}
                        <IconButton ref={ref} onClick={event => handleOpenSettings(event)} >
                            <MoreVert className={classes.icons}/>
                        </IconButton>

                    </div>
                </div>

            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit className={classes.collapsible}>
                <VersionDetails
                    key={props.artifactId}
                    artifactId={props.artifactId}
                    repoId={props.repoId}
                    fileType={props.fileType}
                    artifactVersionTOs={artifactVersionTOs}
                    artifactTitle={props.artifactTitle}
                    loading={loading}/>
            </Collapse>


            <PopupSettings
                open={settingsOpen}
                reference={ref.current}
                onCancel={() => setSettingsOpen(false)}
                options={options} />

            <CreateVersionDialog
                open={createVersionOpen}
                onCancelled={() => setCreateVersionOpen(false)}
                onCreated={() => setCreateVersionOpen(false)}
                artifactId={props.artifactId}
                artifactTitle={props.artifactTitle} />

            <EditArtifactDialog
                open={editArtifactOpen}
                onCancelled={() => setEditArtifactOpen(false)}
                repoId={props.repoId}
                artifactId={props.artifactId}
                artifactName={props.artifactTitle}
                artifactDescription={props.description} />
        </>
    );
})

export default ArtifactListItem;
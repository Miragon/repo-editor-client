/* eslint-disable max-len */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
    ClickAwayListener,
    Collapse,
    Grow,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp, MoreVert } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import theme from "../../theme";
import { DropdownButtonItem } from "../../components/Form/DropdownButton";
import {downloadVersion, getAllVersions, getLatestVersion} from "../../store/actions/versionAction";
import { DiagramVersionTO } from "../../api/models";
import { RootState } from "../../store/reducers/rootReducer";
import { deleteDiagram } from "../../store/actions";
import {GET_VERSIONS, LATEST_VERSION} from "../../store/constants";
import CreateVersionDialog from "./CreateVersionDialog";
import EditDiagramDialog from "./EditDiagramDialog";
import TableChartIcon from "@material-ui/icons/TableChart";
import {ReactComponent as BpmnIcon} from "../../img/bpmnIcon_gears.svg";
import VersionDetails from "./VersionDetails";

const useStyles = makeStyles(() => ({
    listItemWithVersions: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "box-shadow .3s",
        borderRadius: "4px",
        marginTop: "10px",
        border: "1px solid lightgrey",
        width: "100%",
        "&:hover": {
            boxShadow: theme.shadows[4]
        },
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        transition: "box-shadow .3s",
        cursor: "pointer",
        borderRadius: "4px",
        border: "1px solid lightgrey",
        width: "100%",
        height: "200px",
        "&:hover": {
            boxShadow: theme.shadows[4]
        },
    },
    image: {
        backgroundColor: "#EEE",
        height: "100%",
        width: "200px",
        borderRight: "1px solid #ccc",
        borderBottomLeftRadius: "4px",
        borderTopLeftRadius: "4px",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "200px"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "nowrap",
        padding: "8px",
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
    },
    title: {
        fontWeight: "bold",
        fontSize: "14px",
        marginLeft: "15px",
        flexGrow: 1,
        whiteSpace: "nowrap",
    },
    updatedDate: {
        marginRight: "10px",
        whiteSpace: "nowrap",
        fontWeight: "lighter",
        fontStyle: "italic",
        overflow: "hidden"
    },
    more: {
        alignSelf: "flex-end",
        height: "25px",
        width: "25px",
        color: theme.palette.primary.contrastText,
    },
    description: {
        flexGrow: 1,
        padding: "16px",
        color: "black"
    },
    versionsButton: {
        width: "100%",
        alignSelf: "flex-end",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        borderBottomRightRadius: "4px",
        transition: "background-color .3s",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "lightgrey"
        },
    },
    popupContainer: {
        width: "150px",
        zIndex: 1000
    },
    popup: {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        backgroundColor: theme.palette.secondary.main,
    },
    list: {
        outline: "none"
    },
    menuItem: {
        color: theme.palette.secondary.contrastText,
        fontSize: theme.typography.button.fontSize,
        fontWeight: theme.typography.button.fontWeight,
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        }
    },

    menuItemDivider: {
        height: "1px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        opacity: "1 !important",
        marginTop: "0.25rem",
        marginBottom: "0.5rem",
        padding: 0
    },
    versionsButtonClose: {
        bottom: "0px",
        width: "100%",
        alignItems: "center",
        transition: "background-color .3s",
        textAlign: "center",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "lightgrey"
        },
    },
    fileType: {
        width: "20px",
        height: "20px",
        color: "#FFFFFF",
        textDecoration: "none"
    },
}));

interface Props {
    diagramTitle: string;
    image: string | undefined;
    createdDate: string | undefined;
    updatedDate: string | undefined;
    description: string;
    repoId: string;
    diagramId: string;
    fileType: string;
}

const DiagramListItem: React.FC<Props> = ((props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const diagramVersionTOs: Array<DiagramVersionTO> = useSelector((state: RootState) => state.versions.versions);
    const latestVersion: DiagramVersionTO | null = useSelector((state: RootState) => state.versions.latestVersion);
    const image = `data:image/svg+xml;utf-8,${encodeURIComponent(props.image || "")}`;

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<string>("");
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [createVersionOpen, setCreateVersionOpen] = useState<boolean>(false);
    const [editDiagramOpen, setEditDiagramOpen] = useState<boolean>(false);
    const [downloadReady, setDownloadReady] = useState<boolean>(false);

    const ref = useRef<HTMLButtonElement>(null);

    const checkIfVersionsAreOpen = useCallback(() => {
        if (diagramVersionTOs) {
            const openedDiagram = diagramVersionTOs[0];
            if (openedDiagram?.diagramId === props.diagramId) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        }
    }, [diagramVersionTOs, props]);

    useEffect(() => {
        // This block checks if th versions of another diagram are being fetched at the moment and if the loading animation has to be displayed
        if (diagramVersionTOs) {
            setCurrentId(diagramVersionTOs[0] ? diagramVersionTOs[0].diagramId : "");
            if (currentId === diagramVersionTOs[0]?.diagramId) {
                setLoading(false);
            }
        }
        /* Runs a check for every DiagramListItem, as soon as the state changes.
        If the DiagramId of the version that is currently saved in the state matches the DiagramId of this DiagramListItem,
        The Item is expanded and available versions are displayed.
        If the IDs don't match, the list is collapsed
        */
        checkIfVersionsAreOpen();
    }, [diagramVersionTOs, currentId, checkIfVersionsAreOpen]);

    useEffect(() => {

        if(downloadReady && latestVersion !== null){
            console.log("file Ready - starting download...")
            dispatch(downloadVersion(props.diagramId, latestVersion?.id))
            dispatch({type: LATEST_VERSION, latestVersion: null})
            setDownloadReady(false)
        }

    }, [downloadReady, latestVersion, props.diagramId, dispatch])


    const fetchVersions = useCallback(() => {
        try {
            dispatch(getAllVersions(props.diagramId));
        } catch (err) {
            console.log(err);
        }
    }, [dispatch, props]);

    const reformatDate = (date: string | undefined) => {
        if (date) {
            return date.split("T")[0];
        }
        return "01.01.2000";
    };

    const removeDiagram = () => {
        dispatch(deleteDiagram(props.diagramId));
    };
    const openSettings = (event: any) => {
        event.stopPropagation();
        setSettingsOpen(true);
    };

    const openVersions = (event: any): void => {
        event.stopPropagation();
        setLoading(true);
        fetchVersions();
        setOpen(true);
    };

    const fetchLatestVersion = useCallback(() => {
        dispatch(getLatestVersion(props.diagramId))
        setDownloadReady(true)
    }, [dispatch, props.diagramId])

    const initDownload = () => {
        //1. Get the latest version
        fetchLatestVersion()
    }

    const openModeler = (repoId: string, diagramId: string, versionId?: string) => {
        if (versionId) {
            window.open(`/modeler/#/${repoId}/${diagramId}/${versionId}/`, "_blank");
        } else {
            window.open(`/modeler/#/${repoId}/${diagramId}/latest`, "_blank");
        }
    };

    const options: DropdownButtonItem[] = [

        {
            id: "CreateVersion",
            label: "Create new Version",
            type: "button",
            onClick: () => {
                setCreateVersionOpen(true);
            }
        },
        {
            id: "EditDiagram",
            label: "Edit Diagram",
            type: "button",
            onClick: () => {
                setEditDiagramOpen(true);
            }

        },
        {
            id: "DownloadDiagram",
            label: "Download Diagram",
            type: "button",
            onClick: () => {
                initDownload();
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
            id: "DeleteDiagram",
            label: "Delete Diagram",
            type: "button",
            onClick: () => {
                // eslint-disable-next-line no-restricted-globals
                if (confirm(`Are you sure you want to delete '${props.diagramTitle}'?`)) {
                    removeDiagram();
                }
            }
        }
    ];

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className={classes.listItemWithVersions} onClick={() => openModeler(props.repoId, props.diagramId)}>
                <div className={classes.listItem}>
                    <img
                        alt="Preview"
                        className={classes.image}
                        src={image} />
                    <div className={classes.content}>

                        <div className={classes.header}>
                            <div className={classes.fileType}>
                                {(props.fileType === "dmn") ?
                                    <TableChartIcon/>
                                    :
                                    <BpmnIcon/>
                                }
                            </div>
                            <div className={classes.title}>
                                {props.diagramTitle}
                            </div>

                            <div className={classes.updatedDate}>
                                {`modified on ${reformatDate(props.updatedDate)}`}
                            </div>
                            <IconButton ref={ref} className={classes.more} onClick={event => openSettings(event)}>
                                <MoreVert />
                            </IconButton>
                        </div>
                        <div className={classes.description}>
                            {props.description}
                        </div>
                        {!open
                        && (
                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                            <div className={classes.versionsButton} onClick={event => openVersions(event)}>
                                <KeyboardArrowDown />
                            </div>
                        )}
                    </div>
                </div>

                <Collapse in={open} timeout="auto">
                    <VersionDetails diagramId={props.diagramId} diagramVersionTOs={diagramVersionTOs} loading={loading}/>
                </Collapse>

            </div>

            <Popper
                open={settingsOpen}
                anchorEl={ref.current}
                role={undefined}
                transition
                disablePortal
                className={classes.popupContainer}>
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: "top" }}>
                        <Paper className={classes.popup}>
                            <ClickAwayListener onClickAway={() => setSettingsOpen(false)}>
                                <MenuList className={classes.list}>
                                    {options.map(option => (
                                        <MenuItem
                                            key={option.id}
                                            disabled={option.disabled || option.type !== "button"}
                                            className={clsx(
                                                classes.menuItem,
                                                option.type === "divider" && classes.menuItemDivider
                                            )}
                                            onClick={() => {
                                                if (option.onClick) {
                                                    option.onClick();
                                                } else {
                                                    console.log("Some error when clicking");
                                                }
                                                setSettingsOpen(false);
                                            }}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

            <CreateVersionDialog
                open={createVersionOpen}
                onCancelled={() => setCreateVersionOpen(false)}
                onCreated={() => setCreateVersionOpen(false)}
                diagramId={props.diagramId}
                diagramTitle={props.diagramTitle} />

            <EditDiagramDialog
                open={editDiagramOpen}
                onCancelled={() => setEditDiagramOpen(false)}
                repoId={props.repoId}
                diagramId={props.diagramId}
                diagramName={props.diagramTitle}
                diagramDescription={props.description} />
        </>
    );
});
export default DiagramListItem;


/*
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>Version</b>
                                </TableCell>
                                <TableCell>
                                    <b>Comment</b>
                                </TableCell>
                                <TableCell>
                                    <b>Date</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading
                            && (
                                <TableRow key="loading" hover>
                                    <TableCell colSpan={3} align="center">
                                        <>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        </>
                                    </TableCell>
                                </TableRow>
                            )}
                            {diagramVersionTOs?.map(singleVersion => (
                                <TableRow
                                    key={singleVersion.id}
                                    hover
                                    onClick={() => openModeler(singleVersion.repositoryId, singleVersion.diagramId, singleVersion.id)}>
                                    <TableCell
                                        component="th"
                                        scope="row">
                                        {singleVersion.release}
                                        .
                                        {singleVersion.milestone}
                                    </TableCell>
                                    <TableCell>{singleVersion.comment}</TableCell>
                                    <TableCell>{reformatDate(singleVersion.updatedDate)}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
<div className={classes.versionsButtonClose} onClick={(event => closeVersions(event))}>
    <KeyboardArrowUp />
</div>
 */
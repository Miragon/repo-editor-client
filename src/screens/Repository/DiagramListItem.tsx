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
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme } from "@material-ui/core/styles";
import { KeyboardArrowDown, KeyboardArrowUp, MoreVert } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DiagramVersionTO } from "../../api/models";
import { DropdownButtonItem } from "../../components/Form/DropdownButton";
import { deleteDiagram, getAllVersions } from "../../store/actions";

import { GET_VERSIONS } from "../../store/constants";
import { RootState } from "../../store/reducers/rootReducer";
import CreateVersionDialog from "./CreateVersionDialog";
import EditDiagramDialog from "./EditDiagramDialog";

const useStyles = makeStyles((theme: Theme) => ({
    listWithVersions: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "box-shadow .3s",
        borderRadius: "4px",
        marginTop: "1rem",
        border: "1px solid lightgrey",
        width: "100%",
        "&:hover": {
            boxShadow: theme.shadows[4]
        }
    },
    listItemWithVersions: {
        transition: "box-shadow .3s",
        cursor: "pointer",
        borderRadius: "4px",
        width: "100%",
        height: "200px"
    },
    listItem: {
        paddingTop: "10px",
        position: "relative",
        transition: "box-shadow .3s",
        cursor: "pointer",
        borderRadius: "4px",
        border: "1px solid lightgrey",
        width: "100%",
        height: "200px"
    },
    header: {
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "nowrap",
        left: "420px",
        width: "calc(100% - 420px)",
        padding: "8px",
        color: "black",
    },
    title: {
        fontWeight: "bold",
        fontSize: "14px",
        flexGrow: 1,
        whiteSpace: "nowrap",
    },
    updatedDate: {
        marginTop: "8px",
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
    },
    description: {
        position: "absolute",
        left: "420px",
        top: "30px",
        padding: "8px",
        color: "black"
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
    versionsButton: {
        position: "absolute",
        bottom: "0px",
        left: "400px",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "calc(100% - 400px)",
        border: "none",
        transition: "background-color .3s",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "lightgrey"
        },
    },
    image: {
        backgroundColor: "#EEE",
        height: "100%",
        width: "400px",
        border: "1px solid #ccc",
        borderBottomLeftRadius: "4px",
        borderTopLeftRadius: "4px",
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
}));

interface Props {
    diagramTitle: string;
    image: string | undefined;
    createdDate: string | undefined;
    updatedDate: string | undefined;
    description: string;
    repoId: string;
    diagramId: string;
}

const DiagramListItem: React.FC<Props> = ((props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const diagramVersionTOs: Array<DiagramVersionTO> = useSelector(
        (state: RootState) => state.versions.versions
    );

    const image = `data:image/svg+xml;utf-8,${encodeURIComponent(props.image || "")}`;

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<string>("");
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [createVersionOpen, setCreateVersionOpen] = useState<boolean>(false);
    const [editDiagramOpen, setEditDiagramOpen] = useState<boolean>(false);

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
        // This block checks if th versions of another diagram are being fetched at the moment and
        // if the loading animation has to be displayed
        if (diagramVersionTOs) {
            diagramVersionTOs.sort(compare);
            setCurrentId(diagramVersionTOs[0] ? diagramVersionTOs[0].diagramId : "");
            if (currentId === diagramVersionTOs[0]?.diagramId) {
                setLoading(false);
            }
        }
        /**
         * Runs a check for every DiagramListItem, as soon as the state changes. If the DiagramId
         * of the version that is currently saved in the state matches the DiagramId of this
         * DiagramListItem, The Item is expanded and available versions are displayed. If the IDs
         * don't match, the list is collapsed
         */
        checkIfVersionsAreOpen();
    }, [diagramVersionTOs, currentId, checkIfVersionsAreOpen]);

    const compare = (a: DiagramVersionTO, b: DiagramVersionTO) => {
        if (a.release < b.release) {
            return -1;
        }
        if (a.release > b.release) {
            return 1;
        }
        if (a.release === b.release) {
            if (a.milestone < b.milestone) {
                return -1;
            }
            if (a.milestone > b.milestone) {
                return 1;
            }
        }
        return 0;
    };

    const fetchVersions = useCallback(() => {
        try {
            setLoading(true);
            dispatch(getAllVersions(props.diagramId));
        } catch (err) {
            // eslint-disable-next-line no-console
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const openSettings = (event: any) => {
        event.stopPropagation();
        setSettingsOpen(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const openVersions = (event: any): void => {
        event.stopPropagation();
        setLoading(true);
        fetchVersions();
        setOpen(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const closeVersions = (event: any): void => {
        event.stopPropagation();
        dispatch({ type: GET_VERSIONS, versions: [] });
        setOpen(false);
    };

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
                // eslint-disable-next-line no-alert
                if (window.confirm(`Are you sure you want to delete '${props.diagramTitle}'?`)) {
                    removeDiagram();
                }
            }
        }
    ];

    return (
        <>
            { /* eslint-disable-next-line */}
            <div
                className={classes.listWithVersions}
                onClick={() => openModeler(props.repoId, props.diagramId)}>
                <div className={classes.listItemWithVersions}>
                    <div className={classes.header}>
                        <div className={classes.title}>
                            {props.diagramTitle}
                        </div>
                        <div className={classes.updatedDate}>
                            {`modified on ${reformatDate(props.updatedDate)}`}
                        </div>
                        <IconButton
                            ref={ref}
                            className={classes.more}
                            onClick={event => openSettings(event)}>
                            <MoreVert />
                        </IconButton>
                    </div>

                    {!open
                    && (
                        // eslint-disable-next-line
                        <div
                            className={classes.versionsButton}
                            onClick={event => openVersions(event)}>
                            <KeyboardArrowDown />
                        </div>
                    )}

                    <img
                        alt="Preview"
                        className={classes.image}
                        src={image} />
                    <div className={classes.description}>
                        {props.description}
                    </div>
                </div>

                <Collapse in={open} timeout="auto">
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
                                            {loading ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20} />
                                            ) : null}
                                        </>
                                    </TableCell>
                                </TableRow>
                            )}
                            {diagramVersionTOs?.map(singleVersion => (
                                <TableRow
                                    key={singleVersion.id}
                                    hover
                                    onClick={() => openModeler(
                                        singleVersion.repositoryId,
                                        singleVersion.diagramId,
                                        singleVersion.id
                                    )}>
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
                    { /* eslint-disable-next-line */}
                    <div
                        className={classes.versionsButtonClose}
                        onClick={(event => closeVersions(event))}>
                        <KeyboardArrowUp />
                    </div>
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
                                                    // eslint-disable-next-line no-console
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

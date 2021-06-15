import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Collapse,
    IconButton, Popper, Grow, ClickAwayListener, MenuList, MenuItem
} from "@material-ui/core"
import theme from "../../theme";
import {Delete, MoreVert, KeyboardArrowDown, KeyboardArrowUp} from '@material-ui/icons';
import DropdownButton, {DropdownButtonItem} from "../../components/Form/DropdownButton";
import {useDispatch, useSelector} from "react-redux";
import {getAllVersions} from "../../store/actions/versionAction";
import {AssignmentWithUserNameTORoleEnumEnum, BpmnDiagramVersionTO} from "../../api/models";
import {RootState} from "../../store/reducers/rootReducer";
import {deleteDiagram, GET_VERSIONS, SYNC_STATUS} from "../../store/actions/diagramAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import CreateVersionDialog from "./CreateVersionDialog";
const useStyles = makeStyles(() => ({
    listWithVersions: {
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        position: "relative",
        transition: "box-shadow .3s",
        borderRadius: "4px",
        border: "1px solid lightgrey",
        width: "100%",
        "&:hover": {
            boxShadow: theme.shadows[4]
        },
    },
    listItemWithVersions: {
        transition: "box-shadow .3s",
        cursor: "pointer",
        borderRadius: "4px",
        width: "100%",
        height: "200px",
        "&:hover": {
            boxShadow: theme.shadows[4]
        },
    },
    listItem: {
        paddingTop: "10px",
        position: "relative",
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
    header: {
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "nowrap",
        left: "220px",
        width: "calc(100% - 220px)",
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
        left: "220px",
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
        left: "200px",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "calc(100% - 200px)",
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
        width: "200px",
        border: "1px solid #ccc",
        borderBottomLeftRadius: "4px",
        borderTopLeftRadius: "4px",
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

    const bpmnDiagramVersionTOS: Array<BpmnDiagramVersionTO> = useSelector((state: RootState) => state.versions.versions)
    const dataSynced: boolean = useSelector((state: RootState) => state.dataSynced.dataSynced)

    const image = `data:image/svg+xml;utf-8,${encodeURIComponent(props.image || "")}`;

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>();
    const [currentId, setCurrentId] = useState<string>();
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [createVersionOpen, setCreateVersionOpen] = useState<boolean>(false);

    const ref = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        //This block checks if th versions of another diagram are being fetched at the moment and if the loading animation has to be displayed
        if(bpmnDiagramVersionTOS){
            setCurrentId(bpmnDiagramVersionTOS[0]?.bpmnDiagramId)
            if(currentId === bpmnDiagramVersionTOS[0]?.bpmnDiagramId){
                setLoading(false)
            }
        }
        /*Runs a check for every DiagramListItem, as soon as the state changes.
        If the DiagramId of the version that is currently saved in the state matches the DiagramId of this DiagramListItem,
        The Item is expanded and available versions are displayed.
        If the IDs don't match, the list is collapsed
        */
        checkIfVersionsAreOpen()

        if(!dataSynced){
            fetchVersions()
            dispatch({type: SYNC_STATUS, dataSynced: true})

        }
    }, [bpmnDiagramVersionTOS, currentId, dataSynced])

    const fetchVersions = useCallback(() => {
        try {
            setLoading(true)
            dispatch(getAllVersions(props.repoId, props.diagramId))
        } catch (err) {
            console.log(err)
        }
    }, [dispatch])

    const reformatDate = (date: string | undefined) => {
        if(date){
            return date.split('T')[0]
        }
        else {
            return "01.01.2000"
        }
    }
    const removeDiagram = () => {
        dispatch(deleteDiagram(props.repoId, props.diagramId))
        console.log("Clicked Delete")
    }
    const openSettings = (event: any) => {
        event.stopPropagation()
        setSettingsOpen(true)
    }

    const openVersions = (event: any): void => {
        event.stopPropagation();
        setLoading(true);
        fetchVersions();
        setOpen(true);
    }
    const closeVersions = (event: any): void => {
        event.stopPropagation();
        dispatch({type: GET_VERSIONS, versions: undefined})
        setOpen(false);

    }
    const openModeler = (repoId: string, diagramId: string, versionId?: string) => {
        console.error("err");
        if(versionId){
            window.open(`/modeler/#/${repoId}/${diagramId}/${versionId}/`, '_blank');
        } else {
            window.open(`/modeler/#/${repoId}/${diagramId}/latest`, '_blank');
        }
    }

    const checkIfVersionsAreOpen = useCallback(() => {
        if(bpmnDiagramVersionTOS){
            const openedDiagram = bpmnDiagramVersionTOS[0]
                if(openedDiagram?.bpmnDiagramId === props.diagramId){
                    setOpen(true)
                } else {
                    setOpen(false)
                }
        }
    }, [bpmnDiagramVersionTOS])


    const options: DropdownButtonItem[] = [
        {
            id: "DeleteDiagram",
            label: "Delete Diagram",
            type: "button",
            onClick: () => {
                removeDiagram()
            }
        },
        {
            id: "CreateVersion",
            label: "Create new Version",
            type: "button",
            onClick: () => {
                setCreateVersionOpen(true)
            }
        }
    ];

        return (
            <>
            <div className={classes.listWithVersions} onClick={() => openModeler(props.repoId, props.diagramId)}>
            <div className={classes.listItemWithVersions} >
                <div className={classes.header}>
                    <div className={classes.title}>
                        {props.diagramTitle}
                    </div>
                    <div className={classes.updatedDate}>
                        {"modified on " + reformatDate(props.updatedDate)}
                    </div>
                    <IconButton ref={ref} className={classes.more} onClick={(event) => openSettings(event)}>
                        <MoreVert/>
                    </IconButton>
                </div>

                {!open &&
                <div className={classes.versionsButton} onClick={(event) => openVersions(event)}>
                    <KeyboardArrowDown/>
                </div>
                }

                <img
                    alt="Preview"
                    className={classes.image}
                    src={image} />
                <div className={classes.description}>
                    {props.description}
                </div>
            </div>


                <Collapse in={open} timeout={"auto"}>
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
                        {loading &&
                        <TableRow key="loading" hover={true}>
                            <TableCell colSpan={3} align="center">
                                <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                </React.Fragment></TableCell>
                        </TableRow>
                        }
                {bpmnDiagramVersionTOS?.map((singleVersion) => (
                    <TableRow key={singleVersion.bpmnDiagramVersionId} hover={true} onClick={() => openModeler(singleVersion.bpmnRepositoryId, singleVersion.bpmnDiagramId, singleVersion.bpmnDiagramVersionId)}>
                        <TableCell component="th" scope={"row"}>{singleVersion.bpmnDiagramVersionRelease}.{singleVersion.bpmnDiagramVersionMilestone}</TableCell>
                        <TableCell>{singleVersion.bpmnDiagramVersionComment}</TableCell>
                        <TableCell>{reformatDate(singleVersion.updatedDate)}</TableCell>
                    </TableRow>
                ))}

                    </TableBody>
                </Table>
                <div className={classes.versionsButtonClose} onClick={((event) => closeVersions(event))}>
                    <KeyboardArrowUp/>
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
                                        classes.menuItem
                                    )}
                                    onClick={() => {
                                        if (option.onClick) {
                                            option.onClick();
                                        } else {
                                            console.log("Some error when clicking")
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
                    repoId={props.repoId}
                    diagramId={props.diagramId}
                    diagramTitle={props.diagramTitle} />
    </>
        );
});
export default DiagramListItem;
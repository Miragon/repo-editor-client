import React, {useEffect, useState} from "react";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, Popper} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {KeyboardArrowUp} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import {MoreVert} from "@material-ui/icons";
import {DiagramVersionTO} from "../../api/models";
import {useDispatch} from "react-redux";
import {GET_VERSIONS} from "../../store/constants";
import {useTranslation} from "react-i18next";
import GetAppIcon from "@material-ui/icons/GetApp";
import {downloadVersion} from "../../store/actions";

const useStyles = makeStyles(() => ({
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
    splitCell: {
        display: "flex",
        justifyContent: "space-between"
    },
    popupContainer: {
        zIndex: 1000
    },
}));
interface Props {
    diagramId: string;
    loading: boolean;
    diagramVersionTOs: DiagramVersionTO[];
}
const VersionDetails: React.FC<Props> = ((props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation("common");

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (props.diagramVersionTOs) {
            props.diagramVersionTOs.sort(compare);
        }
    }, [props.diagramVersionTOs]);

    const compare = (a: DiagramVersionTO, b: DiagramVersionTO) => {
        if (a.milestone < b.milestone) {
            return -1;
        }
        if (a.milestone > b.milestone) {
            return 1;
        }
        return 0;
    };

    const openModeler = (repoId: string, diagramId: string, versionId?: string) => {
        if (versionId) {
            window.open(`/modeler/#/${repoId}/${diagramId}/${versionId}/`, "_blank");
        } else {
            window.open(`/modeler/#/${repoId}/${diagramId}/latest`, "_blank");
        }
    };

    const reformatDate = (date: string | undefined) => {
        if (date) {
            return date.split("T")[0];
        }
        return "01.01.2000";
    };

    const openSettings = (event: any) => {
        event.stopPropagation();
        setSettingsOpen(true);
    };

    const closeVersions = (event: any): void => {
        event.stopPropagation();
        dispatch({ type: GET_VERSIONS, versions: [] });
    };

    //TODO: Fix Download
    const download = (diagramId: string, versionId: string) => {
        dispatch(downloadVersion(diagramId, versionId))
    }

    const options: DropdownButtonItem[] = [

        {
            id: "DeploayVersion",
            label: "version.deploy",
            type: "button",
            onClick: () => {
                console.log("deployed Version");
            }
        },
        {
            id: "DownloadVersion",
            label: "version.download",
            type: "button",
            onClick: () => {
                dispatch(downloadVersion(props.diagramId, ));
            }

        },
    ];

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <b>{t("version.version")}</b>
                        </TableCell>
                        <TableCell>
                            <b>{t("properties.comment")}</b>
                        </TableCell>
                        <TableCell>
                            <b>{t("properties.date")}</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.loading
            && (
                <TableRow key="loading" hover>
                    <TableCell colSpan={3} align="center">
                        <>
                            {props.loading ? <CircularProgress color="inherit" size={20} /> : null}
                        </>
                    </TableCell>
                </TableRow>
            )}
                    {props.diagramVersionTOs?.map(singleVersion => (
                        <TableRow
                            key={singleVersion.id}
                            hover
                            onClick={() => openModeler(singleVersion.repositoryId, singleVersion.diagramId, singleVersion.id)}>
                            <TableCell
                                component="th"
                                scope="row">
                                <div>
                                    {singleVersion.milestone}
                                </div>
                            </TableCell>
                            <TableCell>{singleVersion.comment}</TableCell>
                                <TableCell>
                                    <div className={classes.splitCell}>

                                        <div>
                                            {reformatDate(singleVersion.updatedDate)}
                                        </div>
                                        <IconButton size="small" ref={ref} onClick={event => openSettings(event)}>
                                            <MoreVert />
                                        </IconButton>

                                    </div>
                                </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className={classes.versionsButtonClose} onClick={(event => closeVersions(event))}>
                <KeyboardArrowUp />
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
                                            {t(option.label)}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
});
export default VersionDetails
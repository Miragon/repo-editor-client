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
import { ClickAwayListener } from "@material-ui/core";
import { Grow } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { MenuList } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import theme from "../../theme";
import { useRef } from "react";
import { DropdownButtonItem } from "../../components/Form/DropdownButton";

const useStyles = makeStyles(() => ({
    splitCell: {
        display: "flex",
            justifyContent: "space-between"
    },
    popupContainer: {
        zIndex: 1000
    },
    menuItem: {
        color: theme.palette.secondary.contrastText,
        fontSize: theme.typography.button.fontSize,
        fontWeight: theme.typography.button.fontWeight,
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        }
    },
    list: {
        outline: "none"
    },
    popup: {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        backgroundColor: theme.palette.secondary.main,
    },
}));

interface Props {
    diagramVersion: DiagramVersionTO;
}


const VersionItem: React.FC<Props> = ((props: Props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {t, i18n} = useTranslation("common");

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    const ref = useRef<HTMLButtonElement>(null);

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
                dispatch(downloadVersion(props.diagramVersion.diagramId, props.diagramVersion.id));
            }

        },
    ];
    return (
        <>
        <TableRow
            key={props.diagramVersion.id}
            hover
            onClick={() => openModeler(props.diagramVersion.repositoryId, props.diagramVersion.diagramId, props.diagramVersion.id)}>
            <TableCell
                component="th"
                scope="row">
                <div>
                    {props.diagramVersion.milestone}
                </div>
            </TableCell>
            <TableCell>{props.diagramVersion.comment}</TableCell>
            <TableCell>
                <div className={classes.splitCell}>

                    <div>
                        {reformatDate(props.diagramVersion.updatedDate)}
                    </div>
                    <IconButton size="small" ref={ref} onClick={event => openSettings(event)}>
                        <MoreVert />
                    </IconButton>
                </div>
            </TableCell>
        </TableRow>



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
                                    className={classes.menuItem}
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
    )
})
export default VersionItem;
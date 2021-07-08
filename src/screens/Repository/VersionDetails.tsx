import React, {useEffect} from "react";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {KeyboardArrowUp} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
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

    const closeVersions = (event: any): void => {
        event.stopPropagation();
        dispatch({ type: GET_VERSIONS, versions: [] });
    };

    //TODO: Fix Download
    const download = (diagramId: string, versionId: string) => {
        dispatch(downloadVersion(diagramId, versionId))
    }

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
                                <div className={classes.splitCell} >
                                    <div>
                                        {singleVersion.milestone}
                                    </div>
                                    <div>
                                        <IconButton size={"small"} onClick={() => download(singleVersion.diagramId, singleVersion.id)}>
                                            <GetAppIcon/>
                                        </IconButton>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{singleVersion.comment}</TableCell>
                            <TableCell>{reformatDate(singleVersion.updatedDate)}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className={classes.versionsButtonClose} onClick={(event => closeVersions(event))}>
                <KeyboardArrowUp />
            </div>
        </>
    );
});
export default VersionDetails
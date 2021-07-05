import React, {useEffect, useState} from "react";
import {Collapse, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {KeyboardArrowUp} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import {DiagramVersionTO} from "../../api/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {GET_VERSIONS} from "../../store/constants";


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

}));
interface Props {
    diagramId: string;
    loading: boolean;
    diagramVersionTOs: DiagramVersionTO[];
}
const VersionDetails: React.FC<Props> = ((props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();




    useEffect(() => {
        if (props.diagramVersionTOs) {
            props.diagramVersionTOs.sort(compare);
        }
    }, [props.diagramVersionTOs]);

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

    return (
        <>
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
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className={classes.versionsButtonClose} onClick={(event => closeVersions(event))}>
                <KeyboardArrowUp />
            </div>
        </>
    );
});
export default VersionDetails
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import PopupDialog from "../../../components/Form/PopupDialog";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {DeploymentTO} from "../../../api";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    spacer: {
        marginTop: "15px"
    }
}));

interface Props {
    versionId: string;
    milestone: number;
    artifactTitle: string;
    versionComment: string | undefined;
    open: boolean;
    onCancelled: () => void;
    deployments: Array<DeploymentTO>;
}

const DeploymentHistory: React.FC<Props> = props => {
    const classes = useStyles();



    const {t} = useTranslation("common");


    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        props.deployments.sort(compare);
    }, [props.deployments])

    const compare = (a: DeploymentTO, b: DeploymentTO) => {
        if(a.timestamp < b.timestamp) {
            return -1;
        }
        if(a.timestamp > b.timestamp) {
            return 1;
        }
        return 0;
    }


    const reformatDate = (date: string | undefined) => {
        const language = window.localStorage.getItem("language") ? window.localStorage.getItem("language") : "default";
        if(language === "custom") {
            if (date) {
                const standardDate = `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}`
                const time = date.split("T")[1].substring(0, 5);
                return `${standardDate}  |  ${time}`;
            }
        }
        if(language === "default") {
            if(date) {
                const americanDate = `${date.substring(5, 7)}.${date.substring(8, 10)}.${date.substring(0, 4)}`
                const time = date.split("T")[1].substring(0, 5);
                return `${americanDate}  |  ${time}`;
            }
        }
        return "01.01.2000";
    }

    return (
        <PopupDialog
            open={props.open}
            title={t("deployment.history")}
            error={error}
            onCloseError={() => setError(undefined)}
            firstTitle={t("dialog.close")}
            onFirst={props.onCancelled}>
            <p>
                {t("properties.title")}: <b> {props.artifactTitle} </b>
            </p>
            <p>
                {t("properties.comment")}: <b> {props.versionComment} </b>
            </p>
            <div className={classes.spacer}/>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <b>{t("properties.target")}</b>
                        </TableCell>
                        <TableCell>
                            <b>{t("user.user")}</b>
                        </TableCell>
                        <TableCell>
                            <b>{t("properties.date")}</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.deployments?.map(deployment => (
                        <TableRow
                            key={deployment.id}
                            hover >
                            <TableCell
                                component="th"
                                scope="row" >
                                {deployment.target}
                            </TableCell>

                            <TableCell>
                                {deployment.user}
                            </TableCell>
                            <TableCell>
                                {reformatDate(deployment.timestamp)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </PopupDialog>
    );
};

export default DeploymentHistory;
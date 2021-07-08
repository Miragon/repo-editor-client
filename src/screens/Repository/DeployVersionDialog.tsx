import {makeStyles} from "@material-ui/core/styles";
import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import * as diagramAction from "../../store/actions/diagramAction";
import PopupDialog from "../../components/Form/PopupDialog";
import {Input, InputLabel} from "@material-ui/core";
import {deployVersion} from "../../store/actions/deploymentAction";

const useStyles = makeStyles(() => ({
    line: {
        display: "flex",
        flexDirection: "column"
    },
    property: {
        flexBasis: "20px"
    },
    spacer: {
        marginTop: "15px"
    }

}));

interface Props {
    diagramId: string;
    versionId: string;
    open: boolean;
    versionNumber: number;
    onCancelled: () => void
}

const DeployVersionDialog: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation("common");


    const [error, setError] = useState<string | undefined>(undefined);
    const [target, setTarget] = useState<string>("");

    const applyChanges = useCallback(async () => {
        try {
            dispatch(deployVersion(target, props.diagramId, props.versionId));
            props.onCancelled();
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }, [target, props, dispatch]);

    return (
        <PopupDialog
            open={props.open}
            title={t("deployment.DialogHeader", {versionNumber: props.versionNumber})}
            error={error}
            onCloseError={() => setError(undefined)}
            firstTitle={t("dialog.applyChanges")}
            onFirst={applyChanges}
            secondTitle={t("dialog.cancel")}
            onSecond={props.onCancelled}>
            <InputLabel style={{ fontSize: "12px" }} htmlFor="target">{t("properties.target")}</InputLabel>
            <Input
                id="target"
                value={target}
                onChange={event => setTarget(event.target.value)} />
        </PopupDialog>
    );
};

export default DeployVersionDialog;
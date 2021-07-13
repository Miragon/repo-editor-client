import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/styles";
import PopupDialog from "../../components/Form/PopupDialog";
import SettingsForm from "../../components/Form/SettingsForm";
import SettingsTextField from "../../components/Form/SettingsTextField";
import * as versionAction from "../../store/actions/versionAction";
import {DiagramVersionTO, DiagramVersionUploadTOSaveTypeEnum} from "../../api/models";
import {useTranslation} from "react-i18next";
import {getLatestVersion} from "../../store/actions/versionAction";
import {RootState} from "../../store/reducers/rootReducer";
import {UNHANDLEDERROR} from "../../store/constants";

const useStyles = makeStyles(() => ({
    container: {}
}));

interface Props {
    open: boolean;
    onCancelled: () => void;
    onCreated: () => void;
    diagramId: string;
    diagramTitle: string;
}

// #TODO: Get the latest version in order to create a new Release etc.

const CreateVersionDialog: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {t, i18n} = useTranslation("common");

    const latestVersion: DiagramVersionTO | null = useSelector((state: RootState) => state.versions.latestVersion);

    const {
        open, onCancelled, diagramId, diagramTitle
    } = props;

    const [error, setError] = useState<string | undefined>(undefined);
    const [comment, setComment] = useState("");
    const [saveType, setSaveType] = useState<DiagramVersionUploadTOSaveTypeEnum>(
        DiagramVersionUploadTOSaveTypeEnum.MILESTONE
    );

    const onCreate = useCallback(async () => {
        try {
            // #TODO: Use the XML String from the last version
            if(latestVersion){
                await dispatch(versionAction.createOrUpdateVersion(diagramId, latestVersion?.xml, saveType, comment));
                dispatch(versionAction.getAllVersions(diagramId));
                onCancelled();
            } else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Can't load XML of the latest version"})
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }, [diagramId, comment, saveType, dispatch, onCancelled, latestVersion]);



    return (
        <PopupDialog
            className={classes.container}
            error={error}
            onCloseError={() => setError(undefined)}
            open={open}
            title={t("version.dialogHeader", {diagramName: diagramTitle})}
            secondTitle={t("dialog.cancel")}
            onSecond={onCancelled}
            firstTitle={t("dialog.create")}
            onFirst={() => onCreate()}>

            <SettingsForm large>

                <SettingsTextField
                    label={t("properties.comment")}
                    value={comment}
                    multiline
                    rows={2}
                    rowsMax={2}
                    onChanged={setComment} />
            </SettingsForm>

        </PopupDialog>
    );
};

export default CreateVersionDialog;

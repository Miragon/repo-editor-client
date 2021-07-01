import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PopupDialog from "../../components/Form/PopupDialog";
import SettingsForm from "../../components/Form/SettingsForm";
import SettingsTextField from "../../components/Form/SettingsTextField";
import * as versionAction from "../../store/actions/versionAction";
import SettingsSelect from "../../components/Form/SettingsSelect";
import { DiagramVersionUploadTOSaveTypeEnum } from "../../api/models";

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

    const {
        open, onCancelled, diagramId, diagramTitle
    } = props;

    const [error, setError] = useState<string | undefined>(undefined);
    const [comment, setComment] = useState("");
    const [saveType, setSaveType] = useState<DiagramVersionUploadTOSaveTypeEnum>(
        DiagramVersionUploadTOSaveTypeEnum.RELEASE
    );

    const onCreate = useCallback(async () => {
        try {
            // #TODO: Use the XML String from the last version
            await dispatch(versionAction.createOrUpdateVersion(diagramId, "latestversion", saveType, comment));
            dispatch(versionAction.getAllVersions(diagramId));
            onCancelled();
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }, [diagramId, comment, saveType, dispatch, onCancelled]);

    return (
        <PopupDialog
            className={classes.container}
            error={error}
            onCloseError={() => setError(undefined)}
            open={open}
            title={`Create New Version of ${diagramTitle}`}
            secondTitle="Cancel"
            onSecond={onCancelled}
            firstTitle="Create"
            onFirst={() => onCreate()}>

            <SettingsForm large>

                <SettingsSelect
                    value={saveType}
                    label="Type"
                    disabled={false}
                    onChanged={setSaveType}>
                    <MenuItem
                        key={DiagramVersionUploadTOSaveTypeEnum.RELEASE}
                        value={DiagramVersionUploadTOSaveTypeEnum.RELEASE}>
                        {DiagramVersionUploadTOSaveTypeEnum.RELEASE}
                    </MenuItem>
                    <MenuItem
                        key={DiagramVersionUploadTOSaveTypeEnum.MILESTONE}
                        value={DiagramVersionUploadTOSaveTypeEnum.MILESTONE}>
                        {DiagramVersionUploadTOSaveTypeEnum.MILESTONE}
                    </MenuItem>
                </SettingsSelect>

                <SettingsTextField
                    label="Comment"
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

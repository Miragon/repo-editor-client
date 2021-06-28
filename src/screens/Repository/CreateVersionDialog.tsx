import PopupDialog from "../../components/Form/PopupDialog";
import SettingsForm from "../../components/Form/SettingsForm";
import SettingsTextField from "../../components/Form/SettingsTextField";
import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import * as versionAction from "../../store/actions/versionAction";
import SettingsSelect from "../../components/Form/SettingsSelect";
import {BpmnDiagramVersionUploadTOSaveTypeEnum} from "../../api/models";
import {MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    container: {
    }
}));

interface Props {
    open: boolean;
    onCancelled: () => void;
    repoId: string;
    diagramId: string;
    diagramTitle: string;
}
//#TODO: Get the latest version in order to create a new Release etc.

const CreateVersionDialog: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { open, onCancelled, repoId, diagramId, diagramTitle } = props;

    const [error, setError] = useState<string | undefined>(undefined);
    const [comment, setComment] = useState("");
    const [saveType, setSaveType] = useState<BpmnDiagramVersionUploadTOSaveTypeEnum> (BpmnDiagramVersionUploadTOSaveTypeEnum.RELEASE);

    const onCreate = useCallback(async () => {
        try{
            //#TODO: Use the XML String from the last version
            await dispatch(versionAction.createOrUpdateVersion(repoId, diagramId, "latestversion", saveType, comment))
            dispatch(versionAction.getAllVersions(repoId, diagramId))
            onCancelled()
        } catch (err) {
            console.log(err)
        }
    }, [repoId, diagramId, comment, saveType, dispatch])


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
            onFirst={() => onCreate() }>

            <SettingsForm large>

                <SettingsSelect
                    value={saveType}
                    label="Type"
                    disabled={false}
                    onChanged={setSaveType}>
                    <MenuItem
                    key={BpmnDiagramVersionUploadTOSaveTypeEnum.RELEASE}
                    value={BpmnDiagramVersionUploadTOSaveTypeEnum.RELEASE} >
                        {BpmnDiagramVersionUploadTOSaveTypeEnum.RELEASE}
                    </MenuItem>
                    <MenuItem
                    key={BpmnDiagramVersionUploadTOSaveTypeEnum.MILESTONE}
                    value={BpmnDiagramVersionUploadTOSaveTypeEnum.MILESTONE}>
                        {BpmnDiagramVersionUploadTOSaveTypeEnum.MILESTONE}
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
import React, {useCallback, useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import {ArtifactMilestoneUploadTOSaveTypeEnum} from "../api";
import PopupDialog from "../components/Form/PopupDialog";
import SettingsForm from "../components/Form/SettingsForm";
import SettingsTextField from "../components/Form/SettingsTextField";
import {useTranslation} from "react-i18next";
import {createMilestone} from "../store/actions";
import helpers from "../util/helperFunctions";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SYNC_STATUS_MILESTONE} from "../constants/Constants";

interface Props {
    open: boolean;
    onCancelled: () => void;
    type: string;
    file: string;
    comment?: string
    artifactId: string;
}

const SaveAsNewMilestoneDialog: React.FC<Props> = props => {
    const {t} = useTranslation("common");
    const history = useHistory();
    const dispatch = useDispatch();

    const [error, setError] = useState<string | undefined>(undefined);
    const [comment, setComment] = useState<string>(props.comment || "");


    const onCreate = useCallback(() => {
        createMilestone(props.artifactId, props.file, ArtifactMilestoneUploadTOSaveTypeEnum.Milestone, comment).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                helpers.makeSuccessToast(t("action.saved"))
                history.push(`/${props.artifactId}/latest`)
                dispatch({type: SYNC_STATUS_MILESTONE, dataSynced: false})
                setComment("")
                props.onCancelled()
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => onCreate())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => onCreate())
        })
    }, [props, comment, t, history, dispatch])




    return (
        <PopupDialog
            error={error}
            onCloseError={() => setError(undefined)}
            open={props.open}
            title={t("action.saveAsNewMilestone")}
            secondTitle={t("dialog.cancel")}
            onSecond={props.onCancelled}
            firstTitle={t("action.save")}
            onFirst={onCreate} >

            <SettingsForm large>


                <SettingsTextField
                    label={t("properties.comment")}
                    value={comment}
                    multiline
                    rows={3}
                    rowsMax={3}
                    onChanged={setComment}/>

            </SettingsForm>
        </PopupDialog>
    );
};
export default SaveAsNewMilestoneDialog;

import React, {useCallback, useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import {ArtifactVersionUploadTOSaveTypeEnum} from "../api";
import PopupDialog from "../components/Form/PopupDialog";
import SettingsForm from "../components/Form/SettingsForm";
import SettingsTextField from "../components/Form/SettingsTextField";
import {useTranslation} from "react-i18next";
import {createVersion} from "../store/actions";
import helpers from "../util/helperFunctions";
import {useHistory} from "react-router-dom";

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

    const [error, setError] = useState<string | undefined>(undefined);
    const [comment, setComment] = useState<string>(props.comment || "");


    const onCreate = useCallback(() => {
        createVersion(props.artifactId, props.file, ArtifactVersionUploadTOSaveTypeEnum.Milestone, comment).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                helpers.makeSuccessToast(t("save.success"))
                history.push(`/${props.artifactId}/latest`)
                props.onCancelled()
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => onCreate())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => onCreate())
        })
    }, [props, comment, history, t])




    return (
        <PopupDialog
            error={error}
            onCloseError={() => setError(undefined)}
            open={props.open}
            title={t("save.asNewMilestone")}
            secondTitle={t("dialog.cancel")}
            onSecond={props.onCancelled}
            firstTitle={t("save.save")}
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

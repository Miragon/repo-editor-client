import MenuItem from "@material-ui/core/MenuItem";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {ArtifactMilestoneUploadTOSaveTypeEnum, RepositoryTO} from "../api";
import PopupDialog from "../components/Form/PopupDialog";
import SettingsForm from "../components/Form/SettingsForm";
import SettingsSelect from "../components/Form/SettingsSelect";
import SettingsTextField from "../components/Form/SettingsTextField";
import {RootState} from "../store/reducers/rootReducer";
import {useTranslation} from "react-i18next";
import {createArtifact, createMilestone} from "../store/actions";
import helpers from "../util/helperFunctions";
import {useHistory} from "react-router-dom";
import {fetchRepositories} from "../store/actions/repositoryAction";
import {REPOSITORIES, SYNC_STATUS_REPOSITORY} from "../constants/Constants";

interface Props {
    open: boolean;
    onCancelled: () => void;
    type: string;
    file: string;
    repo?: RepositoryTO;
}

const SaveAsNewArtifactDialog: React.FC<Props> = props => {
    const {t} = useTranslation("common");
    const history = useHistory();
    const dispatch = useDispatch();

    const [error, setError] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [repository, setRepository] = useState<string>(props.repo ? props.repo.id : "");


    const allRepos: Array<RepositoryTO> = useSelector((state: RootState) => state.repositories.repositories)
    const repoSynced: boolean = useSelector((state: RootState) => state.dataSynced.repoSynced)


    const fetchRepos = useCallback(() => {
        fetchRepositories().then(response => {
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: REPOSITORIES, repositories: response.data})
                dispatch({type: SYNC_STATUS_REPOSITORY, dataSynced: true})
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchRepos())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchRepos())
        })
    }, [dispatch, t])


    const onCreate = useCallback(async () => {
        setRepository(props.repo ? props.repo.id : "")
        //TODO: Redirect to editor and pass the id of the new Object

        createArtifact(repository, title, description, "FORM")
            .then(response => {
                if (Math.floor(response.status / 100) === 2) {
                    createMilestone(response.data.id, props.file, ArtifactMilestoneUploadTOSaveTypeEnum.Milestone)
                        .then(response2 => {
                            if (Math.floor(response2.status / 100) === 2) {
                                helpers.makeSuccessToast(t("artifact.createdDefault"))
                                setTitle("")
                                setDescription("")
                                setRepository("")
                                props.onCancelled()
                                history.push("/" + response.data.id + "/latest")
                            } else {
                                helpers.makeErrorToast(t(response2.data.toString()), () => createMilestone(response.data.id, props.file, ArtifactMilestoneUploadTOSaveTypeEnum.Milestone))
                            }
                        }, error => {
                            helpers.makeErrorToast(t(error.response.data), () => createMilestone(response.data.id, props.file, ArtifactMilestoneUploadTOSaveTypeEnum.Milestone))
                        })
                } else {
                    helpers.makeErrorToast(t(response.data.toString()), () => onCreate())
                }
            }, error => {
                helpers.makeErrorToast(t(error.response.data), () => onCreate())
            })

    }, [props, repository, title, description, t, history]);

    
    useEffect(() => {
        if(!repoSynced){
            fetchRepos();
        }
    }, [fetchRepos, repoSynced])

    return (
        <PopupDialog
            error={error}
            onCloseError={() => setError(undefined)}
            open={props.open}
            title={t(`artifact.create${props.type}`)}
            secondTitle={t("dialog.cancel")}
            onSecond={props.onCancelled}
            firstTitle={t("dialog.create")}
            onFirst={onCreate} >

            <SettingsForm large>

                <SettingsSelect
                    disabled={false}
                    value={repository}
                    label={t("repository.target")}
                    onChanged={setRepository}>
                    {props.repo
                        ? (
                            <MenuItem
                                key={props.repo?.id}
                                value={props.repo?.id}>
                                {props.repo?.name}
                            </MenuItem>
                        )
                        : allRepos?.map(repo => (
                            <MenuItem
                                key={repo.id}
                                value={repo.id}>
                                {repo.name}
                            </MenuItem>
                        ))}
                </SettingsSelect>

                <SettingsTextField
                    label={t("properties.title")}
                    value={title}
                    onChanged={setTitle}/>

                <SettingsTextField
                    label={t("properties.description")}
                    value={description}
                    multiline
                    rows={3}
                    rowsMax={3}
                    onChanged={setDescription}/>

            </SettingsForm>
        </PopupDialog>
    );
};
export default SaveAsNewArtifactDialog;

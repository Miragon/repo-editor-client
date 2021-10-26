import MenuItem from "@material-ui/core/MenuItem";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {ArtifactMilestoneUploadTOSaveTypeEnum, ArtifactTypeTO, RepositoryTO} from "../api";
import PopupDialog from "../components/Form/PopupDialog";
import SettingsForm from "../components/Form/SettingsForm";
import SettingsSelect from "../components/Form/SettingsSelect";
import SettingsTextField from "../components/Form/SettingsTextField";
import {RootState} from "../store/reducers/rootReducer";
import {useTranslation} from "react-i18next";
import {createArtifact, createMilestone} from "../store/actions";
import {REPOSITORIES, SYNC_STATUS_REPOSITORY} from "../constants/Constants";
import helpers from "../util/helperFunctions";
import {fetchRepositories} from "../store/actions/repositoryAction";
import {useHistory} from "react-router-dom";

interface Props {
    open: boolean;
    onCancelled: () => void;
    type: string;
    repo?: RepositoryTO;
}

const CreateArtifactDialog: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const {t} = useTranslation("common");
    const history = useHistory();

    const [error, setError] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [repository, setRepository] = useState<string>(props.repo ? props.repo.id : "");

    const fileTypes: Array<ArtifactTypeTO> = useSelector((state: RootState) => state.artifacts.fileTypes)
    const allRepos: Array<RepositoryTO> = useSelector((state: RootState) => state.repositories.repositories)
    const repoSynced: Array<RepositoryTO> = useSelector((state: RootState) => state.dataSynced.repoSynced)

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


    const createInitialMilestone = useCallback((artifactId: string) => {
        createMilestone(artifactId, "", ArtifactMilestoneUploadTOSaveTypeEnum.Milestone).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                helpers.makeSuccessToast(t("artifact.created"));
                history.push(`/${artifactId}/latest`)
                window.location.reload()
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => createInitialMilestone(artifactId))
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => createInitialMilestone(artifactId))
        })
    }, [history, t])


    const onCreate = useCallback(async () => {
        setRepository(props.repo ? props.repo.id : "")
        try {
            const defaultFileProps = fileTypes.find(fileType => fileType.name === props.type)
            if(defaultFileProps){
                createArtifact(props.repo?.id ? props.repo.id : repository, title, description, "CONFIGURATION").then(response => {
                    if (Math.floor(response.status / 100) === 2) {
                        createInitialMilestone(response.data.id)
                    } else {
                        helpers.makeErrorToast(t(response.data.toString()), () => onCreate())
                    }

                }, error => {
                    helpers.makeErrorToast(t(error.response.data), () => onCreate())
                })
                setTitle("")
                setDescription("")
                setRepository("")
                props.onCancelled();
            }

        } catch (err) {
            console.log(err);
        }
    }, [props, fileTypes, repository, title, description, createInitialMilestone, t]);


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
                        : allRepos.map(repo => (
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
export default CreateArtifactDialog;

import React, {useCallback, useEffect, useState} from "react";
import PopupDialog from "../../components/Form/PopupDialog";
import SettingsForm from "../../components/Form/SettingsForm";
import SettingsSelect from "../../components/Form/SettingsSelect";
import SettingsTextField from "../../components/Form/SettingsTextField";
import {DiagramTO, DiagramVersionUploadTOSaveTypeEnum, RepositoryTO} from "../../api/models";
import {useDispatch, useSelector} from "react-redux";
import * as diagramAction from "../../store/actions/diagramAction";
import * as versionAction from "../../store/actions/versionAction";
import {DEFAULT_FILE} from "../../store/actions/versionAction";
import MenuItem from "@material-ui/core/MenuItem";
import {RootState} from "../../store/reducers/rootReducer";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    open: boolean;
    onCancelled: () => void;
    type: "bpmn" | "dmn";
    repo?: RepositoryTO;
}

const CreateDiagramDialog: React.FC<Props> = props => {


    const dispatch = useDispatch();
    const [error, setError] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [repository, setRepository] = useState<string>(props.repo ? props.repo.id : "");

    const allRepos: Array<RepositoryTO> = useSelector((state: RootState) => state.repos.repos)
    const createdDiagram: DiagramTO = useSelector((state: RootState) => state.createdDiagram.createdDiagram)

    const onCreate = useCallback(async () => {
        try {
            dispatch(diagramAction.createDiagram(repository, title, description, props.type))
            props.onCancelled();
        } catch (err) {
            console.log(err)
        }
    }, [dispatch, repository, title, description, props])

    useEffect(() => {
        if (createdDiagram) {
            dispatch(versionAction.createOrUpdateVersion(createdDiagram.id, DEFAULT_FILE, DiagramVersionUploadTOSaveTypeEnum.RELEASE))
        }
    }, [createdDiagram, dispatch])

    useEffect(() => {
        setRepository(props.repo?.id)
    }, [props.repo])


    return (
        <PopupDialog
            error={error}
            onCloseError={() => setError(undefined)}
            open={props.open}
            title={`Create ${props.type === "bpmn" ? "BPMN" : "DMN"} Diagram`}
            secondTitle="Cancel"
            onSecond={props.onCancelled}
            firstTitle="Create"
            onFirst={onCreate}>

            <SettingsForm large>

                <SettingsSelect
                    disabled={false}
                    value={props.repo ? props.repo.id : repository}
                    label="Target Repository"
                    onChanged={setRepository}>
                    {props.repo ?
                        <MenuItem
                            key={props.repo?.id}
                            value={props.repo?.id}>
                            {props.repo?.name}
                        </MenuItem>
                        :
                        allRepos?.map(repo => (
                            <MenuItem
                                key={repo.id}
                                value={repo.id}>
                                {repo.name}
                            </MenuItem>
                        ))
                    }
                </SettingsSelect>

                <SettingsTextField
                    label="Title"
                    value={title}
                    onChanged={setTitle}/>

                <SettingsTextField
                    label="Description"
                    value={description}
                    multiline
                    rows={3}
                    rowsMax={3}
                    onChanged={setDescription}/>

            </SettingsForm>
        </PopupDialog>
    );
};
export default CreateDiagramDialog;

import React, {useCallback, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useDispatch, useSelector} from "react-redux";
import emptyTemplate from "./empty_template.json";
import {ArtifactTO, ArtifactMilestoneTO, ArtifactMilestoneUploadTOSaveTypeEnum, UserInfoTO} from "../api";
import MonacoEditor from "react-monaco-editor";
import elementTemplateSchema from "./elementTemplateSchema.json";
import {makeStyles} from "@material-ui/styles";
import * as monacoEditor from "monaco-editor";
import {useTranslation} from "react-i18next";
import {createMilestone, lockArtifact, updateMilestone} from "../store/actions";
import {useHistory} from "react-router-dom";
import {HANDLEDERROR} from "../constants/Constants";
import SaveAsNewArtifactDialog from "./SaveAsNewArtifactDialog";
import SimpleButton from "../components/Form/SimpleButton";
import helpers from "../util/helperFunctions";
import DropdownButton, {DropdownButtonItem} from "../components/Form/DropdownButton";
import SaveAsNewMilestoneDialog from "./SaveAsNewMilestoneDialog";
import {RootState} from "../store/reducers/rootReducer";


const useStyles = makeStyles({
    jsonEditor: {
        width: "100% !important",
        maxWidth: "100% !important",
        position: "inherit",
        border: "1px solid #c8e1ff",
        overflow: "none",
    },
    saveOptions: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: "20px",

    },
    button: {
        minWidth: "180px",
        maxWidth: "180px",
        marginRight: "1rem"
    },
    deployedMilestoneHint: {
        fontStyle: "bold",
        color: "red",
        padding: "10px"
    }
});

interface Props {
    milestone: ArtifactMilestoneTO;
    artifact: ArtifactTO;
}

const Editor: React.FC<Props> = observer(props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation("common");

    const {milestone, artifact} = props

    const [editorContent, setEditorContent] = useState<string>(JSON.stringify(emptyTemplate, null, 4));
    const [saveAsNewArtifactOpen, setSaveAsNewArtifactOpen] = useState<boolean>(false);
    const [saveAsNewMilestoneOpen, setSaveAsNewMilestoneOpen] = useState<boolean>(false);
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const [lockedByUser, setLockedByUser] = useState<string>("");

    //Zwei Checks ausführen: 1. Kann der User die Datei bearbeiten oder hat er nur Read berechtigungen?

    //2. Ist die Datei momentan von einem anderen User gesperrt?

    const currentUser: UserInfoTO = useSelector((state: RootState) => state.users.currentUserInfo)

    /**
     * Options for the jsonEditor
     */

    useEffect(() => {
        //TODO: Auch anzeigen, wenn JSON Format nicht eingehalten werden
        if(milestone){
            try{
                milestone?.file && setEditorContent(JSON.stringify(JSON.parse(milestone.file), null, 4))
            }
            catch (err) {
                console.log(err)
                milestone?.file && setEditorContent(milestone.file)
                dispatch({type: HANDLEDERROR, errorMessage: t("error.formatting")})
            }
        }
    }, [milestone, dispatch, t])

    useEffect(() => {
        if(artifact.lockedUntil && artifact.lockedBy){
            if(Date.parse(artifact.lockedUntil) > Date.now()) {
                artifact.lockedBy === currentUser.username ? setReadOnly(false) : setReadOnly(true)
                setLockedByUser(artifact.lockedBy)
            } else {
                setLockedByUser("")
            }
        } else {
            setLockedByUser("")
        }
    }, [artifact?.lockedBy, artifact.lockedUntil, currentUser.username])



    const jsonEditorOptions : monacoEditor.editor.IStandaloneEditorConstructionOptions = {
        selectOnLineNumbers: true,
        formatOnPaste: true,
        fontSize: 14,
        colorDecorators: true,
        tabCompletion: "on",
        readOnly: readOnly,
        minimap: {
            enabled: false,
        },
        scrollbar: {
            vertical: "hidden",
            alwaysConsumeMouseWheel: false,
            handleMouseWheel: false,
            verticalSliderSize: 0,
            verticalScrollbarSize: 0,
            useShadows: false,
            arrowSize: 0,
        }
    }


    /**
     * Initialize the JSON-Schema
     */
    const editorWillMount = (monaco : typeof monacoEditor) : void => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [{
                uri: "http://myserver/foo-schema.json",
                fileMatch: [elementTemplateSchema.toString()],
                schema: elementTemplateSchema,
            }]
        });
    }

    /**
     * Modify height of monaco-editor depending on the number of lines
     */
    const getHeight = (content : string) : number => {
        if (content === undefined) {
            return 0;
        }
        const nrOfLines = content.split(/\r\n|\r|\n/).length;
        return nrOfLines*23;
    }


    const saveAsNewMilestone = useCallback(() => {
        createMilestone(milestone.artifactId, editorContent, ArtifactMilestoneUploadTOSaveTypeEnum.Milestone).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                helpers.makeSuccessToast(t("action.saved"))
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => saveAsNewMilestone())
            }


        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => saveAsNewMilestone())
        })
        history.push(`/${milestone.artifactId}/latest`)
    }, [editorContent, history, t, milestone.artifactId])



    const update = useCallback(() => {
        updateMilestone(milestone.id, editorContent).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                helpers.makeSuccessToast(t("action.saved"))
                history.push(`/${milestone.artifactId}/${milestone.milestone}`)
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => update())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => update())
        })
    }, [editorContent, history, t, milestone.artifactId, milestone.id, milestone.milestone])


    const lockAndEdit = useCallback(() => {
        //TODO: Uncomment in order to forbid the user to edit the file. Right now the user can choose to save the file as new artifact in the end
        // if(milestone.latestMilestone){
        //    if(milestone.deployments.length > 0){
        //        helpers.makeErrorToast(t("exception.editDeployedMilestone"), () => lockAndEdit())
        //    } else {
        lockArtifact(artifact.id).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setReadOnly(false)
                helpers.makeSuccessToast(t("artifact.locked"))
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => lockAndEdit())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => update())
        })
        //      }
        //  } else {
        //      helpers.makeErrorToast(t("exception.historicalDataAccess"), () => lockAndEdit())
        //  }
            

    }, [artifact.id, t, update])

    const options: Array<DropdownButtonItem> = [
        {
            id: "UpdateMilestone",
            label: t("action.save"),
            type: "button",
            onClick: () => {
                update()
            }
        },
        {
            id: "SaveAsNewMilestone",
            label: t("action.saveAsNewMilestone"),
            type: "button",
            onClick: () => {
                setSaveAsNewMilestoneOpen(true)
            }
        },
        {
            id: "SaveNewMilestone",
            label: t("action.saveAsNewArtifact"),
            type: "button",
            onClick: () => {
                setSaveAsNewArtifactOpen(true)

            }
        }
    ]



    return (
        <>
            <div className={classes.jsonEditor}>
                <MonacoEditor
                    height={getHeight(editorContent)}
                    language="json"
                    width="100%"
                    value={editorContent}
                    options={jsonEditorOptions}
                    onChange={setEditorContent}
                    editorWillMount={editorWillMount} />

            </div>
            <div className={classes.saveOptions}>

                {
                    artifact && milestone ?

                        (
                            readOnly ?
                                (milestone.deployments.length > 0 ?
                                    (
                                        <div>
                                            <div className={classes.deployedMilestoneHint}>
                                                {t("exception.editDeployedMilestone")}
                                            </div>
                                            <DropdownButton
                                                type="default"
                                                title={t("action.save")}
                                                options={options.filter(option => option.id !== "UpdateMilestone")} />
                                        </div>
                                    )
                                    :
                                    (
                                        <SimpleButton
                                            title={t("artifact.edit")}
                                            onClick={lockAndEdit} />
                                    )
                                )



                                :
                                (milestone.deployments.length > 0 ?
                                    (
                                        <div>
                                            <div className={classes.deployedMilestoneHint}>
                                                {t("exception.editDeployedMilestone")}
                                            </div>
                                            <DropdownButton
                                                type="default"
                                                title={t("action.save")}
                                                options={options.filter(option => option.id !== "UpdateMilestone")} />
                                        </div>
                                    )
                                    :
                                    (milestone.latestMilestone ? 
                                        <DropdownButton
                                            type="default"
                                            title={t("action.save")}
                                            options={options} />
                                        :
                                        <DropdownButton
                                            type="default"
                                            title={t("action.save")}
                                            options={options.filter(option => option.id !== "UpdateMilestone")} />
                                    )

                                )
                        )
                        :
                        (
                            <SimpleButton onClick={() => setSaveAsNewArtifactOpen(true)} title={t("action.saveAsNewArtifact")} />
                        )
                }


            </div>


            <SaveAsNewMilestoneDialog
                open={saveAsNewMilestoneOpen}
                onCancelled={() => setSaveAsNewMilestoneOpen(false)}
                type={artifact?.fileType}
                file={editorContent}
                comment={milestone.comment}
                artifactId={artifact.id} />

            <SaveAsNewArtifactDialog
                open={saveAsNewArtifactOpen}
                onCancelled={() => setSaveAsNewArtifactOpen(false)}
                type={artifact?.fileType}
                file={editorContent} />
        </>
    );
});


export default Editor;
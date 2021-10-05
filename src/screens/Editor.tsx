import React, {useCallback, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useDispatch, useSelector} from "react-redux";
import emptyTemplate from "./empty_template.json";
import {ArtifactTO, ArtifactVersionTO, ArtifactVersionUploadTOSaveTypeEnum, UserInfoTO} from "../api";
import MonacoEditor from "react-monaco-editor";
import elementTemplateSchema from "./elementTemplateSchema.json";
import {makeStyles} from "@material-ui/styles";
import * as monacoEditor from "monaco-editor";
import {useTranslation} from "react-i18next";
import {createVersion, lockArtifact, updateVersion} from "../store/actions";
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
    deployedVersionHint: {
        fontStyle: "bold",
        color: "red",
        padding: "10px"
    }
});

interface Props {
    version: ArtifactVersionTO;
    artifact: ArtifactTO;
}

const Editor: React.FC<Props> = observer(props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation("common");

    const {version, artifact} = props

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
        if(version){
            try{
                version?.file && setEditorContent(JSON.stringify(JSON.parse(version.file), null, 4))
            }
            catch (err) {
                console.log(err)
                version?.file && setEditorContent(version.file)
                dispatch({type: HANDLEDERROR, errorMessage: t("error.formatting")})
            }
        }
    }, [version, dispatch, t])

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


    const saveAsNewVersion = useCallback(() => {
        createVersion(version.artifactId, editorContent, ArtifactVersionUploadTOSaveTypeEnum.Milestone).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                helpers.makeSuccessToast(t("save.success"))
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => saveAsNewVersion())
            }


        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => saveAsNewVersion())
        })
        history.push(`/${version.artifactId}/latest`)
    }, [editorContent, history, t, version.artifactId])



    const update = useCallback(() => {
        updateVersion(version.id, editorContent).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                helpers.makeSuccessToast(t("save.success"))
                history.push(`/${version.artifactId}/${version.milestone}`)
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => update())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => update())
        })
    }, [editorContent, history, t, version.artifactId, version.id, version.milestone])


    const lockAndEdit = useCallback(() => {
        //TODO: Uncomment in order to forbid the user to edit the file. Right now the user can choose to save the file as new artifact in the end
        // if(version.latestVersion){
        //    if(version.deployments.length > 0){
        //        helpers.makeErrorToast(t("exception.editDeployedVersion"), () => lockAndEdit())
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
            id: "UpdateVersion",
            label: t("save.save"),
            type: "button",
            onClick: () => {
                update()
            }
        },
        {
            id: "SaveAsNewMilestone",
            label: t("save.asNewMilestone"),
            type: "button",
            onClick: () => {
                setSaveAsNewMilestoneOpen(true)
            }
        },
        {
            id: "SaveNewVersion",
            label: t("save.newArtifact"),
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
                    artifact && version ?

                        (
                            readOnly ?
                                (version.deployments.length > 0 ?
                                    (
                                        <div>
                                            <div className={classes.deployedVersionHint}>
                                                {t("exception.editDeployedVersion")}
                                            </div>
                                            <DropdownButton
                                                type="default"
                                                title={t("save.save")}
                                                options={options.filter(option => option.id !== "UpdateVersion")} />
                                        </div>
                                    )
                                    :
                                    (
                                        <DropdownButton
                                            type="default"
                                            title={t("save.save")}
                                            options={options.filter(option => option.id !== "UpdateVersion")} />
                                    )
                                )



                                :
                                (version.deployments.length > 0 ?
                                    (
                                        <div>
                                            <div className={classes.deployedVersionHint}>
                                                {t("exception.editDeployedVersion")}
                                            </div>
                                            <DropdownButton
                                                type="default"
                                                title={t("save.save")}
                                                options={options.filter(option => option.id !== "UpdateVersion")} />
                                        </div>
                                    )
                                    :
                                    (version.latestVersion ? 
                                        <DropdownButton
                                            type="default"
                                            title={t("save.save")}
                                            options={options} />
                                        :
                                        <DropdownButton
                                            type="default"
                                            title={t("save.save")}
                                            options={options.filter(option => option.id !== "UpdateVersion")} />
                                    )

                                )
                        )
                        :
                        (
                            <SimpleButton onClick={() => setSaveAsNewArtifactOpen(true)} title={t("save.newArtifact")} />
                        )
                }


            </div>


            <SaveAsNewMilestoneDialog
                open={saveAsNewMilestoneOpen}
                onCancelled={() => setSaveAsNewMilestoneOpen(false)}
                type={artifact?.fileType}
                file={editorContent}
                comment={version.comment}
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
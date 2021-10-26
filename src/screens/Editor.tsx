import React, {useCallback, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useDispatch} from "react-redux";
import emptyTemplate from "./empty_template.json";
import {ArtifactMilestoneTO, ArtifactTO} from "../api";
import MonacoEditor from "react-monaco-editor";
import elementTemplateSchema from "./elementTemplateSchema.json";
import {makeStyles} from "@material-ui/styles";
import * as monacoEditor from "monaco-editor";
import {useTranslation} from "react-i18next";
import {lockArtifact, updateMilestone} from "../store/actions";
import {useHistory} from "react-router-dom";
import {HANDLEDERROR} from "../constants/Constants";
import SaveAsNewArtifactDialog from "./SaveAsNewArtifactDialog";
import helpers from "../util/helperFunctions";
import DropdownButton, {DropdownButtonItem} from "../components/Form/DropdownButton";
import SaveAsNewMilestoneDialog from "./SaveAsNewMilestoneDialog";
import {READYTOEDIT, SAVED, SAVEERROR} from "../store/reducers/fileStatusReducer";


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
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
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

let timeout: NodeJS.Timeout | undefined;


const Editor: React.FC<Props> = observer(props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation("common");

    const {milestone, artifact} = props

    const [editorContent, setEditorContent] = useState<string>(JSON.stringify(emptyTemplate, null, 4));
    const [saveAsNewArtifactOpen, setSaveAsNewArtifactOpen] = useState<boolean>(false);
    const [saveAsNewMilestoneOpen, setSaveAsNewMilestoneOpen] = useState<boolean>(false);


    useEffect(() => {
        if(milestone){
            try{
                milestone?.file && setEditorContent(JSON.stringify(JSON.parse(milestone.file), null, 4))
            }
            catch (err) {
                milestone?.file && setEditorContent(milestone.file)
                dispatch({type: HANDLEDERROR, errorMessage: t("error.formatting")})
            }
        }
    }, [milestone, dispatch, t])


    const options: Array<DropdownButtonItem> = [
        {
            id: "UpdateMilestone",
            label: t("action.save"),
            type: "button",
            onClick: () => {
                saveChanges()
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

    const jsonEditorOptions : monacoEditor.editor.IStandaloneEditorConstructionOptions = {
        selectOnLineNumbers: true,
        formatOnPaste: true,
        fontSize: 14,
        colorDecorators: true,
        tabCompletion: "on",
        readOnly: false,
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

    const getHeight = (content : string) : number => {
        if (content === undefined) {
            return 0;
        }
        const nrOfLines = content.split(/\r\n|\r|\n/).length;
        return nrOfLines*23;
    }


    const saveChanges = useCallback(() => {
        updateMilestone(milestone.id, editorContent).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                history.push(`/${milestone.artifactId}/latest`)
                dispatch({type: SAVED})
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => saveChanges())
                dispatch({type: SAVEERROR})
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => saveChanges())
            dispatch({type: SAVEERROR})
        })
    }, [milestone.id, milestone.artifactId, editorContent, history, dispatch, t])


    const lockAndSave = useCallback(() => {
        artifact ?
            lockArtifact(artifact.id).then(response => {
                if (Math.floor(response.status / 100) === 2) {
                    saveChanges()
                    dispatch({type: READYTOEDIT})
                } else {
                    helpers.makeErrorToast(t(response.data.toString()), () => lockAndSave())
                }
            }, error => {
                helpers.makeErrorToast(t(error.response.data), () => lockAndSave())
            })
            :
            console.log("no artifact")
    }, [artifact, dispatch, saveChanges, t])
    


    const onChangeWithTimer = ((content: string) => {
        console.log(content)
        setEditorContent(content);
        if (content !== "") {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => lockAndSave(), 3000);
        }
    });

    return (
        <>
            <div className={classes.jsonEditor}>
                <MonacoEditor
                    height={getHeight(editorContent)}
                    language="json"
                    width="100%"
                    value={editorContent}
                    options={jsonEditorOptions}
                    onChange={content => onChangeWithTimer(content)}
                    editorWillMount={editorWillMount} />

            </div>
            <div className={classes.saveOptions}>
                <div className={classes.buttonContainer}>
                    <DropdownButton
                        type="default"
                        title={t("action.save")}
                        options={options} />
                </div>
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
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useDispatch, useSelector} from "react-redux";
import elementTemplateSchema from "./elementTemplateSchema.json";
import emptyTemplate from "./empty_template.json";
import {ArtifactTO, ArtifactVersionTO, ArtifactVersionUploadTOSaveTypeEnum} from "../api";
import {RootState} from "../store/reducers/rootReducer";
import MonacoEditor from "react-monaco-editor";
import {makeStyles} from "@material-ui/styles";
import * as monacoEditor from "monaco-editor";
import {useTranslation} from "react-i18next";
import {createVersion, updateVersion} from "../store/actions";
import {useHistory} from "react-router-dom";
import {HANDLEDERROR} from "../constants/Constants";
import SaveAsNewArtifactDialog from "./SaveAsNewArtifactDialog";
import DropdownButton, {DropdownButtonItem} from "../components/Form/DropdownButton";
import templateSchema from "./elementTemplateSchema.json";


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
    }
});

const Editor: React.FC = observer(() => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation("common");

    const version: ArtifactVersionTO = useSelector((state: RootState) => state.versions.version)
    const artifact: ArtifactTO = useSelector((state: RootState) => state.artifacts.artifact)

    const [editorContent, setEditorContent] = useState<string>(JSON.stringify(emptyTemplate, null, 4));
    const [saveAsNewArtifactOpen, setSaveAsNewArtifactOpen] = useState<boolean>(false);
    /**
     * Options for the jsonEditor
     */

    useEffect(() => {
        //TODO: Auch anzeigen, wenn JSON Format nicht eingehalten werden
        if(version){
            try{
                console.log("Changing Version")
                version?.file && setEditorContent(JSON.stringify(JSON.parse(version.file), null, 4))
            }
            catch (err) {
                console.log(err)
                version?.file && setEditorContent(version.file)
                dispatch({type: HANDLEDERROR, errorMessage: t("error.formatting")})
            }
        }
    }, [version, dispatch, t])

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

    /**
     * Initialize the JSON-Schema
     */
    const mySchema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Is this a Bug?",
        "type": "object",
        "properties": {
            "fruits": {
                "description": "Start with apple",
                "type": "array",
                "items": [
                    { "$ref": "#/definitions/apple" }
                ],
                "additionalItems": {
                    "$ref": "#/definitions/others"
                },
                "minItems": 1
            }
        },
        "required": [ "fruits" ],


        "definitions": {
            "apple": {
                "type": "object",
                "properties": {
                    "name": { "enum": [ "apple" ] },
                    "price": { "type": "string" },
                },
            },
            "others": {
                "type": "object",
                "oneOf": [
                    { "$ref": "#/definitions/banana" },
                    { "$ref": "#/definitions/orange" },
                ]
            },

            "banana": {
                "type": "object",
                "properties": {
                    "name": { "enum": [ "banana" ] },
                    "price": { "type": "string" },
                },
            },
            "orange": {
                "type": "object",
                "properties": {
                    "name": { "enum": [ "orange" ] },
                    "price": { "type": "string" },
                },
            }
        }
    };

    /**
     * Initialize the JSON-Schema
     */
    const editorWillMount = (monaco : typeof monacoEditor) : void => {
        /*
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [{
                uri: "http://myserver/foo-schema.json",
                fileMatch: ["*"],
                schema: templateSchema,
            }]
        });
*/
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

    const saveVersion = () => {
        dispatch(createVersion(version.artifactId, editorContent, ArtifactVersionUploadTOSaveTypeEnum.Milestone))
        history.push(`/${version.artifactId}/latest`)
    }

    const update = () => {
        dispatch(updateVersion(version.id, editorContent, version.comment));
        history.push(`/${version.artifactId}/latest`)
    }


    const options: Array<DropdownButtonItem> = [
        {
            id: "UpdateVersion",
            label: t("version.save"),
            type: "button",
            onClick: () => {
                update()
            }
        },
        {
            id: "SaveAsNewMilestone",
            label: t("version.saveAsNewMilestone"),
            type: "button",
            onClick: () => {
                saveVersion()
            }
        },
        {
            id: "SaveNewVersion",
            label: t("version.saveAsNewArtifact"),
            type: "button",
            onClick: () => {
                setSaveAsNewArtifactOpen(true)

            }
        }
    ]



    return (
        <>
            <div className={classes.jsonEditor}>
                {version &&
                    <MonacoEditor
                        height={getHeight(editorContent)}
                        language="json"
                        width="100%"
                        value={editorContent}
                        options={jsonEditorOptions}
                        onChange={setEditorContent}
                        editorWillMount={editorWillMount} />
                }

            </div>
            <div className={classes.saveOptions}>

                <DropdownButton
                    type="default"
                    title={t("version.save")}
                    options={options} />
            </div>


            <SaveAsNewArtifactDialog
                open={saveAsNewArtifactOpen}
                onCancelled={() => setSaveAsNewArtifactOpen(false)}
                type={artifact?.fileType}
                file={editorContent} />
        </>
    );
});

export default Editor;
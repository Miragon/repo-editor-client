import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useDispatch, useSelector} from "react-redux";
import elementTemplateSchema from "./elementTemplateSchema.json";
import emptyTemplate from "./empty_template.json";
import {ArtifactVersionTO, ArtifactVersionUploadTOSaveTypeEnum} from "../api";
import {RootState} from "../store/reducers/rootReducer";
import MonacoEditor from "react-monaco-editor";
import {makeStyles} from "@material-ui/styles";
import * as monacoEditor from "monaco-editor";
import SimpleButton from "../components/Form/SimpleButton";
import {useTranslation} from "react-i18next";
import {createOrUpdateVersion} from "../store/actions";


const useStyles = makeStyles({
    jsonEditor: {
        width: "100% !important",
        maxWidth: "1000px !important",
        position: "inherit",
        border: "1px solid #c8e1ff",
        overflow: "none",
    },
    button: {
        marginTop: "20px",
        minWidth: "180px",
        maxWidth: "180px",
        marginRight: "1rem"
    }
});

const Editor: React.FC = observer(() => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const version: ArtifactVersionTO = useSelector((state: RootState) => state.versions.latestVersion)
    const {t} = useTranslation("common");


    const [editorContent, setEditorContent] = useState<string>(JSON.stringify(emptyTemplate, null, 4));

    /**
     * Options for the jsonEditor
     */

    useEffect(() => {
        version?.xml && setEditorContent(JSON.stringify(JSON.parse(version.xml), null, 4))
    }, [version])

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
    const editorWillMount = (monaco : typeof monacoEditor) : void => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [{
                uri: "http://myserver/foo-schema.json",
                fileMatch: ["*"],
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

    const saveVersion = () => {
        dispatch(createOrUpdateVersion(version.artifactId, editorContent, ArtifactVersionUploadTOSaveTypeEnum.Milestone))
    }

    return (
        <>
            <div className={classes.jsonEditor}>
                {version &&
                    <MonacoEditor
                        height={getHeight(editorContent)}
                        language="json"
                        width="960px"
                        value={editorContent}
                        options={jsonEditorOptions}
                        onChange={setEditorContent}
                        editorWillMount={editorWillMount}/>
                }

            </div>
            <SimpleButton
                className={classes.button}
                title={t("version.save")}
                onClick={() => saveVersion()} />
        </>
    );
});

export default Editor;
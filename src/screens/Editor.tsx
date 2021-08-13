import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useDispatch, useSelector} from "react-redux";
import elementTemplateSchema from "./elementTemplateSchema.json";
import emptyTemplate from "./empty_template.json";
import {ArtifactVersionTO} from "../api";
import {RootState} from "../store/reducers/rootReducer";
import MonacoEditor from "react-monaco-editor";
import {makeStyles} from "@material-ui/styles";
import * as monacoEditor from "monaco-editor";



const useStyles = makeStyles({
    jsonEditor: {
        width: "100% !important",
        maxWidth: "1000px !important",
        position: "inherit",
        border: "1px solid #c8e1ff",
        overflow: "none",
    }
});

const Editor: React.FC = observer(() => {
    const classes = useStyles();
    const version: ArtifactVersionTO = useSelector((state: RootState) => state.versions.latestVersion)


    const [editorContent, setEditorContent] = useState<string>(JSON.stringify(emptyTemplate, null, 4));

    /**
     * Options for the jsonEditor
     */

    useEffect(() => {
        console.log(editorContent)
    }, [editorContent])

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
        const nrOfLines = content.split(/\r\n|\r|\n/).length
        return nrOfLines*22;
    }

    return (
        <div className={classes.jsonEditor}>
            <MonacoEditor
                height="800px"
                language="json"
                width="960px"
                value={editorContent}
                options={jsonEditorOptions}
                onChange={setEditorContent}
                editorWillMount={editorWillMount}/>
        </div>
    );
});

export default Editor;
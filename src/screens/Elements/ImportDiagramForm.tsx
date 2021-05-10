import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useStore} from "../../providers/RootStoreProvider";
import {Button, FormControl, FormControlLabel, Input, MenuItem, Radio, RadioGroup, TextField} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            margin: "50px",
            width: '600px',
        },
    },
    formTitle: {
        padding: "15px",
        textAlign: "center",
        fontSize: "20px"
    },
    button: {
        position: "relative",
        top: "40px"
    },
    textField: {
        margin: "10px"
    },
    selection: {
        position: "relative",
        margin: "10px"
    }

}));


const ImportDiagramForm: React.FC = () => {
    const classes = useStyles();
    const store = useStore();

    const [file, setFile] = React.useState('BPMN');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [repoId, setRepoId] = React.useState("");
    const [diagramId, setDiagramId] = React.useState('');
    const [fileString, setFileString] = useState("");

    const [titleError, setTitleError] = useState(false);
    const [titleHelper, setTitleHelper] = useState("");

    const repositories = store.repoStore.getListOfRepoNamesAndIds();

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.value);
    };

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleChangeRepo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepoId(event.target.value);
    };


    const handleSubmit = () => {
        validateTitel;
        if(titleError){
            return;
        }
        store.diagramStore.createNewDiagram(title, description, repoId).then(returnedDiagram => {
            if(returnedDiagram.bpmnDiagramId !=  undefined && returnedDiagram.bpmnDiagramId != ""){
                setDiagramId(returnedDiagram.bpmnDiagramId)

                store.versionStore.importDiagramVersion(repoId, diagramId, fileString).then(() => {
                    window.open(("/modeler/#/" + repoId + "/" + returnedDiagram.bpmnDiagramId + "/latest/"))
                })
            }
        });
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList: FileList | null = event.target?.files;
        if(fileList !== null){
            const file: File = fileList[0];
            file.text().then(stringValue => {
                setFileString(stringValue);
            })
        }

    };

    //#TODO Validation is called after "Title" loses focus, but not after "Repository" loses focus
    const validateTitel = () => {
        const enteredTitle = title;
        setTitleError(false);
        setTitleHelper("");
        if(enteredTitle == ""){
            setTitleHelper("required");
            setTitleError(true);
        }
        if(repoId != ""){
            store.diagramStore.fetchAllDiagrams(repoId).then(bpmnDiagramTO => {
                bpmnDiagramTO.forEach(diagram => {
                    console.log(diagram.bpmnDiagramName);
                    if (diagram.bpmnDiagramName.toUpperCase() === enteredTitle.toUpperCase()) {
                        setTitleError(true);
                        setTitleHelper("Title already in use");
                    }
                });
            })
            }
        }

    return (
        <div>
            <div className={classes.formTitle}>
                Import File
            </div>



            <form className={classes.root} autoComplete="on">
                <FormControl component="fieldset">

                    <Input type="file" color="primary" required={true} onChange={changeHandler}/>

                    <RadioGroup value={file} onChange={handleChangeFile}>
                        <FormControlLabel value="BPMN" control={<Radio color={"primary"} />} label="BPMN" />
                        <FormControlLabel value="DMN" control={<Radio color={"primary"}/>} label="DMN" />
                    </RadioGroup>

                    <TextField error={titleError} helperText={titleHelper} id="diagramName" label="Title" required={true} className={classes.textField} onBlur={validateTitel} variant="outlined" onInput={handleChangeTitle}/>
                    <TextField id="diagramDescription" className={classes.textField} label="Description" variant="outlined" onInput={handleChangeDescription}/>
                    <TextField className={classes.selection}
                               id="outlined-select-currency"
                               select
                               value={repoId}
                               label="Repository"
                               onChange={handleChangeRepo}
                               variant="outlined"
                               onBlur={validateTitel}
                    >
                        {repositories.map((option) => (
                            <MenuItem key={option.repoName} value={option.repoId}>
                                {option.repoName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Create
                    </Button>
                </FormControl>
            </form>


        </div>    );


}

export default ImportDiagramForm;
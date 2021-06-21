import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {BpmnDiagramTO, BpmnRepositoryRequestTO, UserInfoTO} from "../../api/models";
import {RootState} from "../../store/reducers/rootReducer";
import {makeStyles} from "@material-ui/styles";
import DiagramCard from "./Holder/DiagramCard";
import {ErrorBoundary} from "../../components/Exception/ErrorBoundary";
import * as diagramAction from "../../store/actions/diagramAction";

const useStyles = makeStyles(() => ({
    headerText: {
        color: "black",
        fontSize: "20px"
    },
    container: {
        marginTop: "15px"
    },
    resultsContainer: {
        marginTop: "15px",
        display: "flex",
        flexWrap: "wrap"
    },
    card: {
        width: "calc(20%)",
        "&:nth-child(5n)>div": {
            marginRight: 0
        }
    }
}));

let timeout: NodeJS.Timeout | undefined = undefined;

const DiagramSearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const searchedDiagrams: Array<BpmnDiagramTO> = useSelector((state: RootState) => state.searchedDiagrams.searchedDiagrams)
    const repos: Array<BpmnRepositoryRequestTO> = useSelector((state: RootState) => state.repos.repos)


    const [diagram, setDiagram] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<BpmnDiagramTO[]>([]);
    const [displayResult, setDisplayResult] = React.useState<boolean>(false);
    //#TODO: Copy the loading logic from userSearchBar
    //let loading = open && options.length === 0 && diagram != "";
    const loading = false;

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
        if(open) {
            setOptions(searchedDiagrams)
        }
        if(diagram === ""){
            setDisplayResult(false)
        }
    }, [open, searchedDiagrams, diagram, displayResult]);


    const getRepoName = ((repoId: string) => {
        const assignedRepo = repos.find(repo => repo.bpmnRepositoryId === repoId)
        return assignedRepo?.bpmnRepositoryName
    })

    const onChangeWithTimer = ((input: string) => {
        setDiagram(input)
        if(diagram === ""){
            setDisplayResult(false);
        } else {
            setDisplayResult(true);
        }
        if(input != "") {
            if(timeout){
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => fetchDiagramSuggestion(input), 500);
        }
    })

    const fetchDiagramSuggestion = useCallback((input: string) => {
        dispatch(diagramAction.searchDiagram(input))
    }, [dispatch])

    return (
        <>
            <div className={classes.container}>
                <ErrorBoundary>
        <Autocomplete
            id="DiagramSearchBar"
            style={{ width: "100%" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.bpmnDiagramName === value.bpmnDiagramName}
            getOptionLabel={(option) => option.bpmnDiagramName}
            options={options}
            loading={loading}
            onChange={(event, value) => setDiagram(value?.bpmnDiagramName)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Diagram"
                    variant="outlined"
                    onChange={(event) => onChangeWithTimer(event.target.value)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
<div className={classes.resultsContainer}>
                {displayResult && searchedDiagrams?.map(diagram => (
                    <a
                        className={classes.card}
                        key={diagram.bpmnDiagramId}
                        rel="noreferrer"
                        target="_blank"
                        href={`/modeler/#/${diagram.bpmnRepositoryId}/${diagram.bpmnDiagramId}/latest/`}>
                        <DiagramCard
                            diagramRepo={getRepoName(diagram.bpmnRepositoryId)}
                            diagramTitle={diagram.bpmnDiagramName}
                            image={diagram.svgPreview}
                            updatedDate={diagram.updatedDate}
                            description={diagram.bpmnDiagramDescription}
                            repositoryId={diagram.bpmnRepositoryId} />
                    </a>
                ))}
                {searchedDiagrams?.length === 0 && (
                    <span>No Results</span>
                )}
</div>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default DiagramSearchBar;
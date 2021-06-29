import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {DiagramTO, RepositoryTO} from "../../api/models";
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
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    diagramName: {
        color: "black",
        flexGrow: 3
    },
    repoName: {
        color: "lightgrey",
    }
}));

let timeout: NodeJS.Timeout | undefined = undefined;

const DiagramSearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const searchedDiagrams: Array<DiagramTO> = useSelector((state: RootState) => state.searchedDiagrams.searchedDiagrams)
    const repos: Array<RepositoryTO> = useSelector((state: RootState) => state.repos.repos)


    const [diagram, setDiagram] = useState("");
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<DiagramTO[]>([]);
    const [displayResult, setDisplayResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
        if (open) {
            setOptions(searchedDiagrams)
        }
    }, [open, searchedDiagrams, diagram, displayResult]);

    useEffect(() => {
        if (diagram === "") {
            setDisplayResult(false)
            setLoading(false)
        }
    }, [diagram])

    useEffect(() => {
        if (searchedDiagrams.length > 0) {
            setLoading(false)
        }
        // if (searchedDiagrams.)

    }, [searchedDiagrams])

    const getRepoName = ((repoId: string) => {
        const assignedRepo = repos.find(repo => repo.id === repoId)
        return assignedRepo?.name
    })

    const onChangeWithTimer = ((input: string) => {
        setDiagram(input)
        if (diagram === "") {
            setDisplayResult(false);
        } else {
            setDisplayResult(true);
        }
        if (input != "") {
            if (timeout) {
                clearTimeout(timeout);
            }
            setLoading(true)
            timeout = setTimeout(() => fetchDiagramSuggestion(input), 500);
        }
    })

    const fetchDiagramSuggestion = useCallback((input: string) => {
        dispatch(diagramAction.searchDiagram(input))
    }, [dispatch])


    const updateState = (event: any) => {
        setDiagram(event.target.textContent)
    }

//            getOptionLabel={(option) => option.bpmnDiagramName + "  " + <Typography>{getRepoName(option.bpmnRepositoryId)}</Typography>}
    return (
        <>
            <div className={classes.container}>
                <ErrorBoundary>
                    <Autocomplete
                        id="DiagramSearchBar"
                        freeSolo={true}
                        style={{width: "100%"}}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        getOptionSelected={(option, value) => option.name === value.name}
                        getOptionLabel={option => option.name + `  (${getRepoName(option.repositoryId)})`}
                        onChange={updateState}
                        options={options}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search Diagram"
                                variant="outlined"
                                onChange={(event) => onChangeWithTimer(event.target.value)}
                                value={diagram}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {(loading && diagram != "") ?
                                                <CircularProgress color="inherit" size={20}/> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <div className={classes.resultsContainer}>
                        {!loading && searchedDiagrams?.map(diagram => (
                            <a
                                className={classes.card}
                                key={diagram.id}
                                rel="noreferrer"
                                target="_blank"
                                href={`/modeler/#/${diagram.repositoryId}/${diagram.id}/latest/`}>
                                <DiagramCard
                                    diagramRepo={getRepoName(diagram.repositoryId)}
                                    diagramTitle={diagram.name}
                                    image={diagram.svgPreview}
                                    updatedDate={diagram.updatedDate}
                                    description={diagram.description}
                                    repositoryId={diagram.repositoryId}/>
                            </a>
                        ))}
                        {!loading && searchedDiagrams?.length === 0 && (
                            <span>No Results</span>
                        )}
                    </div>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default DiagramSearchBar;




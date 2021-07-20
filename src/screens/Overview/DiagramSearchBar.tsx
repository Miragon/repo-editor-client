import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/styles";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DiagramTO, RepositoryTO} from "../../api/models";
import {ErrorBoundary} from "../../components/Exception/ErrorBoundary";
import * as diagramAction from "../../store/actions/diagramAction";
import {RootState} from "../../store/reducers/rootReducer";
import DiagramCard from "./Holder/DiagramCard";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() => ({
    headerText: {
        color: "black",
        fontSize: "20px"
    },
    container: {
        flexGrow: 1,
        marginRight: "6rem"
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

let timeout: NodeJS.Timeout | undefined;

const DiagramSearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {t} = useTranslation("common");


    const searchedDiagrams: Array<DiagramTO> = useSelector(
        (state: RootState) => state.diagrams.searchedDiagrams
    );
    const repos: Array<RepositoryTO> = useSelector((state: RootState) => state.repos.repos);
    const results: number = useSelector((state: RootState) => state.resultsCount.diagramResultsCount)

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
            setOptions(searchedDiagrams);
        }
    }, [open, searchedDiagrams, diagram, displayResult]);

    useEffect(() => {
        if (diagram === "") {
            setDisplayResult(false);
            setLoading(false);
        }
    }, [diagram]);

    useEffect(() => {
        if (searchedDiagrams.length > 0) {
            setLoading(false);
        }
        if (results === 0) {
            setLoading(false);
        }
    }, [searchedDiagrams, results]);

    const getRepoName = ((repoId: string) => {
        const assignedRepo = repos.find(repo => repo.id === repoId);
        return assignedRepo?.name;
    });

    const onChangeWithTimer = ((input: string) => {
        setDiagram(input);
        if (diagram === "") {
            setDisplayResult(false);
        } else {
            setDisplayResult(true);
        }
        if (input !== "") {
            if (timeout) {
                clearTimeout(timeout);
            }
            setLoading(true);
            timeout = setTimeout(() => fetchDiagramSuggestion(input), 500);
        }
    });

    const fetchDiagramSuggestion = useCallback((input: string) => {
        dispatch(diagramAction.searchDiagram(input));
    }, [dispatch]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateState = (event: any) => {
        setDiagram(event.target.textContent);
    };

    return (
        <>
            <div className={classes.container}>
                <ErrorBoundary>
                    <Autocomplete
                        size="small"
                        id="DiagramSearchBar"
                        freeSolo
                        style={{ width: "100%" }}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        getOptionSelected={(option, value) => option.name === value.name}
                        getOptionLabel={option => `${option.name}  (${getRepoName(option.repositoryId)})`}
                        onChange={updateState}
                        options={options}
                        loading={loading}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={t("search.search")}
                                variant="outlined"
                                onChange={event => onChangeWithTimer(event.target.value)}
                                value={diagram}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {(loading && diagram !== "")
                                                ? (
                                                    <CircularProgress
                                                        color="inherit"
                                                        size={20} />
                                                ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }} />
                        )} />
                    <div className={classes.resultsContainer}>
                        {!loading && searchedDiagrams?.map(searchedDiagram => (
                            <a
                                className={classes.card}
                                key={searchedDiagram.id}
                                rel="noreferrer"
                                target="_blank"
                                href={`/modeler/#/${searchedDiagram.repositoryId}/${searchedDiagram.id}/latest/`}>
                                <DiagramCard
                                    diagramRepo={getRepoName(searchedDiagram.repositoryId)}
                                    diagramTitle={searchedDiagram.name}
                                    image={searchedDiagram.svgPreview}
                                    fileType={searchedDiagram.fileType} />
                            </a>
                        ))}
                        {!loading && searchedDiagrams?.length === 0 && diagram.length > 0 && (
                            <span>{t("search.noResults")}</span>
                        )}
                    </div>
                </ErrorBoundary>
            </div>
        </>
    );
};

export default DiagramSearchBar;

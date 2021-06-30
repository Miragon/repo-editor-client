import { makeStyles } from "@material-ui/styles";
import { observer } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiagramCard from "./Holder/DiagramCard";
import { DiagramTO, RepositoryTO } from "../../api/models";
import * as diagramAction from "../../store/actions/diagramAction";
import { RootState } from "../../store/reducers/rootReducer";
import { ErrorBoundary } from "../../components/Exception/ErrorBoundary";

const useStyles = makeStyles(() => ({
    diagramContainer: {
        "&>h1": {
            color: "black",
            fontSize: "20px",
            fontWeight: "normal"
        }
    },
    container: {
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

const FavoriteDiagrams: React.FC = observer(() => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const favoriteDiagrams: Array<DiagramTO> = useSelector((state: RootState) => state.favoriteDiagrams.favoriteDiagrams);
    const repos: Array<RepositoryTO> = useSelector((state: RootState) => state.repos.repos);

    const fetchFavorite = useCallback(() => {
        try {
            dispatch(diagramAction.fetchFavoriteDiagrams());
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);

    const getRepoName = ((repoId: string) => {
        const assignedRepo = repos.find(repo => repo.id === repoId);
        return assignedRepo?.name;
    });

    useEffect(() => {
        fetchFavorite();
    }, [fetchFavorite]);

    return (
        <div className={classes.diagramContainer}>
            <h1>Favorites</h1>
            <div className={classes.container}>
                <ErrorBoundary>
                    {favoriteDiagrams?.map(diagram => (
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
                                repositoryId={diagram.repositoryId} />
                        </a>
                    ))}
                    {favoriteDiagrams?.length === 0 && (
                        <span>You haven&apos;t added any diagrams to your favorites yet.</span>
                    )}
                </ErrorBoundary>
            </div>
        </div>
    );
});

export default FavoriteDiagrams;

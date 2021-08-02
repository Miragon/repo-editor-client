import {makeStyles} from "@material-ui/styles";
import {observer} from "mobx-react";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ArtifactTO, FileTypesTO, RepositoryTO} from "../../api";
import {ErrorBoundary} from "../../components/Exception/ErrorBoundary";
import * as artifactAction from "../../store/actions/artifactAction";
import {RootState} from "../../store/reducers/rootReducer";
import ArtifactCard from "./Holder/ArtifactCard";
import {useTranslation} from "react-i18next";
import {openFileInTool} from "../../components/Redirect/Redirections";
import {SYNC_STATUS_FAVORITE} from "../../store/constants";

const useStyles = makeStyles(() => ({
    artifactContainer: {
        marginTop: "2rem",
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

const FavoriteArtifacts: React.FC = observer(() => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation("common");


    const favoriteArtifacts: Array<ArtifactTO> = useSelector((state: RootState) => state.artifacts.favoriteArtifacts);
    const repos: Array<RepositoryTO> = useSelector((state: RootState) => state.repos.repos);
    const fileTypes: Array<FileTypesTO> = useSelector((state: RootState) => state.artifacts.fileTypes);
    const syncStatus: boolean = useSelector((state: RootState) => state.dataSynced.favoriteSynced);

    const fetchFavorite = useCallback(() => {
        try {
            dispatch(artifactAction.fetchFavoriteArtifacts());
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);

    useEffect(() => {
        if(!syncStatus){
            fetchFavorite();
            dispatch({type: SYNC_STATUS_FAVORITE, dataSynced: true})
        }
    }, [dispatch, syncStatus, fetchFavorite])

    const getRepoName = ((repoId: string) => {
        const assignedRepo = repos.find(repo => repo.id === repoId);
        return assignedRepo ? assignedRepo.name : "";
    });

    useEffect(() => {
        fetchFavorite();
    }, [fetchFavorite]);

    const openTool = (event: React.MouseEvent<HTMLElement>, fileType: string, repositoryId: string, artifactId: string, versionId?: string) => {
        const urlNamespace = fileTypes.find((type: FileTypesTO) => type.name.toLowerCase() === fileType.toLowerCase())?.url;
        openFileInTool(urlNamespace ? urlNamespace : "", repositoryId, artifactId, t("error.missingTool", {fileType}), versionId)
    }

    return (
        <div className={classes.artifactContainer}>
            <h1>{t("category.favorite")}</h1>
            <div className={classes.container}>
                <ErrorBoundary>
                    {favoriteArtifacts?.map(artifact => (
                        <div
                            className={classes.card}
                            key={artifact.id}
                            onClick={event => openTool(event, artifact.fileType, artifact.repositoryId, artifact.id)}>
                            <ArtifactCard
                                artifactRepo={getRepoName(artifact.repositoryId)}
                                artifactTitle={artifact.name}
                                image={artifact.svgPreview}
                                favorite={true}
                                id={artifact.id}
                                fileType={artifact.fileType} />
                        </div>
                    ))}
                    {favoriteArtifacts?.length === 0 && (
                        <span>{t("category.noFavoritesAvailable")}</span>
                    )}
                </ErrorBoundary>
            </div>
        </div>
    );
});

export default FavoriteArtifacts;

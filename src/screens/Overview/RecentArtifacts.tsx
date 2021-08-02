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
import helpers from "../../constants/Functions";

const useStyles = makeStyles(() => ({
    artifactContainer: {

        marginTop: "1rem",
        "&>h1": {
            color: "black",
            fontSize: "20px",
            fontWeight: "normal"
        }
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
    },
    card: {
        width: "calc(20%)",
        "&:nth-child(5n)>div": {
            marginRight: 0
        }
    }
}));

const RecentArtifacts: React.FC = observer(() => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation("common");


    const recentArtifacts: Array<ArtifactTO> = useSelector(
        (state: RootState) => state.artifacts.recentArtifacts
    );
    const repos: Array<RepositoryTO> = useSelector((state: RootState) => state.repos.repos);
    const syncStatus: boolean = useSelector((state: RootState) => state.dataSynced.recentSynced);
    const fileTypes: Array<FileTypesTO> = useSelector((state: RootState) => state.artifacts.fileTypes);
    const favoriteArtifacts: Array<ArtifactTO> = useSelector((state: RootState) => state.artifacts.favoriteArtifacts);


    const fetchRecent = useCallback(() => {
        try {
            dispatch(artifactAction.fetchRecentArtifacts());
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);

    const getRepoName = ((repoId: string) => {
        const assignedRepo = repos.find(repo => repo.id === repoId);
        return assignedRepo ? assignedRepo.name : "";
    });

    useEffect(() => {
        if (!syncStatus) {
            fetchRecent();
        }
    }, [dispatch, fetchRecent, syncStatus]);

    const openTool = (event: React.MouseEvent<HTMLElement>, fileType: string, repositoryId: string, artifactId: string, versionId?: string) => {
        const urlNamespace = fileTypes.find((types: FileTypesTO) => types.name.toLowerCase() === fileType.toLowerCase())?.url;
        openFileInTool(urlNamespace ? urlNamespace : "", repositoryId, artifactId, t("error.missingTool", {fileType}), versionId)
    }

    return (
        <div className={classes.artifactContainer}>
            <h1>{t("category.recent")}</h1>
            <div className={classes.container}>
                <ErrorBoundary>
                    {recentArtifacts?.map(artifact => (
                        <div
                            className={classes.card}
                            key={artifact.id}
                            onClick={event => openTool(event, artifact.fileType, artifact.repositoryId, artifact.id)}>
                            <ArtifactCard
                                artifactRepo={getRepoName(artifact.repositoryId)}
                                artifactTitle={artifact.name}
                                image={artifact.svgPreview}
                                id={artifact.id}
                                favorite={helpers.isFavorite(artifact.id, favoriteArtifacts?.map(artifact => artifact.id))}
                                fileType={artifact.fileType}/>
                        </div>
                    ))}
                    {recentArtifacts?.length === 0 && (
                        <span>{t("category.recent")}</span>
                    )}
                </ErrorBoundary>
            </div>
        </div>
    );
});

export default RecentArtifacts;

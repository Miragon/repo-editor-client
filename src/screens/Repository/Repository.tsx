import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getSingleRepository} from "../../store/actions";
import CreateDiagramContainer from "./CreateDiagramContainer";
import DiagramDetails from "./DiagramDetails";
import RepositoryDetails from "./RepositoryDetails";
import {RepositoryTO} from "../../api/models";
import {RootState} from "../../store/reducers/rootReducer";

const Repository: React.FC = (() => {
    const dispatch = useDispatch();

    const { repoId } = useParams<{ repoId: string }>();
    const activeRepo: RepositoryTO = useSelector((state: RootState) => state.repos.activeRepo);
    const dataSynced: boolean = useSelector((state: RootState) => state.dataSynced.repoSynced);

    const getRepo = useCallback((repositoryId: string) => {
        dispatch(getSingleRepository(repositoryId));
    }, [dispatch]);


    useEffect(() => {
        getRepo(repoId)
    }, [repoId, getRepo]);

    useEffect(() => {
        if(!dataSynced){
            getRepo(repoId);
        }
    }, [dataSynced, getRepo, repoId])


    return (
        <>
            {(activeRepo && activeRepo.id === repoId) &&
                <div className={"content"}>
                    <RepositoryDetails/>
                    <CreateDiagramContainer/>
                    <DiagramDetails/>
                </div>
            }
        </>
    );
});

export default Repository;

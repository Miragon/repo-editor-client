import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getSingleRepository} from "../../store/actions";
import CreateDiagramContainer from "./CreateDiagramContainer";
import DiagramDetails from "./DiagramDetails";
import RepositoryDetails from "./RepositoryDetails";
import {useHistory} from "react-router-dom";
import {RepositoryTO} from "../../api/models";
import {RootState} from "../../store/reducers/rootReducer";

const Repository: React.FC = (() => {
    const dispatch = useDispatch();
    const history = useHistory();


    const { repoId } = useParams<{ repoId: string }>();
    const activeRepo: RepositoryTO = useSelector((state: RootState) => state.repos.activeRepo);
    const dataSynced: boolean = useSelector((state: RootState) => state.dataSynced.dataSynced);

    const getRepo = useCallback(() => {
        dispatch(getSingleRepository(repoId));
    }, [dispatch, repoId]);


    useEffect(() => {
        if(!activeRepo || !dataSynced || repoId !== activeRepo.id ){
            getRepo();
        }
    }, [getRepo, repoId, dataSynced, activeRepo]);


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

import React, {useCallback, useEffect} from 'react';
import {useDispatch} from "react-redux";
import RepositoryDetails from "./RepositoryDetails";
import DiagramDetails from "./DiagramDetails";
import {useParams} from "react-router";
import {getSingleRepository} from "../../store/actions/repositoryAction";
import CreateDiagramContainer from "./CreateDiagramContainer";


const Repository: React.FC = (() => {
    const dispatch = useDispatch();
    const { repoId } = useParams<{repoId: string}>();


    useEffect(() => {
        getRepo()
    })


    const getRepo = useCallback(() => {
        dispatch(getSingleRepository(repoId))
    }, [dispatch, repoId])


    return (
    <>
        <RepositoryDetails/>
        <CreateDiagramContainer/>
        <DiagramDetails/>
    </>
);
});

export default Repository;
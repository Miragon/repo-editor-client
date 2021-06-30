import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getSingleRepository } from "../../store/actions";
import CreateDiagramContainer from "./CreateDiagramContainer";
import DiagramDetails from "./DiagramDetails";
import RepositoryDetails from "./RepositoryDetails";

const Repository: React.FC = (() => {
    const dispatch = useDispatch();
    const { repoId } = useParams<{ repoId: string }>();

    useEffect(() => {
        getRepo();
    });

    const getRepo = useCallback(() => {
        dispatch(getSingleRepository(repoId));
    }, [dispatch, repoId]);

    return (
        <>
            <RepositoryDetails />
            <CreateDiagramContainer />
            <DiagramDetails />
        </>
    );
});

export default Repository;

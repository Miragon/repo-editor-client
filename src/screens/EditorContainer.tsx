import {observer} from "mobx-react";
import React, {useCallback, useEffect} from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import PathStructure from "../components/Layout/PathStructure";
import {useDispatch} from "react-redux";
import {getLatestVersion} from "../store/actions";
import Editor from "./Editor";


const EditorContainer: React.FC = observer(() => {
    const dispatch = useDispatch();

    const { artifactId } = useParams<{ artifactId: string }>();
    const { versionId } = useParams<{ versionId: string }>();

    useEffect(() => {
        dispatch(getLatestVersion("0bc1cdee-a204-4d8d-a0a2-a601d7af7db4"))
    }, [dispatch, artifactId])



    const element = {
        name: "path.overview",
        link: "/",
    }
    const element2 = {
        name: "path.editor",
        link: `#/editor/${artifactId}`
    }
    const path = [element, element2]


    return (
        <>
            <PathStructure structure={path} />
            <Editor/>
            {artifactId}
        </>
    );
});

export default EditorContainer;

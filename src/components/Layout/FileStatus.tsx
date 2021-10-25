import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {makeStyles} from "@material-ui/styles";
import {Snackbar} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";

const useStyles = makeStyles(() => ({
    info: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "20px",
        alignItems: "center"
    },

}))

const FileStatus: React.FC = props => {
    const {t} = useTranslation("common");


    const { artifactId } = useParams<{ artifactId: string }>();

    const action: () => void = useSelector((state: RootState) => state.fileStatus.action);
    const info: string = useSelector((state: RootState) => state.fileStatus.info);




    return (
        <>
            <Snackbar open={true} message={t(info)} action={action}/>
        </>
    );
}

export default FileStatus
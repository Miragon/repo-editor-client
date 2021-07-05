import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react";
import React, {useState} from "react";
import DropdownButton, {DropdownButtonItem} from "../../components/Form/DropdownButton";
import SimpleButton from "../../components/Form/SimpleButton";
import DiagramSearchBar from "../Overview/DiagramSearchBar";
import CreateDiagramDialog from "./CreateDiagramDialog";
import CreateRepoDialog from "./CreateRepoDialog";
import UploadDiagramDialog from "./UploadDiagramDialog";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "space-between"
    },
    diagramButton: {
        minWidth: "180px"
    },
    repositoryButton: {
        minWidth: "180px",
        marginRight: "1rem"
    }
}));

const RepoContainer: React.FC = observer(() => {
    const classes = useStyles();
    const {t, i18n} = useTranslation("common");
    const [createRepoOpen, setCreateRepoOpen] = useState(false);
    const [uploadDiagramOpen, setUploadDiagramOpen] = useState(false);
    const [createDiagramOpen, setCreateDiagramOpen] = useState(false);
    const [createDiagramType, setCreateDiagramType] = useState<"bpmn" | "dmn">("bpmn");

    const diagramOptions: DropdownButtonItem[] = [
        {
            id: "bpmn",
            label: "diagram.createBpmn",
            type: "button",
            onClick: () => {
                setCreateDiagramOpen(true);
                setCreateDiagramType("bpmn");
            }
        },
        {
            id: "dmn",
            label: "diagram.createDmn",
            type: "button",
            onClick: () => {
                setCreateDiagramOpen(true);
                setCreateDiagramType("dmn");
            }
        },
        {
            id: "divider1",
            type: "divider",
            label: "",
            onClick: () => { /* Do nothing */
            }
        },
        {
            id: "upload",
            label: "diagram.upload",
            type: "button",
            onClick: () => setUploadDiagramOpen(true)
        },
        {
            id: "import",
            label: "diagram.import",
            type: "button",
            // eslint-disable-next-line no-console
            onClick: () => console.log("Import")
        }
    ];

    return (
        <>
            <div className={classes.container}>
                <DiagramSearchBar />
                <div>
                    <SimpleButton
                        className={classes.repositoryButton}
                        title={t("repository.create")}
                        onClick={() => setCreateRepoOpen(true)} />
                    <DropdownButton
                        className={classes.diagramButton}
                        title={t("diagram.create")}
                        options={diagramOptions} />
                </div>
            </div>
            <CreateRepoDialog
                open={createRepoOpen}
                onCreated={() => setCreateRepoOpen(false)}
                onCancelled={() => setCreateRepoOpen(false)} />

            <CreateDiagramDialog
                open={createDiagramOpen}
                type={createDiagramType}
                onCancelled={() => setCreateDiagramOpen(false)} />

            <UploadDiagramDialog
                open={uploadDiagramOpen}
                onCancelled={() => setUploadDiagramOpen(false)} />
        </>
    );
});

export default RepoContainer;

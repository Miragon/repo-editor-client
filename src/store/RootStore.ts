import RepoStore from "./RepoStore";
import DiagramStore from "./DiagramStore";

export default class RootStore{
    repoStore: RepoStore;
    diagramStore: DiagramStore;

    constructor() {
        this.repoStore = new RepoStore();
        this.diagramStore = new DiagramStore();
    }
}
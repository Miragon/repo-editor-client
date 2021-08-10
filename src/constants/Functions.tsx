import {RepositoryTO} from "../api";

const helpers = {
    isNumber: (value: string): boolean => {
        return !isNaN(Number(value));
    },
    isPositiveInt: (value: string): boolean => {
        return /^\d+$/.test(value);
    },
    throwError: (errorMessage: string): boolean => {
        throw new Error(errorMessage);
    },

    getClientConfig: (): Record<string, string> => {
        return {
            // basePath: "",
            //         "headers": {
            //             'Authorization': `${token}`,
            //         }

        };
    },
    isFavorite: (id: string, favoriteArtifactIds: Array<string>): boolean => {
        if(favoriteArtifactIds.includes(id)){
            return true;
        }
        else {
            return false;
        }
    },
    reformatDate: (date: string | undefined): string => {
        const language = window.localStorage.getItem("language") ? window.localStorage.getItem("language") : "default";
        if(language === "custom") {
            if (date) {
                const standardDate = `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}`
                const time = date.split("T")[1].substring(0, 5);
                return `${standardDate} | ${time}`;
            }
        }
        else {
            if(date) {
                const americanDate = `${date.substring(5, 7)}.${date.substring(8, 10)}.${date.substring(0, 4)}`
                const time = date.split("T")[1].substring(0, 5);
                return `${americanDate} | ${time}`;
            }
        }
        return "01.01.2000";
    },

    getRepoName: (repoId: string, repos: Array<RepositoryTO>): string => {
        const assignedRepo = repos.find(repo => repo.id === repoId);
        return assignedRepo ? assignedRepo.name : "";
    }

};

export default helpers;

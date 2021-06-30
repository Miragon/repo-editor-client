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
    }
};

export default helpers;

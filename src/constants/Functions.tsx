const helpers = {
    isNumber: function (value: string): boolean {
        return !isNaN(Number(value));
    },
    isPositiveInt: function (value: string): boolean {
        return /^\d+$/.test(value);
    },
    throwError: function (errorMessage: string): boolean {
        throw new Error(errorMessage);
    },

    getClientConfig: function (): Record<string, string> {
        return {
            // basePath: "",
            //         "headers": {
            //             'Authorization': `${token}`,
            //         }

        };
    }
};

export default helpers;

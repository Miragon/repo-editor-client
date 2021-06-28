const helpers = {
    isNumber: function (value: string) {
        return !isNaN(Number(value))
    },
    isPositiveInt: function (value: string) {
        return /^\d+$/.test(value);
    },
    throwError: function (errorMessage: string) {
        throw new Error(errorMessage);
    },

    getClientConfig: function () {
        return {
            // basePath: "",
            //         "headers": {
            //             'Authorization': `${token}`,
            //         }

        }
    }
}


export default helpers
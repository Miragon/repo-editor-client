class ApiError {
    constructor(
        public errorMessage: string,
        public details: string,
    ) {
    }

    getUserError(): string {
        if (this.errorMessage === "502" || this.errorMessage === "400") {
            return "Ups. Da ist etwas schief gelaufen. 🤭 \nWir beheben den Fehler so schnell wie möglich.";
        }
        if (this.errorMessage === "Network request failed") {
            return "Der Service konnte nicht erreicht werden. Prüfe deine Internetverbindung und versuche es erneut.";
        }
        return this.errorMessage;
    }
}

export default ApiError;

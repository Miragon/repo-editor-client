import React, { ErrorInfo } from "react";

export class ErrorBoundary extends React.Component<unknown, { [key: string]: string }> {
    // eslint-disable-next-line
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: ""
        };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        // Display fallback UI
        this.setState({ hasError: error.message });
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
        console.log(error);
        console.log(info);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <i>Something went wrong. Please reload the page</i>;
        }
        return this.props.children;
    }
}

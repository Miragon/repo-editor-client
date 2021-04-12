import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: {
                main: "#3c91b0"
            },
            secondary: {
                dark: "#DDDDDD",
                main: "#FFFFFF",
                light: "#FFFFFF",
                contrastText: "rgba(0, 0, 0, 0.87)"
            },
            error: {
                main: "#D32F2F"
            },
            success: {
                main: "#388E3C"
            },
            info: {
                main: "#448AFF"
            },
            warning: {
                main: "#F57C00"
            },
            text: {
                primary: "rgba(0, 0, 0, 0.87)",
                secondary: "rgba(0, 0, 0, 0.60)",
                hint: "rgba(0, 0, 0, 0.60)",
                disabled: "rgba(0, 0, 0, 0.38)"
            },
            divider: "#E1E4E8",
            background: {
                default: "#FFFFFF",
                paper: "#F6F8FA"
            },
            type: "light"
        }
    })
);

export default theme;

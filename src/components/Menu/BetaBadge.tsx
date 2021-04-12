import {makeStyles} from "@material-ui/core/styles";
import {default as React} from "react";

const useStyles = makeStyles({
    beta: {
        height: "28px",
        width: "60px",
        textAlign: "center",
        lineHeight: "24px",
        border: "1px solid white",
        borderRadius: "4px",
        color: "white",
        margin: "auto 0rem auto 1rem",
        padding: "0.05rem 0.5rem",
        fontSize: "0.875rem",
        fontWeight: 600
    }
});

const BetaBadge: React.FC = () => {
    const classes = useStyles();

    return (
        <span className={classes.beta}>
            BETA
        </span>
    );
}

export default BetaBadge;

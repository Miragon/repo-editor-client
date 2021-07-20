import React from "react";
import {makeStyles} from "@material-ui/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center"
    },
    icon: {
        marginLeft: "20px",
        paddingTop: "5px"
    }

}));




interface Props {
    structure: Array<{name: string, link: string}>;
}


const PathStructure: React.FC<Props> = props => {
    const classes = useStyles();


    return (
        <>
            {props.structure.map((element, index) => (
                <div className={classes.container} >
                    <div>
                        {element?.name}
                    </div>
                    <div className={classes.icon}>
                        {(index < props.structure.length - 1) ? <ArrowForwardIosIcon fontSize={"small"} /> : null}
                    </div>
                </div>

            ))}

        </>

    );
};

export default PathStructure;
import { makeStyles } from "@material-ui/core";
import React from "react";
import { createTestAttributes } from "../../util/TestUtils";

interface Props {
    growPriority?: number;
    className?: string;
    testId?: string;
}

const useStyles = makeStyles(() => ({
    spacer: (props: Props) => ({
        flexGrow: props.growPriority || 1
    })
}));

const MenuSpacer: React.FC<Props> = props => {
    const classes = useStyles(props);
    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...createTestAttributes(props.testId)}
            className={classes.spacer} />
    );
};

export default MenuSpacer;

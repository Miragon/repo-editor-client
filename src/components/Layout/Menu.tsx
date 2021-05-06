import {makeStyles} from "@material-ui/core/styles";
import {Add} from "@material-ui/icons";
import React from "react";
import {useHistory} from "react-router-dom";
import BetaBadge from "../Menu/BetaBadge";
import MenuBar from "../Menu/MenuBar";
import MenuLogo from "../Menu/MenuLogo";
import AppMenu from "./Menu/AppMenu";
import {Button, Popover} from "@material-ui/core";
import CreateDiagramForm from "../../screens/Elements/CreateDiagramForm";

const useStyles = makeStyles({
    menuComponent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3c91b0",
        paddingLeft: "30px",
        paddingRight: "30px",
    },
    menu: {
        height: "100%",
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "960px",
        margin: "0 auto"
    },
    userIcon: {
        position: "absolute",
        cursor: "pointer",
        right: "5%",
        color: "white",
        height: "28px"
    },
    addButton: {
        position: "absolute",
        cursor: "pointer",
        top: "2%",
        left: "5%",
        color: "white",
        height: "96%",
        width: "200px",
        border: "1px solid white",
        borderRadius: "5px",
        transition: "background-color .3s, color .3s",
        "&:hover": {
            backgroundColor: "white",
            color: "#3c91b0"
        }
    },
    addIcon: {
        width: "50px",
        height: "50px",

    },
    spacer: {
        flexGrow: 1
    }
});

const Menu: React.FC = () => {

    const classes = useStyles();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <MenuBar>

            <AppMenu />


            <div className={classes.menu}>


                <MenuLogo onClick={() => history.push("/")} />

                <BetaBadge />

            </div>


                <div>
                    <Button className={classes.addButton}  onClick={handleClick}>
                        {React.createElement(Add, {
                            className: classes.addIcon
                        })}
                        Create New File
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <CreateDiagramForm/>
                    </Popover>
                </div>
        </MenuBar>

    );
}

export default Menu;


/*
                    <CreateDiagramForm
                        active={true}
                    ></CreateDiagramForm>
 */
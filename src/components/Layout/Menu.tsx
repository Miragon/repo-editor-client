import {IconButton} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Menu as MenuIcon} from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import MenuBar from "../Menu/MenuBar";
import AppMenu from "./Menu/AppMenu";
import Typography from "@material-ui/core/Typography";
import i18next from "i18next";
import DropdownButton, {DropdownButtonItem} from "../Form/DropdownButton";
import {useTranslation} from "react-i18next";
import Flag from "react-world-flags";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        height: "40px",
        margin: "0 auto",
    },
    menuIcon: {
        color: "white"
    },

    menu: {
        display: "flex",
        justifyContent: "space-between",
        transition: theme.transitions.create("padding")
    },
    flagIcon: {
        height: "25px",
        width: "25px",
        marginRight: "10px"
    }
}));

const Menu: React.FC<Props> = props => {
    const classes = useStyles();
    const {t} = useTranslation("common");




    const changeLanguage = (language: string) => {
        window.localStorage.setItem("language", language)
        activateLanguage(language)
    }

    const activateLanguage = (language: string) => {
        i18next.changeLanguage(language);

    }

    const options: DropdownButtonItem[] = [
        {
            id: "English",
            label: "language.english",
            icon: <Flag className={classes.flagIcon} code={"us"}/>,
            type: "button",
            onClick: () => {
                changeLanguage("default")
            }
        },
        {
            id: "German",
            label: t("language.german"),
            icon: <Flag className={classes.flagIcon} code={"de"}/>,
            type: "button",
            onClick: () => {
                changeLanguage("custom");
            }

        }
    ];


    return (
        <>
            <MenuBar className={clsx(classes.menu)}>
                <IconButton
                    disableRipple
                    className={classes.menuIcon}
                    onClick={() => props.setOpen(!props.open)}>
                    <MenuIcon style={{margin: "0 1rem 0 0"}}/>
                    <Typography style={{fontWeight: "bold"}} variant="h6">DigitalWF-</Typography>
                    <Typography style={{fontWeight: "bold"}} color="secondary" variant="h6">Modellverwaltung</Typography>
                </IconButton>
                <DropdownButton title={t("language.select")} options={options} />
            </MenuBar>

            <AppMenu open={props.open}/>
        </>
    );
};

export default Menu;

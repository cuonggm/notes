import styles from "./HeaderComponent.module.css";
import {Link} from "react-router-dom";
import {Fragment} from "react";
import {Layout} from "antd";
import "./HeaderComponent.css"
import LinkComponent from "../LinkComponent/LinkComponent";
import TimeComponent from "../TimeComponent";

const {Header} = Layout;

const HeaderComponent = (props) => {

    const links = props.links;
    return <Fragment>
        <Header className={styles.header}>
            <div className={styles.leftContainer}>
                <Link to="/" className={styles.logo}>
                    Notes
                </Link>
            </div>

            <div className={styles.rightContainer}>
                <TimeComponent/>
                {
                    links.map(link => {
                        console.log("link.autoHide !== undefined: " + (link.autoHide !== undefined).toString());
                        console.log("link.autoHide: " + link.autoHide);
                        if (link.display) {
                            return <LinkComponent
                                key={links.indexOf(link)}
                                label={link.label}
                                to={link.to}
                                onClick={link.onClick}
                                type={link.type}
                                autoHide={link.autoHide !== undefined && link.autoHide === true ? true : false}/>
                        } else {
                            return <Fragment key={links.indexOf(link)}/>
                        }

                    })
                }

            </div>
        </Header>
    </Fragment>
}

export default HeaderComponent;
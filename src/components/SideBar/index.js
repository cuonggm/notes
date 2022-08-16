import styles from "./SideBar.module.css"
import ReactDOM from "react-dom";
import LinkComponent from "../LinkComponent/LinkComponent";
import {Fragment} from "react";
import {Link} from "react-router-dom";

const SideBar = (props) => {
    const links = props.links;

    const onClick = (event) => {
        console.log(event);
        const targetLink = links.filter((link) => {
            return link.label === event.target.innerText;
        })[0];
        if (targetLink.onClick) {
            targetLink.onClick(event);
        }
        props.setSidebar(state => {
            return false;
        })
    }

    return ReactDOM.createPortal(<div className={styles.sidebar}>
        <ul className={styles.list}>
            {links && links.map(link => {
                return (link.display && !link.nonDisplayForSidebar && <li key={links.indexOf(link)}
                >
                    <Link
                        className={`${styles.item} ${link.type === "primary" && styles.primary} ${link.type === "secondary" && styles.secondary} ${link.type === "dark" && styles.dark}`}
                        to={link.to}
                        onClick={onClick}>{link.label}</Link>
                </li>)
            })}
        </ul>

    </div>, document.getElementById("sidebar"))
};

export default SideBar;
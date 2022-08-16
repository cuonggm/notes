import styles from "./LinkComponent.module.css";
import {Link} from "react-router-dom";

const LinkComponent = (props) => {
    const label = props.label;
    const to = props.to;
    const onClick = props.onClick;
    let type = props.type;

    // Setup Type of Link
    if (type === undefined || type === null || type === "primary") {
        type = styles.primaryLink;
    }

    if (type === "secondary") {
        type = styles.secondaryLink;
    }

    if (type === "dark") {
        type = styles.darkLink;
    }

    return <Link
        to={to}
        className={`${type} ${props.autoHide && styles.autoHide}`}
        onClick={onClick}
    >
        {label}
    </Link>
}
export default LinkComponent;
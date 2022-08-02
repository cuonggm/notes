import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";
import { Layout } from "antd";

const { Header } = Layout;

const AppHeader = (props) => {
  return (
    <Header className={styles.header}>
      <div className={styles.leftContainer}>
        <Link to="/" className={styles.headerItem}>
          Home
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <Link to="/login" className={styles.headerItem}>
          Login
        </Link>
      </div>
    </Header>
  );
};

export default AppHeader;

import styles from "./AppName.module.css"
function AppName() {
    let theName = "TODO App";
    return (
        <>
            <h1 className={styles.todoHeading}>{theName}</h1>
        </>
    );
}

export default AppName;
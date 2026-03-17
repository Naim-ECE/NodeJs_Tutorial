import styles from "./Container.module.css"

const Container = ({children}) => {
 return (
    <>
    <div className={styles.doingIt}>{children}</div>
    </>
 )   
}

export default Container;
import styles from "./Customicon.module.css";

function Customicon({src, width ,onClick}){
    return (
        <div className={`${styles.iconContainer}`} style={{width:width}} onClick={onClick}>
            <img src={src} alt="icon" loading="lazy" />
        </div>
    )
}

export default Customicon;


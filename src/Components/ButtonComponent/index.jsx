import styles from "./Button.module.css";

const CustomButton = ({ title, onClick, buttonType, type, classes}) => {
    return (  
        <button
            className={`${styles['custom-button']} ${styles[buttonType]} ${classes || ""}`}
            onClick={onClick}
            type={type}
        >
            { title }
        </button>
    );
};

export default CustomButton;
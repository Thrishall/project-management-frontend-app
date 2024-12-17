import styles from "./modal.module.css";
import ReactDOM from 'react-dom';


function CustomModal({children}) {
    return ReactDOM.createPortal(
        <div className={`d-flex justify-center align-center ${styles['task-modal']}`}>
            {children}
        </div>,
        document.querySelector("#root-modal")
    )
}

export default CustomModal;
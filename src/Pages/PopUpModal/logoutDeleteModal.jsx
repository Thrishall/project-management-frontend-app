import styles from "./logoutmodal.module.css";
import CustomButton from "../../Components/ButtonComponent";

function LogoutDeleteModal({screen , onClick, onCancel , id}){

    return (
        <div className={styles['logout-modal']}>
            {
                screen === "logout" ?
                <p>Are you sure you want to Logout?</p> :
                <p>Are you sure you want to Delete?</p>
            }
            <CustomButton
                title={screen === "logout" ? "Yes,  Logout" : "Yes, Delete"} 
                buttonType='primary' 
                type={'submit'} 
                classes={`${styles['logout']}`}
                onClick={
                    () => {
                        id ? onClick(id) : onClick()
                    }
                }
            />
            <CustomButton
                title={"Cancel"} 
                buttonType='danger'
                classes={`${styles['logout']}`}
                onClick={onCancel}
            />
        </div>
    );
}

export default LogoutDeleteModal;
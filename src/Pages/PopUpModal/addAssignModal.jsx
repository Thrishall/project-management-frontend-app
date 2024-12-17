import { useContext, useState } from "react";
import CustomButton from "../../Components/ButtonComponent";
import InputField from "../../Components/InputComponents";
import styles from "./addAssign.module.css";
import {addEmail} from "../../Services/auth";
import CustomModal from "../../Components/CustomModal";
import { AppContext } from "../../context/userContext";

function AddAssignPeoplePopUp({screen,onCancel}){

    const [email,setEmail] = useState();
    const [error,setError] = useState("");

    const [showModal,setShowModal] = useState(false);

    const {userInfo , setUserInfo} = useContext(AppContext);

    const onAddEmail = async(e) => {
        e.preventDefault()

        if(!email){
            setError("Email is required*")
            return
        }

        try {
            const res = await addEmail({email});
            if (res.status === 201) {
                localStorage.setItem("user",JSON.stringify(res?.data?.data))
                setUserInfo(res?.data?.data)
                setEmail("")
                setError("")
                setShowModal(true)
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(`${error.response.data.message}`);
            } else if(error.response && error.response.status === 404){
                alert(`${error.response.data.message}`)
            }
            else {
                console.error("Error during registration:", error);
                alert("An error occurred during registration. Please try again.");
            }
        }
    }

    return (
        <div className={`d-flex flex-column justify-center align-center ${styles['added-people']}`}>
            
            {
                screen && screen === "assignieConfirmation"
                ? (
                    <>
                        <p>{userInfo?.Assignies[userInfo.Assignies.length - 1]} added to board</p>
                        <CustomButton title={"Okay, got it!"} type={'submit'} buttonType='primary' classes={`${styles['logout']}`} onClick={onCancel}/>
                    </>
                )
                : (
                    <>
                        <h1 className={styles['addPeople-text']}>Add people to the board </h1>
                        <div className={styles['input-section']}>
                            <InputField
                                type={'email'}
                                placeholder={"Enter the email"}
                                name={'email'}
                                value={email || ""}
                                onChange={(e)=>setEmail(e.target.value)}
                                classes={`${styles['add-people']}`}
                            />
                            {
                                error && <p className={styles['error-text']}>{error}</p>
                            }
                        </div>
                        <div className={`d-flex ${styles['btn-section']}`}>
                            <CustomButton title={"Cancel"} buttonType='danger' classes={`${styles['logout']}`} onClick={onCancel} />
                            <CustomButton title={"Add Email"} buttonType='primary' classes={`${styles['logout']}`} onClick={onAddEmail}/>
                        </div>
                    </>
                )
            }
            {
                showModal && 
                <CustomModal>
                    <AddAssignPeoplePopUp screen={'assignieConfirmation'} onCancel={onCancel}/>
                </CustomModal>
            }
        </div>
    );
}

export default AddAssignPeoplePopUp;

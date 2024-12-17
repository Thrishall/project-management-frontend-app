import styles from "./settings.module.css";
import { InputTextField } from "../../../Constant/inputTextField";
import InputField from "../../../Components/InputComponents";
import CustomButton from "../../../Components/ButtonComponent";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../Context/userContext";
import { getUpdatedUser, handleLogout, updateUser } from "../../../Services/auth";
import { useNavigate } from "react-router-dom";

const minLength = 8;
const passwordvalidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

function Settings(){

    const {userInfo,setUserInfo} = useContext(AppContext);

    const navigate = useNavigate()

    const [userData,setUserData] = useState({
        userName: "",
        email: "",
        oldPassword: "",
        newPassword: ""
    })

    const [error, setError] = useState(null);

    const onHandleUpdate = () => {

        if(userData?.newPassword){
            if(userData?.newPassword.length < minLength ){
                setError(`Password must be greater than ${minLength}*`)
                return
            } else if(!passwordvalidation.test(userData?.newPassword)){
                setError("Password must be at least one uppercase letter, one lowercase letter, one number, and one special character*")
                return
            }
        }

        let updateCount = 0;

        if (userData?.userName && userData?.userName !== userInfo?.userName) {
            updateCount++;
        }

        if (userData?.email && userData?.email !== userInfo?.email) {
            updateCount++;
        }

        if (userData?.newPassword) {
            if (!userData?.oldPassword) {
                setError("Please provide the old password to update the password.");
                return;
            } else {
                updateCount++;
            }
        }

        if (updateCount > 1) {
            setError("You can update only one field at a time.");

        } else {
            setError(null);
            updateUser(userData)
                .then((res) => {
                    if(res?.status === 200){
                        alert(`${res?.data?.message}`)
                        return handleLogout();
                    }
                })
                .then((res)=>{
                    if(res?.data?.success){
                        localStorage.removeItem("user")
                        localStorage.removeItem("email")
                        localStorage.removeItem("token")
                        setTimeout(()=>{
                            navigate("/login")
                        },1000)
                    }
                })
                .catch((err) => {
                    alert(`${err?.response?.data?.message}`)
                });
        }

    };

    const onInputChange = (e) => {
        e.preventDefault()
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        })
    }

    const getUserDetails = async() => {
        getUpdatedUser()
        .then((res) => {
            setUserInfo(res?.data?.data)
            setUserData(
                {
                    userName: res?.data?.data?.userName,
                    email: res?.data?.data?.email,
                    oldPassword: "",
                    newPassword: ""
                }
            )
        })
        .catch((err)=>{
            alert(`${err?.data?.message}`)
        })
    }

    useEffect(()=>{
        getUserDetails();
    },[])

    return (
        <div className={styles['setting-section']}>
            <h1>Settings</h1>
            <form action="">
                {
                    InputTextField('update').map((input)=>{
                        return (
                            <div key={input?.id} className={styles['input-form']}>
                                <InputField
                                    type={input?.type}
                                    placeholder={input?.placeholder}
                                    name={input?.name}
                                    value={userData?.[input?.name] || ""}
                                    onChange={onInputChange}
                                    icon={input?.icon}
                                    classes={`${styles['text-size']}`}
                                />
                            </div>
                        )
                    })
                }
            </form>
            <CustomButton
                title={"Update"}
                buttonType={"primary"}
                type={"submit"}
                onClick={onHandleUpdate}
                classes={`${styles['update-btn']}`}
            />         
            {
                error ? <p>{error}</p> : null
            }
        </div>
    );
}

export default Settings;
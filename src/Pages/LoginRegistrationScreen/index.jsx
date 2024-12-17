import styles from "./LoginRegistrationForm.module.css";
import InputField from "../../Components/InputComponents";
import CustomButton from "../../Components/ButtonComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validateForm from "../../Utils/ValidateForm";
import Banner from "../../Assets/Banner.png";
import { inputTextField } from "../../Constant/inputTextField";
import { register,login } from "../../Services/auth";


function LoginRegistrationScreen({screen}){

    const [userData,setUserData] = useState({}); 
    const [errors,setErrors] = useState(null);
    const [viewPassword, setViewPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onInputChange = (e)=>{
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        })
    }

    const submitFormRegister = async(e)=>{
        e.preventDefault()

        if(userData?.confirmPassword !== userData?.password){
            alert("Password and confirm password not matching")
            return
        }

        const {isValid,err} = validateForm(userData,"registration");

        if(!isValid){
            setErrors({...err})
            return

        } else {
            setErrors(null)
            if(isLoading) return;
            setIsLoading(true);

            try {
                const res = await register(userData);
                
                if (res.status === 201) {
                    alert("User Registered successfully");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    alert(`${error.response.data.message}`);
                }else {
                    alert("Something went wrong. Please try again.");
                }
            }
        }
    }

    const submitLogin = async(e)=>{
        e.preventDefault()

        const {isValid,err} = validateForm(userData);

        if(!isValid){
            setErrors({...err})
            return

        } else {
            setErrors(null)
            if(isLoading) return;
            setIsLoading(true);
            
            try {
                const res = await login(userData);            
                if (res.status === 201) {
                    alert("Logged in Successfully");

                    localStorage.setItem("token",`${res?.data?.token}`)
                    localStorage.setItem("user",JSON.stringify(res?.data?.data))
                    
                    setTimeout(() => {
                        navigate("/board")
                    }, 1000);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert(`${error.response.data.message}`);
                } else if(error.response && error.response.status === 404) {
                    alert(`${error.response.data.message}`);
                } else {
                    alert("Something went wrong. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const onViewPassword = () => {
        setViewPassword((prev) => !prev);
    }

    useEffect(()=>{
        setUserData({})
        setErrors(null)
    },[screen])
    
    return (
        <div className={`d-flex ${styles.main}`}>

            <div className={`d-flex flex-column justify-center align-center ${styles.leftSection}`}>

                <div className={styles.bannerContainer}>
                    <img src={Banner} alt="BannerIcon"/>
                    <div className={styles.backImage}></div>
                </div>

                <p className={styles['welcome-text']}>Welcome aboard my friend</p>

                <span>just a couple of clicks and we start</span>

            </div>

            <div className={`d-flex flex-column justify-center align-center ${styles.rightSection}`}>
                {
                    screen && <h1>{screen}</h1>
                }
                <form action="" className={`${styles[`form-field`]}`}>
                    {
                        inputTextField(screen, viewPassword)?.map((input) => {
                            return (
                                <div key={input?.id} className={styles['input-field']}>
                                    <InputField
                                        type={
                                            input?.view
                                            ? viewPassword ? "text" : input?.type
                                            : input?.type
                                        }
                                        placeholder={input?.placeholder}
                                        name={input?.name}
                                        value={userData?.[input?.name] || ""}
                                        onChange={onInputChange}
                                        icon={input?.icon}
                                        endIcon={input?.endIcon}
                                        endIconWidth={"23px"}
                                        onClick={
                                            input?.view
                                            ? onViewPassword
                                            : () => {}
                                        }
                                    />
                                    {
                                        errors?.[input?.name]
                                        ? <p className={styles.error}>{errors?.[input?.name]}</p>
                                        : null
                                    }
                                </div>
                            );
                        })
                    }
                </form>
                
                <CustomButton
                    buttonType='primary'
                    title={ screen==="Register" ? "Register" : "Login"}
                    type={'submit'}
                    onClick={
                        screen === "Register" ? submitFormRegister : submitLogin
                    }
                    disabled={isLoading}
                />

                {
                    screen === "Register" 
                    ? <p>Have an account ?</p>
                    : <p>Have no account yet?</p>
                }

                <CustomButton
                    buttonType='outline'
                    title={screen==="Register" ? "Login" : "Register"}
                    onClick={(e) => {
                        e.preventDefault();
                        screen === "Register" ? navigate("/login") : navigate("/register")
                    }}
                    
                />

            </div>
        </div>
    )
}

export default LoginRegistrationScreen;
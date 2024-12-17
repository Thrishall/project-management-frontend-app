import styles from "./sidebar.module.css";
import { sideMenuList } from "../../Constant/sidebarelement";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomModal from "../CustomModal";
import LogoutDeleteModal from "../../Pages/PopUpModal/logoutDeleteModal";
import { handleLogout } from "../../services/auth";

function SideBar({screen}){

    const navigate = useNavigate();

    const [logoutModal,setLogoutModal] = useState(false)

    const onCancel = () => {
        setLogoutModal(false)
    }

    const onLogout = async() => {

        try {
            const res = await handleLogout();
            if(res?.data?.success){
                localStorage.removeItem("user")
                localStorage.removeItem("email")
                localStorage.removeItem("token")

                navigate("/login")
            }
        } catch(err){
            alert(`Something went wrong please try again later, ${err}`)
        }
    }

    return (
        <div className={styles['side-bar']}>
            {
                sideMenuList.map((menu)=>{
                    const {id,classes,title,icon} = menu || {};
                    return (
                        <div
                            key={id}
                            className={`d-flex ${styles['sidebar-element']} ${styles[classes]}`}
                            onClick={() => {
                                if(id !== "1" && id !== '5'){
                                    navigate(`/${title?.toLowerCase()}`)
                                } else if( id === '5'){
                                    setLogoutModal(true)
                                }
                            }}
                            style={{backgroundColor: screen === title?.toLowerCase() ? "#4391ED1A" : "transparent"}}
                        >
                            <div className={styles.imgContainer}>
                                <img src={icon} alt={`${title}_Icon`} />
                            </div>
                            <p>{title}</p>
                        </div>
                    )
                })
            }
            {
                logoutModal && 
                <CustomModal>
                    <LogoutDeleteModal screen={"logout"} onClick= {onLogout} onCancel={onCancel}/>
                </CustomModal>
            }
        </div>
    );
}

export default SideBar;
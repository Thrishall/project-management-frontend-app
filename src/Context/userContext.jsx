
import { createContext,useEffect,useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{
        const userFromLS = JSON.parse(localStorage.getItem("user"))
        if(userFromLS){
            setUserInfo(userFromLS)
        }
    },[])

    return (
        <AppContext.Provider
            value= {
                {
                    userInfo,
                    setUserInfo
                }
            }
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
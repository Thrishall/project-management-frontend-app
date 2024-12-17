import SideBar from "../../Components/SideBarComponent";
import styles from "./dashboard.module.css";
import Analytics from "./sections/analytics";
import Board from "./sections/board";
import Settings from "./sections/settings";

const visibleSection = {
    board: <Board/>,
    analytics: <Analytics/>,
    settings: <Settings/>,
};

function Dashboard({screen}){

    return (    
        <>
            <div className={`d-flex`}>
                <SideBar screen={screen}/>
                <div className={`d-flex flex-column ${styles['board-section']}`}>
                    {
                        screen
                        ? visibleSection?.[screen]
                        : null
                    }
                </div>
            </div>
        </>

    );
}

export default Dashboard;
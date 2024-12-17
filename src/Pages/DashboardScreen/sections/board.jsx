/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./board.module.css";
import AddPeopleIcon from "../../../Assets/AddpeopleIcon.png";
import {month} from "../../../Constant/currDate";
import DownArrow from "../../../Assets/downArrow.svg";
import {cardElemnt} from "../../../Constant/cardField";
import CardComponent from "../../../Components/CardComponents";
import { useContext, useEffect, useState } from "react";
import CustomModal from "../../../Components/CustomModal";
import AddAssignPeoplePopUp from "../../PopUpModal/addAssignModal";
import {getAllTask, getUpdatedUser} from "../../../Services/auth";
import DropdownBox from "../../../Components/dropDownBox";
import { boardDayFilterOptions } from "../../../Constant/dashboard";
import { AppContext } from "../../../context/userContext";
import { defaultDateFormat } from "../../../Utils/helper";

const Board = ()=>{

    const [addPeopleModal,setAddPeopleModal] = useState(false);
    const [dayDropdownInfo, setDayDropdownInfo] = useState({
        show: false,
        currentDay: "This Week",
    });

    const {userInfo,setUserInfo} = useContext(AppContext);

    const [tasksInfo,setTasksInfo] = useState({
        data: [],
        todo: [],
        backlog: [],
        progress: [],
        done: []
    });

    const onAddPeople = () => {
        setTimeout(()=>{
            setAddPeopleModal(true);
        },1000)
    };

    const onCancel = () => {
        setAddPeopleModal(false);
    };

    const fetchAllTask = async(filter=null) => {
        const payload = {
            filter,
        }
        getAllTask(payload)
        .then((res)=>{
            setTasksInfo({
                data : res?.data?.data,
                todo : res?.data?.data.filter((task)=>task.progress === "TO-DO"),
                progress: res?.data?.data.filter((task)=>task.progress === "PROGRESS"),
                backlog: res?.data?.data.filter((task)=>task.progress === "BACKLOG"),
                done: res?.data?.data.filter((task)=>task.progress === "DONE"),
            });
        })
        .catch((err)=>{
            alert(`${err?.data?.message}`);
        })
    } 

    useEffect(()=>{
        fetchAllTask();
    },[])


    const getUserDetails = async() => {
        getUpdatedUser()
        .then((res) => {
            setUserInfo(res?.data?.data)
        })
        .catch((err)=>{
            alert(`${err?.data?.message}`)
        })
    }

    useEffect(()=>{
        getUserDetails();
    },[])

    
    return (
        <>
            <div className={`d-flex justify-between ${styles.header}`}>
                <div className={`${styles['left-section']}`}>
                    <h1>Welcome! <span>{userInfo?.userName}</span></h1>
                    <div className={`d-flex align-center ${styles['board-text']}`}>
                        <p>Board</p>
                        <div className={`d-flex ${styles['addPeople-section']}`} onClick={onAddPeople}>
                            <div className={styles.addPeopleImgContainer}>
                                <img src={AddPeopleIcon} alt="AddPeopleIcon"/>
                            </div>
                            <p>Add People</p>
                        </div>
                    </div>
                </div>
                <div className={styles['right-section']}>
                    <p>
                        {
                        `${new Date().getDate()}th ${month[new Date().getMonth()]}, ${new Date().getFullYear()}`
                        }
                    </p>
                    <div className={`d-flex ${styles.dropDownConatiner}`}>
                        <p>{dayDropdownInfo?.currentDay}</p>
                        <div
                            className={`cursor-pointer ${styles.downArrow}`}
                            onClick={() => {
                                setDayDropdownInfo((prev) => {
                                    return {
                                        ...prev,
                                        show: !prev?.show,
                                    };
                                })
                            }}
                        >
                            <img src={DownArrow} alt="downArrowIcon" />
                        </div>

                        <DropdownBox
                            optionsList={boardDayFilterOptions}
                            onClick={(title, slug) => {
                                const temp = defaultDateFormat();
                                fetchAllTask({
                                    date:temp,
                                    filterBy: slug,
                                })

                                setDayDropdownInfo({
                                    show: false,
                                    currentDay: title,
                                });
                            }}
                            showDropdownBox={dayDropdownInfo?.show}
                        />
                    </div>
                </div>
            </div>
            <div className={`${styles.board}`}>
                {
                    cardElemnt.map((ele)=>{
                        return (
                            <CardComponent
                                key={ele?.id}
                                type={ele?.type}
                                icon={ele?.icon}
                                slug={ele?.slug}
                                tasklist={tasksInfo?.[ele?.slug]}
                                fetchAllTask={fetchAllTask}
                            />
                        )
                    })
                }
            </div>
            
            {
                addPeopleModal
                ? (
                    <CustomModal>
                        <AddAssignPeoplePopUp screen={'addAssignie'} onCancel={onCancel}/>
                    </CustomModal>
                )
                : null
            }
        </>
    );

}

export default Board;
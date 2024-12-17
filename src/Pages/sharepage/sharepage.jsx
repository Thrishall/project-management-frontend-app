import styles from "./sharepage.module.css";
import promanageIcon from "../../Assets/Promanageicon.png"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleTask } from "../../Services/auth";
import { beautifyDate, compareDates } from "../../Utils/helper";
import { dotColor } from "../../Constant/dashboard";

function ShareTask() {
    const params = useParams();

    const [taskData, setTaskData] = useState({});
    
    useEffect(() => {
        if(params?.id) {
            getSingleTask(params?.id)
            .then((res) => {
                if(res?.status === 201){
                    setTaskData(res?.data?.data)
                }
            })
            .catch((err) => {
                alert(`${err?.data?.message}`)
            })
        }
    }, [params])

    return (
        <div className={styles['share-page-section']}>
            <header className={`d-flex align-center ${styles['header']}`}>
                <div className={styles['imgContainer']}>
                    <img src={promanageIcon} alt={`promanageIcon`} />
                </div>
                <h1>Pro Manage</h1>
            </header>
            <section className={`d-flex justify-center `}>
                <div className={styles['task-section']}>
                    <div className={`d-flex align-center ${styles['priority-section']}`}>
                        <div
                            className={styles['priority-icon']}
                            style={{backgroundColor: dotColor[taskData?.priority]}}
                        >
                        </div>
                        <p>{taskData?.priority}</p>
                    </div>
                    <h1>{taskData?.title}</h1>
                    <p className={`${styles['checklist-text']}`}>
                        Checklist ({taskData?.checkList?.reduce((acc, item) => acc + (item.checked ? 1 : 0), 0)}/{taskData?.checkList?.length})
                    </p>

                    <div className={`${styles['checklist-section']}`}>
                        {
                            taskData?.checkList &&
                            taskData?.checkList.map((item)=>{
                                return (
                                    <div className={`d-flex ${styles['checklists']}`} key={item?._id}>
                                        <input
                                            type="checkbox"
                                            checked = {item?.checked} 
                                            id = {item?._id}
                                            className={styles['check-status']}
                                        />
                                        <label htmlFor={item?._id}>{item?.checklistAdded}</label>
                                    </div>
                                ); 
                            })
                        }
                    </div>
                    
                    {
                        taskData?.dueDate && taskData?.dueDate !== "" 
                        ? (
                            <div className={`d-flex align-center ${styles['due-date-section']}`}>
                                <p>Due Date</p>
                                <div className={styles['due-date']}
                                    style={{
                                        backgroundColor : taskData?.progress === "DONE" 
                                                        ? "#63C05B" 
                                                        : compareDates(taskData?.dueDate) ? "#CF3636" : "#DBDBDB" ,
                                        color : (taskData?.progress === "DONE" || compareDates(taskData?.dueDate)) ? "#FFFFFF" : "#5A5A5A"
                                    }}
                                >
                                    { beautifyDate(taskData?.dueDate) }
                                </div>
                            </div>
                        )
                        : null
                    }
                </div>
            </section>
        </div>
    )
}

export default ShareTask;
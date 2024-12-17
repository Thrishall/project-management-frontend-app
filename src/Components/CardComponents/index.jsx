import styles from "./cardcomponents.module.css";
import collapseIcon from "../../Assets/Collapse.png"
import { useState } from "react";
import CustomModal from "../CustomModal";
import CreateTask from "../../Pages/PopUpModal/createtaskmodal";
import { deleteTask, updateTask } from "../../Services/auth";
import TaskComponent from "./taskComponent";

function CardComponent({ type, icon, tasklist=[], slug, fetchAllTask }){

    const [collapseAllTask, setCollapseAllTask] = useState(null);
    
    const [modalInfo, setModalInfo] = useState({
        visible: false,
        data: null,
    });

    const onClickPlusIcon = (data = null) => {
        setModalInfo({
            visible: true,
            data: data,
        });
    };

    const onCancel = () => {
        setModalInfo({
            visible: false,
            data: null,
        });
    };

    const onUpdateTask = (task, { progressType, checklist }) => {
        const payload = {...task };
        
        if (progressType) {
            payload.progress = progressType;
        } else {
            const tempChecklist = payload?.checkList?.filter((item) => item?._id !== checklist?._id);
            payload.checkList = [...tempChecklist, { ...checklist, checked: !checklist?.checked }];
        }

        updateTask(payload, payload?._id)
        .then((res)=>{
            if (res?.data?.success){
                fetchAllTask();
            }
        })
        .catch((err)=>{
            alert(`${err?.data?.message}`);
        })

    };

    const onDeleteTask = (id) => {
        deleteTask(id)
        .then((res) => {
            if (res?.data?.success){
                alert("Task Successfully Deleted")
                fetchAllTask();
            }
        })
        .catch((err)=>{
            alert(`${err?.data?.message}`)
        })
    }

    return (
        <>
            <div className={`d-flex flex-column ${styles.card}`}>
                <div className={`d-flex align-center ${styles['card-header']}`}>
                    <p>{type}</p>
                    <div className={`d-flex ${styles.iconConatiner}`}>
                        {
                            icon
                            ?  <div className={`${styles.plus}`} onClick={()=>{onClickPlusIcon(null)}}>
                                    <img src={icon} alt="plusIcon" />
                                </div>
                            :null
                        }
                        <div
                            className={`cursor-pointer ${styles.collapseIconConatiner}`}
                            onClick={() => {
                                setCollapseAllTask(false);
                            }}
                        >
                            <img src={collapseIcon} alt="collapse_Icon" />
                        </div>
                    </div>
                </div>

                {
                    tasklist?.map((task)=>{
                        return (
                            <TaskComponent
                                key={task?._id}
                                task={task}
                                slug={slug}
                                onDeleteTask={onDeleteTask}
                                onClickPlusIcon={onClickPlusIcon}
                                onUpdateTask={onUpdateTask}
                                collapseAllTask={collapseAllTask}
                            />
                        );
                    })
                }

            </div>
            {
                modalInfo?.visible
                ?   <CustomModal>
                        <CreateTask
                            onCancel={onCancel}
                            fetchAllTask={fetchAllTask}
                            data={modalInfo?.data}
                        />
                    </CustomModal>
                : null
            }

        </>
    )
}

export default CardComponent;
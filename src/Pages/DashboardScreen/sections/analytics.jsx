import { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import { taskAnalytics } from "../../../Services/auth";

const analyticsleftElement = [
    {
        id:"1",
        title:"Backlog Tasks",
        type: "Backlog"
    },
    {
        id:"2",
        title:"To-do Tasks",
        type: "todo"
    },
    {
        id:"3",
        title:"In-Progress Tasks",
        type : "Progress"
    },
    {
        id:"4",
        title:"Completed Tasks",
        type : "Done"
    }
]

const analyticsRightElement = [
    {
        id:"1",
        title:"Low Priority",
        type: "Low"
    },
    {
        id:"2",
        title:"Moderate Priority",
        type: "Moderate"
    },
    {
        id:"3",
        title:"High Priority",
        type: "High"
    },
    {
        id:"4",
        title:"Due Date Tasks",
        type: "dueDate"
    }
]

const AnalyticElement = ({element, count, dueDateCount}) => {
    return (
        <>
            {
                element.map((ele)=>{
                    return (
                        <div key={ele?.id} className={`d-flex justify-between ${styles['analytics-element']}`}>
                            <div className={`d-flex align-center ${styles['text-conatiner']}`}>
                                <div className={styles.dot}></div>
                                <p>{ele?.title}</p>
                            </div>
                            <p>
                                {
                                    ele?.type === 'dueDate' ? dueDateCount : count?.[ele?.type]
                                }
                            </p>
                        </div>
                    )
                })
            }
        </>
    );
}

const Analytics = () => {

    const [count, setCount] = useState({
        progressCount:{},
        priorityCount:{},
        dueDateCount: ""
    })

    useEffect(()=>{
        taskAnalytics()
        .then((res)=>{
            setCount({
                progressCount: res?.data?.data?.progress,
                priorityCount: res?.data?.data?.priority,
                dueDateCount: res?.data?.data?.dueDate
            })
        })
        .catch((err)=>{
            alert(`${err?.response?.data?.message}`)
        })
    },[])

    return (
        <div className={styles.analytics}>
            <h1>Analytics</h1>
            <div className={`d-flex ${styles.analyticsContainer}`}>

                <div className={styles['left-section']}>
                    <AnalyticElement element={analyticsleftElement} count = {count?.progressCount}/>
                </div>

                <div className={styles['right-section']}>
                    <AnalyticElement element={analyticsRightElement} count = {count?.priorityCount} dueDateCount = {count?.dueDateCount}/>
                </div>

            </div>
        </div>
    );
};

export default Analytics;



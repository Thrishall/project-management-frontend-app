import styles from "./create.module.css";
import InputField from "../../Components/InputComponents";
import deleteIcon from "../../Assets/Delete.png";
import { useContext, useEffect, useRef, useState } from "react";
import plusIcon from "../../Assets/PlusIcon.png";
import CustomButton from "../../Components/ButtonComponent";
import 'react-datepicker/dist/react-datepicker.css';
import { addATask, updateTask } from "../../Services/auth";
import dropDownIcon from "../../Assets/downArrow.svg";
import { AppContext } from "../../Context/userContext";


const radioBtnInputFiled = [
   {
      id:"option1",
      title: "HIGH PRIORITY",
      classes:"high-priority-icon"
   },
   {
      id:"option2",
      title: "MODERATE PRIORITY",
      classes:"moderate-priority-icon"
   },
   {
      id:"option3",
      title: "LOW PRIORITY",
      classes:"low-priority-icon"
   },
]

function CreateTask({ onCancel, fetchAllTask, data }) {
   
   const {userInfo} = useContext(AppContext);

   const [showAssignieDropdown,setShowAssignieDropdown] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const dueDateRef = useRef(null);

   const useDebounce = (func, delay) => {
      const timeoutRef = useRef(null);
   
      return (...args) => {
         clearTimeout(timeoutRef.current);
         timeoutRef.current = setTimeout(() => func(...args), delay);
      };
   };

   const [createTask, setCreateTask] = useState({
      title: "",
      priority: "",
      assignedto: "",
      checkList : [],
      dueDate: "",
   });

   const [checklist, setChecklist]  = useState([]);
   const [error, setError] = useState("");

   const onInputChange = (e, title) => {
      if(e?.target?.name === 'priority') {
         setCreateTask({
            ...createTask,
            "priority": title,
         });
      } else if (e.target.name === "due-date") {
         const date = e?.target?.value?.split("-");
         setCreateTask({
            ...createTask,
            dueDate: `${date[2]}/${date[1]}/${date[0]}`,
         });
      } else {
         setCreateTask({
            ...createTask,
            [e.target.name] : e.target.value
         })
      }
   }

   const AddNewTask = () => {
      setChecklist([
         ...checklist,
         {
            _id: Date.now(),
            checked: false,
            checklistAdded: "",
         },
     ] );
   };

   const onChecklistChange = (id, key, value) => {
      setChecklist((prev) => {
         return prev?.map((item) => item?._id === id ? { ...item, _id: id, [key]: value } : item);
      })
   };

   const onDeleteCheckList = (id) => {
      const remainingList = checklist?.filter((item) => item?._id !== id);
      setChecklist(remainingList);
   };


   const onCreateTask = async(e) => {
      e.preventDefault();

      if(!createTask?.title || !createTask?.priority || checklist.length === 0) {
         setError("Please provide task title, priority and atleast one checklist")
      } else {
         setError("")
         setIsSubmitting(true);
         const payload = {
            ...createTask,
            checkList: [...checklist],
         };
         if(data) {
            updateTask(payload, payload?._id)
            .then((res) => {
               if(res?.data?.success) {
                  alert(res?.data?.message)
                  onCancel();
                  fetchAllTask();
               }
            })
            .catch((err) => {
               alert(err?.response?.data?.message);
            })
         } else {
            try {
               const res = await addATask(payload);
               if (res.status === 201){
                  alert(`${res?.data?.message}`);
                  onCancel();
                  fetchAllTask();
               } else {
                  alert("something went wrong please try again");
               }
            } catch(err){
               alert("Something went wrong please try again", err);
            } finally {
               setIsSubmitting(false);
            }
         }

      }
   };

   const debouncedCreateTask = useDebounce(onCreateTask, 300);

   useEffect(() => {
      if(data) {
         setCreateTask((prev) => {
            return {
               ...prev,
               ...data,
            };   
         });
         setChecklist(data?.checkList || []);
      }
   }, [data])

   return (

        <div className={`d-flex flex-column ${styles['createtask-section']}`}>

            <h1>Title <span className={styles['mandatory-icon']}>*</span></h1>

            <InputField
               type={'text'}
               placeholder={"Enter Task Title"}
               name='title'
               value={createTask?.title}
               onChange={onInputChange}
               classes={`${styles['input-task-field']}`}
            />

            <div className={`d-flex justify-center align-center ${styles['priority-section']}`}>
               <h1>Select Priority <span className={styles['mandatory-icon']}>*</span></h1>
               <div className={`d-flex ${styles['radio-btn-section']}`}>
                  {
                     radioBtnInputFiled.map((btn)=>{
                        return (
                           <div
                              className={styles['radio-btn-conatiner']}
                              key={btn?.id}
                           >
                              <input
                                 type="radio"
                                 name="priority"
                                 id={btn?.id}
                                 checked={createTask?.priority === btn?.title}
                                 onChange={(e) => onInputChange(e, btn?.title)}
                              />
                              <label htmlFor={btn?.id} className={`d-flex align-center ${styles['label']}`}>
                                 <span className={styles[btn?.classes]}></span>
                                 {btn?.title}
                              </label>
                           </div>
                        )
                     })
                  }                  
               </div>         
            </div>

            {
               userInfo?.Assignies?.length > 0
               ? (
                  <div className={`d-flex align-center justify-between ${styles['assign-section']}`}>
                     <h1>Assign to</h1>

                     <div className={`${styles['assign-section-right']}`}>
                        <InputField
                           type={'text'}
                           placeholder={'Add a assignee'}
                           name={"assignedto"}
                           value={createTask?.assignedto || ""}
                           classes={`${styles['add-assignie']}`}
                           onChange={onInputChange}
                           endIcon={dropDownIcon}
                           onClick={() => {
                              setShowAssignieDropdown((prev) => !prev);
                           }}
                        />

                        {
                           showAssignieDropdown 
                           ? <div className={`d-flex flex-column ${styles['assignie-list-section']}`}>
                                 {
                                    userInfo?.Assignies.map( (assignie) => {
                                       return (
                                          <div className={`d-flex align-center justify-between ${styles['assignie-list']}`} key={assignie}>
                                             <div className={`d-flex align-center ${styles['left-section']}`}>
                                                <p className={`d-flex align-center justify-center ${styles['short-name']}`}>
                                                   {assignie.slice(0,2)} 
                                                </p>
                                                <p className={`${styles['email']}`}>{assignie}</p>
                                             </div>
                                             <CustomButton
                                                title={'Assign'}
                                                classes={`${styles['assign-btn']}`}
                                                onClick={() => {
                                                   setCreateTask({
                                                      ...createTask,
                                                      assignedto:assignie
                                                   })
                                                   setShowAssignieDropdown(false);
                                                }}     
                                             />
                                          </div>
                                       );
                                    })
                                 }
                           </div>
                           : null
                        }
                     </div>

                  </div>
               )
               : null
            }
            
            <h1 className={styles['checklist-text']}>
               Checklist ({checklist?.filter((item)=>item?.checked)?.length}/{checklist?.length})
               {" "}
               <span className={styles['mandatory-icon']}>*</span>
            </h1>

            <div className={`d-flex flex-column ${styles['checklist-section']}`}>
               {
                  checklist?.map((item) => {
                     const {_id, checked, checklistAdded} = item;
                     return (
                        <div className={`d-flex align-center ${styles['addChecklist-section']}`} key={_id}>
                           <div className={`d-flex ${styles['input-section']}`}>
                              <input
                                 name={`isChecked_${_id}`}
                                 checked={checked}
                                 type="checkbox"
                                 className={styles['check-box']}
                                 onChange={(e) => onChecklistChange(_id, "checked", e?.target?.checked)}
                              />
                              <input
                                 type="text"
                                 placeholder="Add a task"
                                 name={`checkList_${_id}`}
                                 value={checklistAdded}
                                 className={styles['addtask-section']}
                                 onChange={(e) => onChecklistChange(_id, "checklistAdded", e?.target?.value)}
                              />
                           </div>
                           <div
                              className={`${styles['delete-icon']}`}
                              onClick={() => {
                                 onDeleteCheckList(_id);
                              }}
                           >
                              <img src={deleteIcon} alt="deleteIcon" />
                           </div>
                        </div>
                     );
                  })
               }
            </div>

            <div className={`d-flex align-center ${styles['addNew-text']}`} onClick={AddNewTask}>
               <div className={styles['plus-icon']}>
                   <img src={plusIcon} alt="addIcon"/>
               </div>
               <p>Add New</p>
            </div>

            {
               error && <p className={styles.error}>{error}</p>
            }

            <div className={`d-flex ${styles['footer-section']}`}>
               
               <div className={`${styles['date']}`}>
                  <input
                     type="date"
                     id="due-date"
                     name="due-date"
                     ref={dueDateRef}
                     onChange={onInputChange}
                  />
                  <label
                     htmlFor="due-date"
                     className={`d-flex justify-center align-center cursor-pointer ${styles['due-date']}`}
                     onClick={() => {
                        if(dueDateRef?.current) {
                           dueDateRef?.current?.showPicker();
                        }
                     }}
                  >
                     { createTask?.dueDate || 'Select Due Date' }
                  </label>
               </div>

               <div className={`d-flex ${styles['btn-section']}`}>
                  <CustomButton
                     title="Cancel"
                     buttonType={'danger'}
                     classes={`${styles['cancel']}`}
                     onClick={onCancel}
                  />
                  <CustomButton
                     title="Save"
                     buttonType={'primary'}
                     classes={`${styles['save']}`}
                     type={'submit'}
                     onClick={debouncedCreateTask}
                     disabled={isSubmitting}
                  />
               </div>
            </div>
        </div>
   );
    
}
export default CreateTask;

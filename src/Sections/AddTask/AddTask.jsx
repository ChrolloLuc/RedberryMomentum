import React, {useState, useEffect} from "react"
import styles from "./AddTaskStyles.module.css"
import check from "./../../assets/check.png"
import arrow from "./../../assets/iconDefault.png"
import Select from "react-select";

import Calendar from "./Calendar/Calendar"
import DepartmentEmployee from "./DepartmentEmployee/DepartmentEmployee";

function AddTask() {
    const [statuses, setStatuses] = useState([])
    const [options, setOptions] = useState([]);
    
    
    


    
        useEffect(()=>{
            fetch("https://momentum.redberryinternship.ge/api/statuses" ,{
                headers: {
                    Accept: "application/json",
                    Authorization: ``
                }
            })
            .then(response=>response.json())
            .then(data=>setStatuses(data))
            .then(data=>console.log(data))
            .catch(error=>console.error("fetching error", error))
        }, [])
        
            
    
            useEffect(() => {
                fetch("https://momentum.redberryinternship.ge/api/priorities")
                  .then((res) => res.json())
                  .then((data) => {
                    const formattedOptions = data.map((priority) => ({
                      value: priority.id,
                      label: (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <img src={priority.icon} alt={priority.name} width="20" />
                          {priority.name}
                        </div>
                      ),
                    }));
                    setOptions(formattedOptions);
                  })
                  .catch((err) => console.error("Error fetching priorities:", err));
            }, []);
            const customStyles = {
                control: (provided) => ({
                  ...provided,
                  border: "1px solid #CED4DA",
                  width: "259px",
                  height: "46px",
                  boxShadow: "none",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer", 
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }),
                input: (provided) => ({
                  ...provided,
                  opacity: 0,
                }),
                indicatorSeparator: () => ({
                  display: "none",
                }),
              };
              

  return (
    <>
      <div className={styles.wholeContainer}>
        <h1>შექმენი ახალი დავალება</h1>
        <div className={styles.taskContainer}>
            <div className={styles.leftSide}>
                <div className={styles.titleContainer}>
                    <label>სათაური*</label>
                    <input type="text" className={styles.titleInput}></input>
                    <p><img src={check} alt="check" />მინიმუმ 2 სიმბოლო</p>
                    <p><img src={check} alt="check" />მაქსიმუმ 255 სიმბოლო</p>
                </div>
                <div className={styles.descriptionContainer}>
                    <label>აღწერა</label>
                    <textarea className={styles.descriptionInput} style={{resize:'none'}}></textarea>
                    <p><img src={check} alt="check" />მინიმუმ 2 სიმბოლო</p>
                    <p><img src={check} alt="check" />მაქსიმუმ 255 სიმბოლო</p>
                </div>
                <div className={styles.optionsContainer}>
                    <div className={styles.priorityContainer}>
                        <label>პრიორიტეტი*</label><br/>
                        <Select options={options} styles={customStyles} placeholder=""></Select>
                    </div>
                    <div className={styles.statusContainer}>
                        <label>სტატუსი*</label><br/>
                            <select className={styles.statusInput}>
                                {statuses.map((status)=>(
                                    <option key={status.id}>{status.name}</option>
                                ))}
                            </select>
                    </div>
                </div>
            </div>
            <div className={styles.rightSide}>
                
                                <DepartmentEmployee />
                
                
                <div className={styles.calendarContainer}>
                    <label>დედლაინი</label><br/>
                    <Calendar />
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default AddTask;

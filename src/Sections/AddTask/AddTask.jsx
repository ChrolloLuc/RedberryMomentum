import React, { useState, useEffect } from "react";
import styles from "./AddTaskStyles.module.css";
import check from "./../../assets/check.png";
import arrow from "./../../assets/iconDefault.png";
import Select from "react-select";
import Calendar from "./Calendar/Calendar";
import DepartmentEmployee from "./DepartmentEmployee/DepartmentEmployee";

function AddTask() {
  const [statuses, setStatuses] = useState([]);
  const [options, setOptions] = useState([]);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("")
  const [department, setDepartment] = useState("")
  const [employee, setEmployee] = useState("")
  const [time, setTime] = useState("")


  const handleTaskSubmit = async () => {

    console.log("Submitting task with values:", {
      title,
      description,
      priority,
      status,
      department,
      employee,
      time
    });

    if (!title || !description || !priority || !status || !department || !employee || !time) {
      alert("გთხოვთ შეავსოთ ყველა ველი");
      return;
    }

    const requestBody = {
      name: title, 
      description: description, 
      priority: { id: priority }, 
      status: { id: parseInt(status) }, 
      department: { id: department }, 
      employee: { id: employee }, 
      due_date: time 
    };

    console.log("Formatted Request Body:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch("https://momentum.redberryinternship.ge/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb", 
        },
        body: JSON.stringify(requestBody),
        
      });

      if (response.ok) {
        alert("თანამშრომელი წარმატებით დაემატა");
        onClose(); 
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
        alert("ვერ დაემატა")
      console.error("Error submitting employee:", error);
    }
  }

  

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/statuses", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setStatuses(data))
      // .then((data) => console.log(data))
      .catch((error) => console.error("fetching error", error));
  }, []);

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
              <input type="text" className={styles.titleInput} value={title} onChange={(e)=>setTitle(e.target.value)}></input>
              <p>
                <img src={check} alt="check" />
                მინიმუმ 2 სიმბოლო
              </p>
              <p>
                <img src={check} alt="check" />
                მაქსიმუმ 255 სიმბოლო
              </p>
            </div>
            <div className={styles.descriptionContainer}>
              <label>აღწერა</label>
              <textarea
                className={styles.descriptionInput}
                style={{ resize: "none" }}
                value={description} onChange={(e)=>setDescription(e.target.value)}
              ></textarea>
              <p>
                <img src={check} alt="check" />
                მინიმუმ 2 სიმბოლო
              </p>
              <p>
                <img src={check} alt="check" />
                მაქსიმუმ 255 სიმბოლო
              </p>
            </div>
            <div className={styles.optionsContainer}>
              <div className={styles.priorityContainer}>
                <label>პრიორიტეტი*</label>
                <br />
                <Select
                  options={options}
                  styles={customStyles}
                  placeholder=""
                  onChange={(selectedOption) => setPriority(selectedOption.value)}
                ></Select>
              </div>
              <div className={styles.statusContainer}>
                <label>სტატუსი*</label>
                <br />
                <select className={styles.statusInput} value={status} onChange={(e) => setStatus(e.target.value)}>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className={styles.rightSide}>
            <DepartmentEmployee setEmployee={setEmployee} setDepartment={setDepartment}/>
            <div className={styles.calendarContainer}>
              <label>დედლაინი</label>
              <br />
              <Calendar setTime={setTime}/>
            </div>
                  <button className={styles.taskButton} onClick={handleTaskSubmit}>დავალების შექმნა</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTask;

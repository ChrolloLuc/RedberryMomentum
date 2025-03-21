import React, { useState, useEffect } from "react";
import styles from "./TaskpageStyles.module.css";
import { useParams } from "react-router-dom";
import piechart from "./../../assets/pie-chart.png";
import employee from "./../../assets/employee.png";
import calendar from "./../../assets/calendar.png";

function Taskpage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetch(`https://momentum.redberryinternship.ge/api/tasks/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("task:", data);
        setTask(data);
        setStatus(data.status.id);
      })
      .catch((error) => console.error("error fetching task:", error));
  }, [id]);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/statuses", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb",
      },
    })
      .then((response) => response.json())
      .then((data) => setStatuses(data))
      .catch((error) => console.error("fetching error", error));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const georgianMonths = [
      "იან",
      "თებ",
      "მარ",
      "აპრ",
      "მაი",
      "ივნ",
      "ივლ",
      "აგვ",
      "სექ",
      "ოქტ",
      "ნოე",
      "დეკ",
    ];

    const day = date.getDate();
    const month = georgianMonths[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  if (!task || !statuses.length) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.heading}>
          <div className={styles.priority}>
            <img src={task.priority.icon} alt={task.priority.name} />
            <span>{task.priority.name}</span>
          </div>
          <div className={styles.department}>
            <span>{task.department.name}</span>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1>{task.name}</h1>
          <p>{task.description}</p>
          <div className={styles.comment}>
            <input placeholder="დაწერე კომენტარი" className={styles.inputContainer}></input>
            <button className={styles.addComment}>დააკომენტარე</button>
          </div>
        </div>
        
      </div>
      <div className={styles.details} key={task.id}>
        <h1>დავალების დეტალები</h1>
        <div className={styles.status}>
          <div className={styles.leftsideStatus}>
            <img src={piechart} alt="piechart" />
            <span>სტატუსი</span>
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.employee}>
          <div className={styles.leftsideEmployee}>
            <img src={employee} alt="employee" />
            <span>თანამშრომელი</span>
          </div>
          <div className={styles.employeeContainer}>
            <img src={task.employee.avatar} alt={task.employee.name} />
            <div>
              <p>{task.department.name}</p>
              <p>
                {task.employee.name} {task.employee.surname}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.calendar}>
          <div className={styles.leftsideCalendar}>
            <img src={calendar} alt="calendar" />
            <span>დავალების ვადა</span>
          </div>
          <div>
            <p>{formatDate(task.due_date)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Taskpage;

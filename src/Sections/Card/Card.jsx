import React, { useState, useEffect } from "react";
import styles from "./CardStyles.module.css";
import comment from "./../../assets/Comments.png";
import { useNavigate } from "react-router-dom";

function Card({ statusId }) {
  // 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb\
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/tasks", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("tasks:", data);
        const filteredTasks = data.filter(
          (task) => task.status.id === statusId
        );
        setTasks(filteredTasks);
      })
      .catch((error) => console.error("error fetching priorities:", error));
  }, [statusId]);

  const TruncateText = ({ text, maxLength = 100 }) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return <span>{text.slice(0, maxLength)}...</span>;
    }
  };

  const borderColors = {
    1: "#F7BC30",
    2: "#FB5607",
    3: "#FF006E",
    4: "#3A86FF",
  };

  const statusColors = {
    1: styles.green,
    2: styles.yellow,
    3: styles.red,
  };

  const priorityColors = {
    1: "#08A508",
    2: "#FFBE0B",
    3: "#FA4D4D",
  };

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

  return (
    <>
      {tasks.map((task) => (
        <div
          className={styles.cardContainer}
          key={task.id}
          style={{ borderColor: borderColors[task.status.id] }}
          onClick={() => navigate(`/task/${task.id}`)}
        >
          <div className={styles.upperContainer}>
            <div className={styles.leftSide}>
              <span
                className={`${styles.priority} ${
                  statusColors[task.priority.id]
                }`}
                style={{ color: priorityColors[task.priority.id] }}
              >
                <img
                  src={task.priority.icon}
                  alt={task.priority}
                  className={styles.priorityIcon}
                />
                {task.priority.name}
              </span>
              <span className={styles.department}>{task.department.name}</span>
            </div>
            <div className={styles.rightSide}>
              <span>{formatDate(task.due_date)}</span>
            </div>
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.heading}>{task.name}</h1>
            <TruncateText text={task.description} maxLength={100} />
          </div>
          <div className={styles.bottom}>
            <img
              src={task.employee.avatar}
              alt=""
              className={styles.employeePicture}
            ></img>
            <div>
              <img src={comment} alt="comment"></img>
              <span>{task.total_comments}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Card;

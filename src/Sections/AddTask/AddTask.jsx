import React, {useState} from "react"
import styles from "./AddTaskStyles.module.css"
import check from "./../../assets/check.png"
import arrow from "./../../assets/iconDefault.png"

import Calendar from "./Calendar/Calendar"

function AddTask() {
    

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
                        <select>
                            <option value="1">1</option>
                        </select>
                    </div>
                    <div className={styles.statusContainer}>
                        <label>სტატუსი*</label><br/>
                            <select>

                            </select>
                    </div>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.departmentContainer}>
                    <label>დეპარტამენტი*</label><br/>
                    <input></input>
                </div>
                <div className={styles.employeeContainer}>
                    <label>პასუხისმგებლიანი თანამშრომელი*</label><br/>
                    <input></input>
                </div>
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

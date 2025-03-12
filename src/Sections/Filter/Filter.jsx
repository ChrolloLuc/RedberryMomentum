import React from 'react'
import styles from "./FilterStyles.module.css"
import iconDefault from "./../../assets/iconDefault.png"

function Filter() {
  return (
    <>
        <div className={styles.title}>
            <h1>დავალებების გვერდი</h1>
        </div>

        <div className={styles.filterContainer}>
            <div className={styles.departmentContainer}>
                <button className={styles.departmentButton}>დეპარტამენტი <img src={iconDefault} alt='iconDefault'></img></button>
            </div>
            <div className={styles.priorityContainer}>
                <button className={styles.priorityButton}>პრიორიტეტი <img src={iconDefault} alt='iconDefault'></img></button>
            </div>
            <div className={styles.employeeContainer}>
                <button className={styles.employeeButton}>თანამშრომელი <img src={iconDefault} alt='iconDefault'></img></button>
            </div>
            
        </div>
    </>
  )
}

export default Filter
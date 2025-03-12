import React from 'react'
import styles from "./NavbarStyles.module.css"
import hourglass from "./../../assets/Hourglass.png"

function Navbar() {
  return (
    <>
        <div className={styles.navbarContainer}>
            <div className={styles.logo}>
                <h1>Momentum</h1>
                <img src={hourglass} alt='hourglass'></img>
            </div>
            <div className={styles.buttons}>
                <button className={styles.employeeButton}>თანამშრომლის შექმნა</button>
                <button className={styles.taskButton}> + შექმენი ახალი დავალება</button>
            </div>
        </div>
    </>
  )
}

export default Navbar
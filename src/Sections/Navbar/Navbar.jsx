import React, { useState } from 'react'
import styles from "./NavbarStyles.module.css"
import hourglass from "./../../assets/Hourglass.png"
import Modal from '../Modal/Modal'

function Navbar() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () =>{
    setIsModalOpen(true)
  }

  const closeModal = () =>{
    setIsModalOpen(false)
  }

  return (
    <>
        <div className={styles.navbarContainer}>
            <div className={styles.logo}>
                <h1>Momentum</h1>
                <img src={hourglass} alt='hourglass'></img>
            </div>
            <div className={styles.buttons}>
                <button className={styles.employeeButton} onClick={openModal}>თანამშრომლის შექმნა</button>
                <button className={styles.taskButton}> + შექმენი ახალი დავალება</button>
            </div>
        </div>

        {isModalOpen && (
          <Modal onClose={closeModal}/>
        )}
    </>
  )
}

export default Navbar
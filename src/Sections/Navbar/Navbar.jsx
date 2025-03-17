import React, { useState } from 'react'
import styles from "./NavbarStyles.module.css"
import hourglass from "./../../assets/Hourglass.png"
import Modal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () =>{
    setIsModalOpen(true)
  }

  const closeModal = () =>{
    setIsModalOpen(false)
  }

  const createTask = () =>{
    navigate("/create-task")
  }

  const goToHome = () =>{
    navigate("/")
  }

  return (
    <>
        <div className={styles.navbarContainer}>
            <div className={styles.logo} onClick={goToHome}>
                <h1>Momentum</h1>
                <img src={hourglass} alt='hourglass'></img>
            </div>
            <div className={styles.buttons}>
                <button className={styles.employeeButton} onClick={openModal}>თანამშრომლის შექმნა</button>
                <button className={styles.taskButton} onClick={createTask}> + შექმენი ახალი დავალება</button>
            </div>
        </div>

        {isModalOpen && (
          <Modal onClose={closeModal}/>
        )}
    </>
  )
}

export default Navbar
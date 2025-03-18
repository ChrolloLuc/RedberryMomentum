import React, { useState, useEffect } from 'react'
import styles from "./ModalStyles.module.css"
import cancel from "../../assets/cancel.png"
import check from "../../assets/check.png"
import FileUpload from './FileUpload/FileUpload'

function Modal({onClose}) {

    const [departments, setDepartments] = useState([])

    useEffect(()=>{
                    fetch("https://momentum.redberryinternship.ge/api/departments", {
                        headers: { Accept: "application/json" },
                      })
                        .then((response) => response.json())
                        .then(data=>{
                            console.log("departments:", data)
                            setDepartments(data)
                        })
                        .catch(error=>console.error("error fetching departments:", error))
                },[])

    const handleOverlayClick = (e) =>{
        if(e.target.classList.contains(styles.modalOverlay)){
            onClose()
        }
    }

  return (
    <>
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContainer}>
                <img src={cancel} alt="cancelButton" onClick={onClose} className={styles.closeButton}/>
                    <div className={styles.formContainer}>
                        <h1>თანამშრომლის დამატება</h1>
                            <div className={styles.inputContainer}>
                                <div className={styles.form}>
                                    <label htmlFor='firstname'>სახელი*</label><br />
                                    <input type='text' className={styles.inputField}></input>
                                    <p><img src={check} alt="check" />მინიმუმ 2 სიმბოლო</p>
                                    <p><img src={check} alt="check" />მინიმუმ 255 სიმბოლო</p>
                                </div>
                                <div className={styles.form}>
                                    <label htmlFor='firstname'>გვარი*</label><br />
                                    <input type='text' className={styles.inputField}></input>
                                    <p><img src={check} alt="check" />მინიმუმ 2 სიმბოლო</p>
                                    <p><img src={check} alt="check" />მინიმუმ 255 სიმბოლო</p>
                                </div>
                            </div>

                                <FileUpload />

                            <div className={styles.departmentContainer}>
                                <label>დეპარტამენტი*</label><br />
                                <select className={styles.options}>
                                    {departments.map((department)=>(
                                        <option key={department.id}>{department.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.buttons}>
                                <button className={styles.cancel} onClick={onClose}>გაუქმება</button>
                                <button className={styles.add}>დაამატე თანამშრომელი</button>
                            </div>
                    </div>
            </div>
        </div>

    </>
  )
}

export default Modal
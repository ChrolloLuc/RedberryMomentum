import React from 'react'
import styles from "./ModalStyles.module.css"
import cancel from "./../../assets/cancel.png"
import check from "./../../assets/check.png"
import upload from "./../../assets/upload.png"

function Modal({onClose}) {
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

                            <div className={styles.avatar}>
                                <label>ავატარი*</label>
                                <div className={styles.fileUpload}>
                                    <div className={styles.uploadContainer}>
                                        <img src={upload} alt="upload"/>
                                        <p>ატვირთე ფოტო</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.departmentContainer}>
                                <label>დეპარტამენტი*</label><br />
                                <select className={styles.options}>
                                    <option disabled hidden></option>
                                    <option>1</option>
                                </select>
                            </div>

                            <div className={styles.buttons}>
                                <button className={styles.cancel}>გაუქმება</button>
                                <button className={styles.add}>დაამატე თანამშრომელი</button>
                            </div>
                    </div>
            </div>
        </div>

    </>
  )
}

export default Modal
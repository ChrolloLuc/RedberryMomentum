import React, { useRef, useState } from 'react'
import styles from "./FileUploadStyles.module.css"
import upload from "./../../../assets/upload.png"
import trash from "./../../../assets/trash.png"

function FileUpload() {
    const [avatar, setAvatar] = useState(null)
        const fileInputRef = useRef(null)
    
        const handleFileChange = (e) =>{
            const file = e.target.files[0]
            if(file){
                const reader = new FileReader()
                reader.onload = (e) =>{
                    setAvatar(e.target.result)
                }
                reader.readAsDataURL(file)
            }
        }
    
        const handleUploadClick = () =>{
            fileInputRef.current.click()
        }
    
        const handleDeleteAvatar = () =>{
            setAvatar(null)
            fileInputRef.current.value = ""
        }
    
  return (
    <>
        <div className={styles.avatar}>
                                <label>ავატარი*</label>

                                <div className={styles.fileUpload}>
                                    {avatar ? (
                                    <div className={styles.avatarPreview}>
                                        <img src={avatar} alt='avatar' className={styles.avatarImage} />
                                        <button className={styles.deleteButton} onClick={handleDeleteAvatar}>
                                            <img src={trash} alt='delete'/>
                                        </button>
                                        </div>
                                    ):(
                                        <div className={styles.uploadContainer} onClick={handleUploadClick}>
                                            <img src={upload} alt='upload'/>
                                            <p>ატვირთე ფოტო</p>
                                            </div>
                                    )}

                                    <input 
                                    type='file' 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                    accept='image/*'
                                    style={{display: "none"}}
                                    />
                                </div>
                            </div>
    </>
  )
}

export default FileUpload
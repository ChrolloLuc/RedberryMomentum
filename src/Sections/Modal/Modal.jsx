import React, { useState, useEffect } from "react";
import styles from "./ModalStyles.module.css";
import cancel from "../../assets/cancel.png";
import check from "../../assets/check.png";
import FileUpload from "./FileUpload/FileUpload";

function Modal({ onClose }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/departments", {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const handleEmployeeSubmit = async () => {
    if (!firstname || !lastname || !selectedDepartment || !avatar) {
      alert("გთხოვთ შეავსოთ ყველა ველი!");
      return;
    }

    const formData = new FormData();
    formData.append("name", firstname);
    formData.append("surname", lastname);
    formData.append("department_id", selectedDepartment);
    formData.append("avatar", avatar);

    try {
      const response = await fetch("https://momentum.redberryinternship.ge/api/employees", {
        method: "POST",
        headers: {
          Authorization: "Bearer 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb",
        },
        body: formData,
      });

      if (response.ok) {
        alert("თანამშრომელი წარმატებით დაემატა");
        onClose(); 
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
        alert("ვერ დაემატა")
      console.error("Error submitting employee:", error);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target.classList.contains(styles.modalOverlay) && onClose()}>
      <div className={styles.modalContainer}>
        <img src={cancel} alt="cancelButton" onClick={onClose} className={styles.closeButton} />
        <div className={styles.formContainer}>
          <h1>თანამშრომლის დამატება</h1>

          <div className={styles.inputContainer}>
            <div className={styles.form}>
              <label>სახელი*</label>
              <input type="text" className={styles.inputField} value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              <p><img src={check} alt="check" /> მინიმუმ 2 სიმბოლო</p>
            </div>
            <div className={styles.form}>
              <label>გვარი*</label>
              <input type="text" className={styles.inputField} value={lastname} onChange={(e) => setLastname(e.target.value)} />
              <p><img src={check} alt="check" /> მინიმუმ 2 სიმბოლო</p>
            </div>
          </div>

          <FileUpload setAvatar={setAvatar}/>

          <div className={styles.departmentContainer}>
            <label>დეპარტამენტი*</label>
            <select className={styles.options} value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              <option value="">აირჩიე დეპარტამენტი</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={onClose}>გაუქმება</button>
            <button className={styles.add} onClick={handleEmployeeSubmit}>დაამატე თანამშრომელი</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

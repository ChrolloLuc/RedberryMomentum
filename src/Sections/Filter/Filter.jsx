import React, { useState, useEffect } from "react";
import styles from "./FilterStyles.module.css";
import iconDefault from "./../../assets/iconDefault.png";

function Filter() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/departments", {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("departments:", data);
        setDepartments(data);
      })
      .catch((error) => console.error("error fetching departments:", error));
  }, []);

  const toggleDepartmentDropdown = () => {
    setIsDepartmentOpen(!isDepartmentOpen);
  };

  const handleCheckboxChange = (id) => {
    setSelectedDepartments((prevSelected) => 
      prevSelected.includes(id)
        ? prevSelected.filter((deptId) => deptId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelection = () => {
    
    setIsDepartmentOpen(false);
    // Additional logic for applying filters
  };

  return (
    <>
      <div className={styles.title}>
        <h1>დავალებების გვერდი</h1>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.departmentContainer}>
          <button
            className={styles.departmentButton}
            onClick={toggleDepartmentDropdown}
          >
            დეპარტამენტი <img src={iconDefault} alt="iconDefault"></img>
          </button>
          {isDepartmentOpen && (
            <div className={styles.dropdown}>
              {departments.map((dept) => (
                <label key={dept.id} className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept.id)}
                    onChange={() => handleCheckboxChange(dept.id)}
                  />
                  {dept.name}
                </label>
              ))}
              <div className={styles.buttonContainer}>
                <button className={styles.selectButton} onClick={handleSelection}>
                  არჩევა
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.priorityContainer}>
          <button className={styles.priorityButton}>
            პრიორიტეტი <img src={iconDefault} alt="iconDefault"></img>
          </button>
        </div>
        <div className={styles.employeeContainer}>
          <button className={styles.employeeButton}>
            თანამშრომელი <img src={iconDefault} alt="iconDefault"></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default Filter;
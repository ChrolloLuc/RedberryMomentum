import React, { useState, useEffect } from "react";
import styles from "./DepartmentEmployeeStyles.module.css";
import Select from "react-select";
import Modal from "./../../Modal/Modal"

function DepartmentEmployee() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDepartmentChange = (event) => {
    const newDepartment = parseInt(event.target.value, 10);
    setSelectedDepartment(newDepartment);
    setSelectedEmployee(null);
  };

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

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/employees", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("employees:", data);
        setEmployees(data);
      })
      .catch((error) => console.error("error fetching employees:", error));
  }, []);

  const getEmployeeOptions = () => {
    if (!selectedDepartment) return [];

    return employees
      .filter((emp) => emp.department.id === selectedDepartment)
      .map((emp) => ({
        value: emp.id,
        label: (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={emp.avatar}
              alt={`${emp.name} ${emp.surname}`}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span>
              {emp.name} {emp.surname}
            </span>
          </div>
        ),
        name: `${emp.name} ${emp.surname}`,
      }));
  };

  const hasEmployeesForDepartment =
    selectedDepartment &&
    employees.some((emp) => emp.department.id === selectedDepartment);

  const employeeSelectStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #CED4DA",
      width: "550px",
      height: "45px",
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      cursor: hasEmployeesForDepartment ? "pointer" : "not-allowed",
      borderRadius: "5px",
      backgroundColor: !hasEmployeesForDepartment ? "#F8F9FA" : "white",
      opacity: !hasEmployeesForDepartment ? 0.65 : 1,
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "0 12px",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "12px",
      maxWidth: "calc(100% - 8px)",
      overflow: "hidden",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6C757D",
    }),
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      backgroundColor: state.isSelected ? "#F5F5F5" : "white",
      color: "#212529",
      padding: "10px 12px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#F8F9FA",
      },
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    input: (provided) => ({
      ...provided,
      opacity: "0",
    }),
  };

  const handleEmployeeChange = (selectedOption) => {
    setSelectedEmployee(selectedOption);
  };
  return (
    <>
      <div className={styles.departmentContainer}>
        <label>დეპარტამენტი*</label>
        <br />
        <select
          className={styles.departmentInput}
          onChange={handleDepartmentChange}
          value={selectedDepartment || ""}
        >
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.employeeContainer}>
        <label>პასუხისმგებლიანი თანამშრომელი*</label>
        <br />
        <Select
          options={getEmployeeOptions()}
          styles={employeeSelectStyles}
          isDisabled={!selectedDepartment || !hasEmployeesForDepartment}
          value={selectedEmployee}
          placeholder=""
          onChange={handleEmployeeChange}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div>
    </>
  );
}

export default DepartmentEmployee;

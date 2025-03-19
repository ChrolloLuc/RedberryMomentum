import React, {useState, useEffect} from 'react'
import styles from "./CardStyles.module.css"

function Card({statusId}) {
    // 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb
    const [priority, setPriority] = useState([])
    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])

    useEffect(()=>{
        fetch("https://momentum.redberryinternship.ge/api/priorities", {
            headers: {
                Accept: "application/json",
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log("Priorities:", data)
            setPriority(data)
        })
        .catch(error=>console.error("error fetching priorities:", error))


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


    useEffect(()=>{
        fetch("https://momentum.redberryinternship.ge/api/employees", {
            headers: {
                Accept: "application/json",
                Authorization: "9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log("Priorities:", data)
            setPriority(data)
        })
        .catch(error=>console.error("error fetching priorities:", error))
    },[])


  return (
    <>
        <div className={styles.cardContainer}>
            
        </div>
    </>
  )
}

export default Card
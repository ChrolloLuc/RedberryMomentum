import React, {useState, useEffect} from 'react'
import styles from "./CardStyles.module.css"

function Card() {
    // 9e6fd393-7412-42dd-adbe-c9155835b4d4
    const [priority, setPriority] = useState([])
    const [departments, setDepartments] = useState([])

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


  return (
    <>
        <div className={styles.cardContainer}>
            
        </div>
    </>
  )
}

export default Card
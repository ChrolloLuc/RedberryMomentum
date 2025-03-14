import React, { useEffect, useState } from 'react'
import styles from "./StatusesStyles.module.css"


function Statuses() {
    const [statuses, setStatuses] = useState([])

    useEffect(()=>{
        fetch("https://momentum.redberryinternship.ge/api/statuses" ,{
            headers: {
                Accept: "application/json",
                Authorization: ``
            }
        })
        .then(response=>response.json())
        .then(data=>setStatuses(data))
        .then(data=>console.log(data))
        .catch(error=>console.error("fetching error", error))
    }, [])
    
    const statusColors = {
        1: styles.yellow,
        2: styles.orange,
        3: styles.pink,
        4: styles.blue
    }

  return (
    <>
        <div className={styles.statusContainer}>
            {statuses.map((status)=>(
                <div key={status.id} className={`${styles.statusColumn} ${statusColors[status.id]}`}>
                    <h2>{status.name}</h2>
                </div>
            ))}
        </div>
    </>
  )
}

export default Statuses
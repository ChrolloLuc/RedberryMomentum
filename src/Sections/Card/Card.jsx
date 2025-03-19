import React, {useState, useEffect} from 'react'
import styles from "./CardStyles.module.css"
import comment from "./../../assets/Comments.png"

function Card({statusId}) {
    // 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb
    const [priority, setPriority] = useState([])
    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const [tasks, setTasks] = useState([])
    //priorities
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

        //departments
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
    //employees
    useEffect(()=>{
        fetch("https://momentum.redberryinternship.ge/api/employees", {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log("Priorities:", data)
            setEmployees(data)
        })
        .catch(error=>console.error("error fetching priorities:", error))
    },[])
    //tasks
    useEffect(()=>{
        fetch("https://momentum.redberryinternship.ge/api/tasks", {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer 9e77c9a9-15b1-4f4b-a9e0-60fa94c07eeb"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log("Priorities:", data)
            setTasks(data)
        })
        .catch(error=>console.error("error fetching priorities:", error))
    },[])

    const TruncateText = ({text, maxLength=100}) =>{
        if(text.length<= maxLength) {
            return text
        } else{
            return <span>{text.slice(0, maxLength)}...</span>
        }
        
    }

    

  return (
    <>
        <div className={styles.cardContainer}>
            <div className={styles.upperContainer}>
                <div className={styles.leftSide}>
                    <span className={styles.status}>საშუალო</span>
                    <span className={styles.department}>დიზაინი</span>
                </div>
                <div className={styles.rightSide}>
                    <span>22 იანვ, 2022</span>
                </div>
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.heading}>redberry saitis lendingis dizaini</h1>
                <TruncateText text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, doloremque dolores. Tenetur, minus. Beatae, repellat quo? Dolorum odio quae harum vitae ipsum nisi fuga, nulla facilis impedit illum nostrum quod?" maxLength={100} />
            </div>
            <div className={styles.bottom}>
                <img src={comment} alt=''></img>
                <div>
                <img src={comment} alt='comment'></img><span>8</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card
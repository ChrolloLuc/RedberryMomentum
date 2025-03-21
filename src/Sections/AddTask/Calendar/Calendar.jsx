import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styles from "./CalendarStyles.module.css"

function Calendar({setTime}) {
    const [deadline, setDeadline] = useState(null)
    
  return (
    <>
        <DatePicker
                    selected={deadline}
                    onChange={(date)=>{setDeadline(date)
                      setTime(date)
                    }}
                    dateFormat={"dd/mm/yyyy"}
                    placeholderText="DD/MM/YYYY"
                    className={styles.datePicker}
                    calendarClassName={styles.customCalendar}
                    />
    </>
  )
}

export default Calendar
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle'
import React from 'react'
import styles from '../../styles/userAccount.module.css'
const WrongMessage = () => {
  return (
   <div className="sign-in-wrong-container">
   <div className={styles.signInWrong}>
     <FaExclamationTriangle />
     <div className={styles.wrongNotice}>
       <div className={styles.noticeTitle}>There was a problem</div>
       <div className={styles.noticeContent}>We cannot find an account with that email address</div>
     </div>
   </div>
 </div>
  )
}

export default WrongMessage
import React, { useState } from 'react'
import Image from 'next/image'
import { FaRegEdit } from '@react-icons/all-files/fa/FaRegEdit';
import styles from '../../styles/dashboard.module.css'
import { getUser } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import FormAccountModification from './FormAccount';

const Account = () => {
  const userState = useSelector(getUser)
  const [avatar, setAvatar] = useState<string>(userState.avatar);
  const changeAvtHandler = (event: any) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      setAvatar(reader.result as string);
    });
  };
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '34px' }}>Account Modification</h1>
      <div className={styles.dashboardBoxMain}>
        <div className={styles.dashboardAvt}>
          <p style={{ fontSize: '18px' }}>Change your avatar:</p>
          <div className={styles.avatarContainer}>
            <Image src={avatar || ""} alt='' className={styles.accountAvt} width={100} height={100} style={{borderRadius: "50%"}}/>
            <label htmlFor="inputTag">
              <div className={styles.iconChange}>
                <FaRegEdit />
              </div>
              <input
                type="file"
                name="avatar"
                id="inputTag"
                title=" "
                style={{ display: 'none' }}
                onChange={(e) => changeAvtHandler(e)}
              />
            </label>
          </div>
        </div>
        <FormAccountModification avatar={avatar}/>
      </div>
    </>
  );
}

export default Account
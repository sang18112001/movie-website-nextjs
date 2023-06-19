import { getUser } from '@/app/redux/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/dashboard.module.css';
import { changeUserInfo } from '@/app/redux/userSlice';

const FormAccountModification = ({ avatar }: { avatar: string }) => {
  const userState = useSelector(getUser);
  const dispatch = useDispatch();
  const userId = String(userState?.uid);
  const [checkOld, setCheckOld] = useState(true);
  const [checkConfirm, setCheckConfirm] = useState(true);
  const [checkBtn, setCheckBtn] = useState(true);
  const [newPass, setNewPass] = useState('');
  const oldHandler = (e: any) => {
    const isPasswordValid = e.target.value === userState.password;
    setCheckOld(isPasswordValid);
    setCheckBtn(!isPasswordValid);
  };
  const confirmHandler = (e: any) => {
    const isConfirmationValid = e.target.value === '' || e.target.value !== newPass;
    setCheckConfirm(!isConfirmationValid);
    setCheckBtn(isConfirmationValid);
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentAccount = Object.fromEntries(formData);
    const newInfo = {
      email: userState.email,
      name: currentAccount.username || userState.name,
      password: currentAccount.password || userState.password,
      avatar: avatar || userState.avatar,
    };
    dispatch(changeUserInfo({ newInfo, userId }));
    alert('Success');
    const inputFields = e.target.querySelectorAll('input');
    inputFields.forEach((input : any) => {
      input.value = '';
    });
  };
  return (
    <form className={styles.formBox} onSubmit={(e) => submitHandler(e)}>
      <div className={styles.dashboardContent}>
        <div className={styles.nameChange}>
          <label htmlFor="username">Username:</label>
          <input name="username" placeholder="Change your name" />
        </div>
        <div className={`password-old ${!checkOld ? 'account-wrong' : ''}`}>
          <label htmlFor="old_password">
            Your Password<span style={{ color: 'red' }}>*</span>:
          </label>
          <input name="old_password" type="password" placeholder="Your password" onChange={(e) => oldHandler(e)} />
          <p className="checkPassword">Password does not match</p>
        </div>
      </div>
      <div>
        <div className={styles.passwordChange}>
          <label htmlFor="password">New Password:</label>
          <input
            name="password"
            type="password"
            placeholder="New password"
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div className={`password-confirm ${!checkConfirm ? 'account-wrong' : ''}`}>
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm password"
            onChange={(e) => confirmHandler(e)}
          />
          <p className="checkPassword">Password does not match</p>
          <button type="submit" className="btn-me" disabled={checkBtn}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormAccountModification;

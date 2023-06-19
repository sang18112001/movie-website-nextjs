import styles from '../../styles/userAccount.module.css';
import React, { ChangeEvent, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/authSignIn';
import { NON_AVATAR } from '@/app/config';

const SignUp = ({ setCheckSignBox } : {setCheckSignBox: any}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string>('');
  const [passError, setPassError] = useState('');
  const [emailError, setEmailError] = useState('');
  const clearErrs = () => {
    setPassError('');
    setEmailError('');
  };
  const handleSignUp = (e: any) => {
    clearErrs();
    e.preventDefault();
    const auth = getAuth();
    const userRef = collection(db, 'users');
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        setDoc(doc(userRef, uid), {
          accounts: {
            name: name,
            email: email,
            avatar: avatar || NON_AVATAR,
          },
          wishlist: {
            items: [],
          },
        });
        setCheckSignBox((current: boolean) => !current);
      })
      .catch((err) => {
        const { code, message } = err;
        if (code === 'auth/email-already-in-use' || code === 'auth/invalid-email') {
          setEmailError(message);
        }
        if (code === 'auth/weak-password' || code === 'auth/missing-password') {
          setPassError(message);
        }
      });
  };
  const handleAvatar = (event: any) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      setAvatar(reader.result as string);
    });
  };

  return (
    <>
      <form className={styles.signUpBody} onSubmit={handleSignUp}>
        <label>Username: </label>
        <input name="name" type="type" placeholder="Username" onChange={(e) => setName(e.target.value)} />
        <div>
          <label>Email:</label>
          <input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          {emailError && <p className={styles.checkEmail}>{emailError.replace('Firebase: ', '')}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
          {passError && <p className={styles.checkPassword}>{passError.replace('Firebase: ', '')}</p>}
        </div>
        <div>
          <label>Re-enter password:</label>
          <input className={styles.retype} name="retype" type="password" placeholder="Re-enter password" />
        </div>
        <div>
          <div className={`${styles.licence} ${styles.wrongBox}`}>
            <input name="checkLincence" type="checkbox" />
            <span>I agree with terms and conditions</span>
            <br />
          </div>
          <p className={styles.checkAllow}>You do not allow to the terms</p>
        </div>
        <div className={styles.getAvatar}>
          <input type="file" id="avatar" onChange={(e) => handleAvatar(e)} />
          <p>Click here to choose your avatar</p>
        </div>
        <button type="submit" className="btn-me">
          Sign up
        </button>
        <div className={styles.signConverting}>
          Already have an account?
          <span className="sign-up-to-in">Sign in</span>
        </div>
      </form>
    </>
  );
};

export default SignUp;

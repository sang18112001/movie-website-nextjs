'use client';
import React, { ChangeEvent, useState } from 'react';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle';
import styles from '../../styles/userAccount.module.css';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const auth = getAuth();
  const handleSignIn = (e: any) => {
    e.preventDefault();
    setError('');
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        setPass('');
        router.push('/');
      })
      .catch((err) => {
        const { code, message } = err;
        if (code === 'auth/invalid-email' || code === 'auth/user-disabled' || code === 'auth/user-not-found') {
          setError(message);
        }
        if (code === 'auth/wrong-password') {
          setError(message);
        }
      });
  };
  return (
    <form className={styles.signInBody} onSubmit={handleSignIn}>
      {error && (
        <div className="sign-in-wrong-container">
          <div className={styles.signInWrong}>
            <FaExclamationTriangle />
            <div className={styles.wrongNotice}>
              <div className={styles.noticeTitle}>There was a problem</div>
              <div className={styles.noticeContent}>{error.replace('Firebase:', '')}</div>
            </div>
          </div>
        </div>
      )}
      <label>Email:</label>
      <input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input name="password" type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
      <button type="submit">Sign in </button>
      <div className={styles.socialSignIn}>
        <div className={styles.socialTitle}>
          <span>Or sign in with</span>
        </div>
        <div className={styles.socialItems}>
          <div className={`google ${styles.item}`}>
            <FaGoogle />
          </div>
          <div className={`facebook ${styles.item}`}>
            <FaFacebookF />
          </div>
          <div className={`twitter ${styles.item}`}>
            <FaTwitter />
          </div>
        </div>
      </div>
      <div className={styles.signConverting}>
        Not a member?
        <span className="sign-in-to-up">Sign up</span>
      </div>
    </form>
  );
};

export default SignIn;

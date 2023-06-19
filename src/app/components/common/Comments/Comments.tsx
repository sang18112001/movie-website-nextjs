import React, { useRef } from 'react';
import CommentBox from './CommentBox';
import { AppDispatch, getUser } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { NON_AVATAR } from '@/app/config';
import styles from '../../../styles/comments.module.css';
import { doc, setDoc } from 'firebase/firestore';
import { commentsDocRef } from '@/app/firebase/controller';
import { nanoid } from 'nanoid';
import { getTime } from '@/app/utils/utils';
import { addNewComment } from '@/app/redux/commentSlice';

const Comments = ({ id }: { id: string }) => {
  const cmtBtn = useRef<HTMLInputElement>(null);
  const userState = useSelector(getUser);
  const dispatch = useDispatch<AppDispatch>();
  var docRef = commentsDocRef(id);
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (cmtBtn.current?.value) {
      if (!userState.uid) {
        alert('You have to sign in');
      } else {
        const newComment = {
          idCmt: nanoid(),
          uid: userState.uid,
          author: userState.name,
          content: cmtBtn.current.value,
          updated_at: getTime(),
          avatar: userState.avatar,
        };
        dispatch(addNewComment({ newComment, id })).unwrap();
      }
      cmtBtn.current.value = '';
    }
  };
  return (
    <div className={styles.movieComments}>
      <h4 className={styles.contentTitle}>Comments</h4>
      <div className={styles.commentMain}>
        <div className={styles.commentBox}>
          <CommentBox id={id} />
        </div>
        <div className={styles.commentMe}>
          <img src={userState.avatar || NON_AVATAR} alt="" className={styles.loggedIcon} />
          <form className={styles.text} onSubmit={(e) => handleSubmit(e)}>
            <input name="comment" type="text" placeholder="Add comments" ref={cmtBtn}/>
            <div className={styles.commentUpload}>
              <button type="submit">Comment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comments;

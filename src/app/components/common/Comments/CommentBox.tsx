import { NON_AVATAR } from '@/app/config';
import { commentsDocRef } from '@/app/firebase/controller';
import { fetchUsersComment } from '@/app/redux/commentSlice';
import { AppDispatch, getComments, getUser } from '@/app/redux/store';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/comments.module.css'
import CommentFeatures from './CommentFetures';
import CommentEdit from './CommentEdit';
const CommentBox = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const commentState = useSelector(getComments);
  const userState = useSelector(getUser);
  const {comments} = commentState
  const [checkEdit, setCheckEdit] = useState('');
  useEffect(() => {
    dispatch(fetchUsersComment(id)).unwrap();
  }, [id]);
  return (
    <Fragment>
      {comments.map((comment, index) => {
        const idCmt = comment.idCmt;
        return (
          <div className={styles.commentPersonal} key={index}>
            <div className={styles.comment}>
              <div className={styles.commentInfo}>
                <img src={comment.avatar || NON_AVATAR} />
                <div className={styles.commentContent}>
                  <div className={styles.commentAuthor}>
                    <span className={styles.commentName}>{comment.author}</span>
                    {comment.uid == userState.uid && <span className={styles.commentIdentity}>you</span>}
                  </div>
                  <div className={styles.commentTime}>Updated at: {comment.updated_at}</div>
                </div>
              </div>
              {comment.uid == userState.uid && <CommentFeatures idMovie={id} idCmt={idCmt} setCheckEdit={setCheckEdit} />}
            </div>
            <div className={styles.commentText}>{comment.content}</div>
            {checkEdit == idCmt && <CommentEdit id={id} comment={comment} setCheckEdit={setCheckEdit} />}
          </div>
        );
      })}
    </Fragment>
  );
};

export default CommentBox;

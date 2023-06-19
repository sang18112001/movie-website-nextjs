import { useDispatch } from 'react-redux';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaPen } from '@react-icons/all-files/fa/FaPen';
import styles from '../../../styles/comments.module.css';
import { deleteComment } from '@/app/redux/commentSlice';
import { AppDispatch } from '@/app/redux/store';
const CommentFeatures = ({ idMovie, idCmt, setCheckEdit }: { idMovie: string; idCmt: string; setCheckEdit: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const deleteHandler = ({ idMovie, idCmt }: { idMovie: string; idCmt: string }) => {
    dispatch(deleteComment({ idMovie, idCmt })).unwrap();
  };
  return (
    <>
      <div className={styles.commentFeatures}>
        <div className={styles.commentDelete} onClick={() => deleteHandler({ idMovie, idCmt })}>
          <FaTrash />
          <span>Delete</span>
        </div>
        <div className={styles.commentEdit} onClick={() => setCheckEdit((item: boolean) => (!item ? idCmt : ''))}>
          <FaPen />
          <span>Edit</span>
        </div>
      </div>
    </>
  );
};

export default CommentFeatures;

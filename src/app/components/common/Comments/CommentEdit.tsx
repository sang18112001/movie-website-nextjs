import { useDispatch } from 'react-redux';
import { getTime } from '@/app/utils/utils';
import { editComment } from '@/app/redux/commentSlice';
import { AppDispatch } from '@/app/redux/store';
import styles from '../../../styles/comments.module.css'
const CommentEdit = ({ id, comment, setCheckEdit }: { id: string; comment: any; setCheckEdit: any }) => {
   const idCmt = comment.idCmt
  const dispatch = useDispatch<AppDispatch>();
  const editSubmiter = (e : any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const editCmt = Object.fromEntries(formData).edit;
    const time = getTime();
    if (editCmt) {
      dispatch(editComment({ id, idCmt, editCmt, time }));
      setCheckEdit('');
    }
  };
  return (
    <>
      <form action="" onSubmit={(e) => editSubmiter(e)}>
        <input name="edit" className={styles.commentEdit} type="text" defaultValue={comment.content}/>
      </form>
    </>
  );
};

export default CommentEdit;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAPI } from '../api/movieAPI';
import { IComment } from '../utils/types';

export const fetchUsersComment = createAsyncThunk('movies/fetchUsersComment', async (movie_id: string | undefined) => {
  return getAPI.userCmt(movie_id);
});

export const addNewComment = createAsyncThunk(
  'posts/addNewComment',
  async ({ newComment, id }: { newComment: IComment; id: string }) => {
    getAPI.userNewCmtUpdate(id, newComment);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ idMovie, idCmt }: { idMovie: string; idCmt: string }) => {
    getAPI.userCmt(idMovie).then((listCmt) => {
      const deleteId = Object.keys(listCmt).find((key) => listCmt[key].idCmt === idCmt);
      getAPI.userDeleteCmt(idMovie, deleteId ?? ''); // Use the nullish coalescing operator to provide a default value
    });
  },
);

export const editComment = createAsyncThunk(
  'comments/editComment',
  async ({ id, idCmt, editCmt, time }: { id: string; idCmt: string; editCmt: any; time: string }) => {
    getAPI.userCmt(id).then((listCmt : any) => {
      const editId = Object.keys(listCmt).find((key) => listCmt[key].idCmt == idCmt);
      const editValue = listCmt[editId ?? ''] ;
      editValue.content = editCmt;
      editValue.updated_at = time;
      getAPI.userEditCmt(id, editId ?? '', editValue);
    });
  },
);

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [] as IComment[],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersComment.fulfilled, (state, action) => {
        state.comments = action.payload ? Object.values(action.payload) : [];
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.meta.arg.newComment];
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((cmt) => cmt.idCmt != action.meta.arg.idCmt);
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const { editCmt, idCmt, time } = action.meta.arg;
        const editComment = state.comments.find((comment) => comment.idCmt == idCmt);
        if (editComment) {
         editComment.content = editCmt;
         editComment.updated_at = time;
       }
      });
  },
});

// Export reducers
export const commentReducer = commentSlice.reducer;

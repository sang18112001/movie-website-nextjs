import axios from 'axios';
import axiosClient from './axiosClient';
import { IComment, ITypeMovies } from '../utils/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const PERSONAL_API = process.env.NEXT_PUBLIC_PERSONAL_API
const typeMovies: ITypeMovies = {
   popularity: 'discover/movie',
   top_rated: 'movie/top_rated',
   up_coming: 'movie/upcoming',
   now_playing: 'movie/now_playing',
};
const getAPI = {
   moviesDisplay: async (type = 'popularity', page = '1', genres = '', lang = '', year = '') => {
      const response = await axios.get(`${API_URL}${typeMovies[type as keyof ITypeMovies]}?api_key=${API_KEY}&page=${page}&primary_release_year=${year}&with_genres=${genres}&with_original_language=${lang}`);
      return response.data
   },
   movieDetail: async (id: string, typeDetail: string = '') => {
      const response = await axios.get(`${API_URL}movie/${id}${typeDetail}?api_key=${API_KEY}`)
      return response.data
   },
   moviesSearch: async (searchQuery: string) => {
      const response = await axios.get(`${API_URL}search/movie?api_key=${API_KEY}&query=${searchQuery}`);
      return response.data
   },
   userInfo: async (uid = '') => {
      const response = await axios.get(`${PERSONAL_API}/user/${uid}.json`);
      return response.data;
   },
   userInfoAdding: async (updateParams: string) => {
      const response = await axios.post(`${PERSONAL_API}/user.json`, updateParams);
      return response.data;
   },
   userInfoUpdate: async (uid: string, updateParams: string) => {
      const response = await axios.patch(`${PERSONAL_API}/user/${uid}.json`, updateParams);
      return response.data;
   },
   userCmt: async (id = '') => {
      const response = await axios.get(`${PERSONAL_API}/commentsReact/${id}.json`);
      console.log(response.data)
      return response.data;
   },
   userCmtUpdate: async (id: number, updateParams: string) => {
      const response = await axios.patch(`${PERSONAL_API}/commentsReact/${id}.json`, updateParams);
      return response.data;
   },
   userNewCmtUpdate: async (id: string, updateParams: IComment) => {
      const response = await axios.post(`${PERSONAL_API}/commentsReact/${id}.json`, updateParams);
      return response.data;
   },
   userDeleteCmt: async (idMovie: string, idComment: string) => {
      const response = await axios.delete(`${PERSONAL_API}/commentsReact/${idMovie}/${idComment}.json`);
      return response.data;
   },
   userEditCmt: async (idMovie: string, idComment: string, editValue: string) => {
      const response = await axios.patch(`${PERSONAL_API}/commentsReact/${idMovie}/${idComment}.json`, editValue);
      return response.data;
   }
};

export { getAPI };

import React, { ChangeEvent, ReactNode } from 'react';

export interface IMovieDetail {
  backdrop_path: string;
  poster_path: string;
  genres: IGenre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: string;
  vote_average: number;
  vote_count: number;
}
export interface ITypeMovies {
  popularity: string ,
  top_rated: string,
  up_coming: string,
  now_playing: string,
};
export interface IGenre {
  id: number;
  name: string;
}

export interface ILanguage {
  iso_639_1: string;
  name: string;
}

export interface ICasts {
  cast: ICast[]
}

export interface ICast {
  profile_path: string;
  original_name: string;
}

export interface IMedias {
  backdrops: IMedia[]
  posters: IMedia[]
}

export interface IMedia {
  file_path: string;
}

export interface IRecommendations {
  results: IRecommendation[]
}

export interface IRecommendation {
  id: string;
  backdrop_path: string;
}

export interface ISearchParams {
  genre: string;
  language: string;
  year: string;
  page: string;
}

export interface IUser {
  avatar: string;
  email: string;
  name: string;
  password: string;
  wishlist: any[]
}

export interface InputProps {
  htmlFor: string;
  label: string;
  type: string;
  autoFocus?: boolean;
  value: string;
  onChange: (value: string) => void;
  err?: string;
};


export interface ItemWishlist {
  id: string;
  path: string
}

export interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: any };
}

export interface IUserAccount {
  uid: string;
  email: string;
  name: string;
  password: string;
  avatar: string;
}

export interface IUserReducer {
  userAccountReducer: IUserAccount;
}

export interface Item {
  id: string;
  path: string;
}

export interface ITems {
  items: Item[];
}

export interface IWishlistReducer {
  wishlistReducer: ITems;
}

export interface IComment {
  author: string;
 avatar: string;
 content: string;
 idCmt: string;
 uid: string;
 updated_at: string;
}

export interface IComments {
  comments: IComment[]
}

export interface ICommentsReducer {
  commentReducer: IComments
}
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

export const selectUser = (state: RootState) => state.user;
export const selectPosts = (state: RootState) => state.posts;

export const userSelector = createSelector(selectUser, state => state);
export const postsSelector = createSelector(selectPosts, state => state);
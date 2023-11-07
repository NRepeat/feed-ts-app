import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

export const selectCount = (state: RootState) => state.user;

export const userSelector = createSelector(selectCount, state => state);
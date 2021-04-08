import { declareAtom } from '@reatom/core';
import { setSearchValue, updateStore } from 'store/actions';

export const allDataAtom = declareAtom([], (on) => [
  on(updateStore, (_, payload) => payload),
]);

export const searchValueAtom = declareAtom('', (on) => [
  on(setSearchValue, (_, payload) => payload),
]);

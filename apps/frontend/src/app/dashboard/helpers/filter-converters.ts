import { FilterOptionsType } from '../types/filter-options-type';

export const createURLFilterQuery = ({
  startDate,
  endDate,
  states,
  industries,
  accounts,
}: FilterOptionsType) => {
  let filterQuery: string = '';
  if (startDate) {
    filterQuery += `&date[gte]=${startDate}`;
  }
  if (endDate) {
    filterQuery += `&date[lte]=${endDate}`;
  }
  if (states.length > 0) {
    filterQuery += `&state[in]=[${states}]`;
  }
  if (industries.length > 0) {
    filterQuery += `&industry[in]=[${industries}]`;
  }
  if (accounts.length > 0) {
    filterQuery += `&account[in]=[${accounts}]`;
  }

  return filterQuery;
};

export const fromStorageToStateFilter = (filterQuery: string): FilterOptionsType => {
  const startDate = filterQuery.includes('date[gte]=')
    ? parseInt(filterQuery.split('date[gte]=')[1].split('&')[0])
    : null;
  const endDate = filterQuery.includes('date[lte]=')
    ? parseInt(filterQuery.split('date[lte]=')[1].split('&')[0])
    : null;
  const states = filterQuery.includes('state[in]=')
    ? [filterQuery.split('state[in]=')[1].replaceAll('[', '').replaceAll(']', '')]
    : [];
  const industries = filterQuery.includes('industry[in]=')
    ? [filterQuery.split('industry[in]=')[1].replaceAll('[', '').replaceAll(']', '')]
    : [];
  const accounts = filterQuery.includes('account[in]=')
    ? [filterQuery.split('account[in]=')[1].replaceAll('[', '').replaceAll(']', '')]
    : [];

  return {
    startDate,
    endDate,
    states,
    industries,
    accounts,
  };
};

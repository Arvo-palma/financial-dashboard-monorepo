'use client';

import { ErrorType } from '@/app/core/types/error-type';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { getTransactions } from '../actions';
import { createURLFilterQuery, fromStorageToStateFilter } from '../helpers/filter-converters';
import { DataType } from '../types/data-type';
import { FilterOptionsType } from '../types/filter-options-type';

type InitialStateType = {
  startDate: number | null;
  endDate: number | null;
  states: string[];
  industries: string[];
  accounts: string[];
  report: DataType | undefined;
  applyFilter: (filter: { [key: string]: number | string[] | null }) => void;
  isPending: boolean;
};

const initialState: InitialStateType = {
  startDate: null,
  endDate: null,
  states: [],
  industries: [],
  accounts: [],
  report: {
    transactionsByPeriod: [],
    income: 0,
    expenses: 0,
    pendingTransactions: 0,
    periodBalance: 0,
    stateList: [],
    industryList: [],
    accountList: [],
  },
  applyFilter: (filter: { [key: string]: number | string[] | null }) => filter,
  isPending: false,
};

const Context = React.createContext(initialState);

type DataProviderType = (props: { children: React.ReactNode | React.ReactNode[] }) => JSX.Element;

export const initialFilters = {
  startDate: null,
  endDate: null,
  states: [],
  industries: [],
  accounts: [],
};

const initialReport = {
  transactionsByPeriod: [],
  income: 0,
  expenses: 0,
  pendingTransactions: 0,
  periodBalance: 0,
  stateList: [],
  industryList: [],
  accountList: [],
};

export const DataProvider: DataProviderType = ({ children }) => {
  const [filters, setFilters] = React.useState<FilterOptionsType>(initialFilters);
  const [report, setReport] = React.useState<DataType | undefined>(initialReport);

  const { mutate: fetchData, isPending } = useMutation<DataType, ErrorType, string>({
    mutationFn: getTransactions,
    onSuccess: (data) => {
      setReport(data);
    },
  });

  const applyFilter = async (filter: { [key: string]: number | string[] | null }) => {
    const updatedFilters = { ...filters, ...filter };

    const queryFilters = createURLFilterQuery(updatedFilters);

    localStorage.setItem('filters', queryFilters);
    setReport(initialReport);
    fetchData(queryFilters);
    setFilters(updatedFilters);
  };

  React.useEffect(() => {
    let hasChangedFilters = false;
    const queryFilters = localStorage.getItem('filters');

    if (queryFilters) {
      const newFilters = fromStorageToStateFilter(queryFilters);
      hasChangedFilters = JSON.stringify(filters) === JSON.stringify(newFilters);
      const isFiltersEmpty = JSON.stringify(filters) === JSON.stringify(initialFilters);

      if (hasChangedFilters || isFiltersEmpty) {
        fetchData(queryFilters);
        setFilters(newFilters);
      }
    } else {
      if (JSON.stringify(report) === JSON.stringify(initialReport)) {
        fetchData('');
      }
    }
  }, []);

  return (
    <Context.Provider
      value={{
        startDate: filters.startDate,
        endDate: filters.endDate,
        states: filters.states,
        industries: filters.industries,
        accounts: filters.accounts,
        report,
        applyFilter: applyFilter,
        isPending,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useDataContext = () => React.useContext(Context);

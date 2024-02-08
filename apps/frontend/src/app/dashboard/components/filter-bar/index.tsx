'use client';
import React from 'react';
import { useDataContext } from '../../providers/data-provider';
import {
  DatePickerContainer,
  SelectLabel,
  StyledDateContainer,
  StyledNav,
  StyledSelectBar,
  StyledSelectContainer,
} from '../styles/styled-nav';
import { MultiSelect } from './multi-select';
import { DatePicker } from './react-date-picker';

export interface FilterBarProps {}
const FilterBar: React.FC<FilterBarProps> = () => {
  const { startDate, endDate, states, industries, accounts, report, isPending, applyFilter } =
    useDataContext();

  const stateOptions = report?.stateList.map((state) => ({
    label: state,
    value: state,
  }));

  const selectedStates = states.map((state) => ({
    label: state,
    value: state,
  }));

  const industryOptions = report?.industryList.map((industry) => ({
    label: industry,
    value: industry,
  }));

  const selectedIndustries = industries.map((industry) => ({
    label: industry,
    value: industry,
  }));

  const accountOptions = report?.accountList.map((account) => ({
    label: account,
    value: account,
  }));

  const selectedAccounts = accounts.map((account) => ({
    label: account,
    value: account,
  }));

  console.log({ industries, selectedIndustries });

  const handleDateChange = (type: string, date?: number) => {
    if (date) {
      const dateFilter: { [key: string]: number } =
        type === 'start' ? { startDate: date * 1000 } : { endDate: date * 1000 };
      applyFilter(dateFilter);
    }
  };

  const handleStateChange = (value: string[]) => {
    if (value) {
      applyFilter({ states: value });
    }
  };

  const handleIndustryChange = (value: string[]) => {
    if (value) {
      applyFilter({ industries: value });
    }
  };

  const handleAccountChange = (value: string[]) => {
    if (value) {
      applyFilter({ accounts: value });
    }
  };

  return (
    <StyledNav>
      <StyledDateContainer>
        <DatePickerContainer>
          <span>Start date:</span>
          <DatePicker type="start" value={startDate} onChange={handleDateChange} />
        </DatePickerContainer>
        <DatePickerContainer>
          <span>End date:</span>
          <DatePicker type="end" value={endDate} onChange={handleDateChange} />
        </DatePickerContainer>
      </StyledDateContainer>

      <StyledSelectBar>
        <StyledSelectContainer>
          <SelectLabel>State:</SelectLabel>
          <MultiSelect
            onChange={handleStateChange}
            selectedOptions={selectedStates}
            isPending={isPending}
            options={stateOptions}
            name="states"
          />
        </StyledSelectContainer>
        <StyledSelectContainer>
          <SelectLabel>Industry:</SelectLabel>
          <MultiSelect
            onChange={handleIndustryChange}
            selectedOptions={selectedIndustries}
            isPending={isPending}
            options={industryOptions}
            name="industries"
          />
        </StyledSelectContainer>
        <StyledSelectContainer>
          <SelectLabel>Account:</SelectLabel>
          <MultiSelect
            onChange={handleAccountChange}
            selectedOptions={selectedAccounts}
            isPending={isPending}
            options={accountOptions}
            name="accounts"
          />
        </StyledSelectContainer>
      </StyledSelectBar>
    </StyledNav>
  );
};

export default FilterBar;

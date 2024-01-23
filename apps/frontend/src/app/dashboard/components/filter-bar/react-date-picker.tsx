'use client';
import moment from 'moment';
import React from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { StyledDatePickerWrapper } from '../styles/styled-nav';

export type DatePickerProps = {
  type: 'start' | 'end';
  onChange: (type: string, date?: number) => void;
  value: number | null;
};

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, type }) => {
  const [state, setState] = React.useState<{
    focused: boolean;
    date: moment.Moment | null;
  }>({
    focused: false,
    date: null,
  });

  const selectedValue = value ? moment(value) : state.date;

  const falseFunc = () => false;
  return (
    <StyledDatePickerWrapper>
      <SingleDatePicker
        id=""
        numberOfMonths={1}
        onDateChange={(date) => {
          setState({ ...state, date });
          onChange(type, date?.unix());
        }}
        onFocusChange={({ focused }) => setState({ ...state, focused })}
        focused={state.focused}
        date={selectedValue}
        hideKeyboardShortcutsPanel={true}
        isOutsideRange={falseFunc}
      />
    </StyledDatePickerWrapper>
  );
};

import styled from 'styled-components';

export const SelectLabel = styled.label`
  color: #f3f1f3;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
`;

export const StyledSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.3rem;
  align-items: center;
  max-width: 400px;
`;

export const StyledSelectBar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
  padding: 0px 0px 5px 0px;
`;

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: center;
`;

export const StyledDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: #f3f1f3;
  gap: 1rem;
`;

export const StyledDatePickerWrapper = styled.div`
  & .SingleDatePicker,
  .SingleDatePickerInput {
    .DateInput {
      width: 210px;
      height: 35px;
      display: flex;
      vertical-align: baseline;
      .DateInput_input {
        font-size: 1rem;
        border-bottom: 0;
        padding: 16px 16px 14px;
        color: #f3f1f3;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
          'Courier New', monospace;
        background: #2b2930;
      }
    }

    .SingleDatePickerInput__withBorder {
      border-radius: 5px;
      overflow: hidden;
      border-color: #2b2930;
      background: #2b2930;

      :hover,
      .DateInput_input__focused {
      }

      .CalendarDay__selected {
        background: #4d5151;
        border: blueviolet;
      }
    }

    .SingleDatePicker_picker.SingleDatePicker_picker {
      top: 43px;
      left: 2px;
      /* top: 43px !important;
      left: 2px !important; */
    }
    color: #121212;
  }
`;

export const StyledNav = styled.div`
  display: flex;
  margin: 0 0 0 0;
  flex-direction: row;
  flex-wrap: wrap;
  flex-shrink: 1;
  gap: 1rem;
  align-items: center;
  border-radius: 0.25rem;
  min-height: 5%;
  background-color: transparent;
  padding: 25px 80px 0px 40px;
`;

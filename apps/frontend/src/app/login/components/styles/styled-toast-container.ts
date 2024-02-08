import { ToastContainer } from 'react-toastify';
import { styled } from 'styled-components';

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    top: 5em !important;
    left: 10%;
    transform: translateX(-50%);
  }
  .Toastify__toast {
    cursor: inherit;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    background-color: #333;
    color: #fff;
    border-radius: 4px;
    padding: 16px;
  }
  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }
  .Toastify__close-button {
    --bg-opacity: 0;
  }
`;

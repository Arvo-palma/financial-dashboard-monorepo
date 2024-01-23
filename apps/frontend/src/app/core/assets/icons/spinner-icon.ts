import { Spinner } from '@styled-icons/evil/Spinner';
import styled from 'styled-components';

export const SpinnerIcon = styled(Spinner)`
  color: #f3f1f3;
  width: 100px;
  align-self: center;
  color: #f3f1f3;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

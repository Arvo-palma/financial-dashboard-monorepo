import styled from 'styled-components';

export const ChartLoader = styled.h2`
  width: 100vw;
  align-self: center;
  color: #f3f1f3;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  text-align: center;
  padding: 50px 50px;
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;

  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

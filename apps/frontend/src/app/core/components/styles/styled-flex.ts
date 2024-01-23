import styled from 'styled-components';
import Flex from '../flex';
import { InputWrapperDirection } from '../input-wrapper';

export type StyledDynamicFlexProps = {
  direction: InputWrapperDirection;
};

export const StyledFlex = styled(Flex)`
  display: flex;
`;

export const StyledDynamicFlex = styled(StyledFlex)<StyledDynamicFlexProps>`
  ${(props: StyledDynamicFlexProps) =>
    props.direction === 'row'
      ? 'flex-direction: row;'
      : 'flex-direction: column; align-items: flex-start; '}
`;

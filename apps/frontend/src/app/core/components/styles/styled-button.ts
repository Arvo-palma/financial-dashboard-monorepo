// ;[
//   'relative transition outline-none focus-visible:ring-4',
//   grow ? 'flex-1' : '',
//   sizeClassMap[size],
//   shapeClassMap[shape],
//   variantClassMap[variant][intent] || '',
//   !pending && !disabled ? enabledVariantClassMap[variant][intent] : '',
//   pending ? pendingClasses : '',
//   disabled ? disabledClasses : '',
//   disabled ? variantDisabledClassMap[variant][intent] || '' : '',
// ].join(' ')

import styled from 'styled-components';
import { Intent, Size } from '../../types/theme-type';
import { ButtonShape, ButtonVariant } from '../button';

type StyleButtonProps = {
  intent?: Intent;
  variant?: ButtonVariant;
  pending?: boolean;
  disabled?: boolean;
  size?: Size;
  shape?: ButtonShape;
  grow?: boolean;
};

export const StyledButton = styled.button<StyleButtonProps>`
  position: relative;
  outline-style: none;
  &:focus-visible: {
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width))
      var(--tw-ring-color);
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  ${(props: StyleButtonProps) => (props.pending ? 'cursor: progress;' : '')}
  ${(props: StyleButtonProps) =>
    props.disabled ? 'border-style: dashed; cursor: not-allowed; box-shadow: none; ' : ''}
    padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.375rem;
  color: #f3f1f3;
  background-color: #2b2930;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  &:hover {
    background-color: #4d5151;
    color: #f3f1f3;
  }
  &:active {
    background-color: #b6dcfb;
    color: #121212;
  }
  &:focus {
    --ring-color: #a5b4fc;
  }
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
`;

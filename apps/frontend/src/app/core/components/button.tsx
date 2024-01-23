import React from 'react';
import { Intent, Size } from '../types/theme-type';
import { StyledButton } from './styles/styled-button';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonShape = 'pill' | 'rounded';

export type ButtonProps = {
  label: string;
  icon?: React.ReactNode;
  intent?: Intent;
  variant?: ButtonVariant;
  pending?: boolean;
  disabled?: boolean;
  size?: Size;
  type?: 'submit' | 'button';
  shape?: ButtonShape;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  grow?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  pending,
  disabled,
  size = 'md',
  type,
  onClick,
}) => {
  return (
    <StyledButton
      tabIndex={pending || disabled ? -1 : undefined}
      type={type}
      disabled={disabled}
      onClick={(event) => {
        if (pending) {
          return;
        }
        onClick?.(event);
      }}
    >
      {pending && (
        <div>
          <Spinner className={['text-current', spinnerSizeMap[size]].join(' ')} />
        </div>
      )}
      <div>
        {icon}
        {label}
      </div>
    </StyledButton>
  );
};

export default Button;

//By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
function Spinner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={className}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
}

const spinnerSizeMap: Record<Size, string> = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
  xl: 'w-8 h-8',
};

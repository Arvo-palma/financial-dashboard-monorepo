import React from 'react';

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Row: React.FC<RowProps> = React.forwardRef<HTMLInputElement, RowProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Row.displayName = 'Row';

export default Row;

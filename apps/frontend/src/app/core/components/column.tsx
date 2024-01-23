import React from 'react';

export interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Column: React.FC<ColumnProps> = React.forwardRef<HTMLInputElement, ColumnProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Column.displayName = 'Column';

export default Column;

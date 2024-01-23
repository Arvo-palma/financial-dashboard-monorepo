import React from 'react';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Flex: React.FC<FlexProps> = React.forwardRef<HTMLInputElement, FlexProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

export default Flex;

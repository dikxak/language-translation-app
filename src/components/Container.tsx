import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps): React.JSX.Element => (
  <div className="container">{children}</div>
);

export default Container;

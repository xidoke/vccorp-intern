import React from 'react';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-background">
      {children}
    </div>
  );
};

export default LoginLayout;

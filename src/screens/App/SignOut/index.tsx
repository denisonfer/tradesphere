import React from 'react';
import { useAuthStore } from 'src/stores/useAuthStore';

const SignOut: React.FC = () => {
  const clearTokens = useAuthStore((state) => state.clearTokens());

  clearTokens;

  return <></>;
};

export default SignOut;

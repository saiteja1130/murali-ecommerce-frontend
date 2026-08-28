import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { StoreProvider, useStore, useCart } from './StoreContext';
import { HeroProvider, useHero } from './HeroContext';

export const RootProvider = ({ children }) => {
  return (
    <AuthProvider>
      <StoreProvider>
        <HeroProvider>
          {children}
        </HeroProvider>
      </StoreProvider>
    </AuthProvider>
  );
};

export { useAuth, useStore, useCart, useHero };
export default RootProvider;

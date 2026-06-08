import React, { createContext, useState, useContext, useEffect } from "react";
import { appParams } from "@/lib/app-params";

const db =
  globalThis.__APP_DB__ || {
    auth: {
      isAuthenticated: async () => false,
      me: async () => null,
      logout: () => {},
      redirectToLogin: () => {}
    },
    entities: new Proxy(
      {},
      {
        get: () => ({
          filter: async () => [],
          get: async () => null,
          create: async () => ({}),
          update: async () => ({}),
          delete: async () => ({})
        })
      }
    )
  };

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  // ✅ FIXED: no backend / no axios / no API calls
  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);

      // STATIC MODE (GitHub Pages safe)
      const publicSettings = {
        appName: "Financial Literacy App",
        mode: "static"
      };

      setAppPublicSettings(publicSettings);

      if (appParams?.token) {
        await checkUserAuth();
      } else {
        setIsLoadingAuth(false);
        setIsAuthenticated(false);
        setAuthChecked(true);
      }

      setIsLoadingPublicSettings(false);
    } catch (error) {
      console.error("App state error:", error);

      setAuthError({
        type: "unknown",
        message: error.message || "Failed to load app"
      });

      setIsLoadingAuth(false);
      setIsLoadingPublicSettings(false);
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);

      const currentUser = await db.auth.me();

      setUser(currentUser);
      setIsAuthenticated(true);
      setAuthChecked(true);
      setIsLoadingAuth(false);
    } catch (error) {
      console.error("Auth error:", error);

      setUser(null);
      setIsAuthenticated(false);
      setAuthChecked(true);
      setIsLoadingAuth(false);

      if (error?.status === 401 || error?.status === 403) {
        setAuthError({
          type: "auth_required",
          message: "Authentication required"
        });
      }
    }
  };

  const logout = (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);

    if (shouldRedirect) {
      db.auth.logout?.(window.location.href);
    } else {
      db.auth.logout?.();
    }
  };

  const navigateToLogin = () => {
    db.auth.redirectToLogin?.(window.location.href);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        authChecked,
        logout,
        navigateToLogin,
        checkUserAuth,
        checkAppState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
const checkAppState = async () => {
  try {
    setIsLoadingPublicSettings(true);
    setAuthError(null);

    // FIX: remove backend call (GitHub Pages has no /prod API)
    const publicSettings = {
      appName: "Financial Literacy App",
      mode: "static"
    };

    setAppPublicSettings(publicSettings);

    if (appParams.token) {
      await checkUserAuth();
    } else {
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
      setAuthChecked(true);
    }

    setIsLoadingPublicSettings(false);
  } catch (error) {
    console.error(error);

    setAuthError({
      type: "unknown",
      message: error.message || "Failed to load app"
    });

    setIsLoadingAuth(false);
    setIsLoadingPublicSettings(false);
  }
};
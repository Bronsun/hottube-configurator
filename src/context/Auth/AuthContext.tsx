import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ParseJwt } from "../../utils/jwt";
import { ROUTES } from "../../constants/routes";
import { JWTModel } from "../../models/JWTModel";
import { API_BASE_URL, headersGlobal } from "../../query/constants";
import { useNavigate } from "react-router";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isTokenValid: () => boolean;
  getTokenPayload: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  isUserLogin: () => boolean;
  userData: () => JWTModel | null;
  clearTokens: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()



  // On initial load, get stored tokens and refresh if needed.
  useEffect(() => {
    const storedAccessToken = sessionStorage.getItem("accessToken");
    const storedRefreshToken = sessionStorage.getItem("refreshToken");
    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
    setLoading(false);
    if (storedAccessToken) {
      refreshAuthToken();
    }
   

  }, []);

  const setTokens = (newAccessToken: string, newRefreshToken: string) => {
    sessionStorage.setItem("accessToken", newAccessToken);
    sessionStorage.setItem("refreshToken", newRefreshToken);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
  };

  const clearTokens = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
  };

  const isTokenValid = (): boolean => {
    if (!accessToken) return false;
    const payload = ParseJwt(accessToken);
    if (!payload || !payload.exp) return false;
    return Date.now() < payload.exp * 1000;
  };

  const isUserLogin = (): boolean => {
    return isTokenValid();
  };

  const refreshAuthToken = async (): Promise<void> => {
    if (!refreshToken && !loading) {
    
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          ...headersGlobal,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: sessionStorage.getItem("refreshToken"),
        }),
      });

      if (!response.ok) {
        logout();
        return;
      }
      const data = await response.json();
      if (data.access_token && data.refresh_token) {
        setTokens(data.access_token, data.refresh_token);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  const userData = (): JWTModel | null => {
    return accessToken ? ParseJwt(accessToken) : null;
  };

  const logout = () => {
    clearTokens();
    navigate(ROUTES.LOGIN)
  };

  const getTokenPayload = () => {
    return accessToken ? ParseJwt(accessToken) : null;
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setTokens,
        clearTokens,
        isTokenValid,
        getTokenPayload,
        isUserLogin,
        userData,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

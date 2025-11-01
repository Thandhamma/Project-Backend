import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => {
    // 1. ✅ อ่านจาก localStorage "แค่ครั้งแรก" ที่โหลด
    return localStorage.getItem("token");
  });

  // (useEffect ไม่จำเป็นแล้ว เพราะเราอ่านใน useState)

  // 2. ✅ (แก้ไข) ห่อหุ้มฟังก์ชัน 'login' และ 'logout'
  // ด้วย 'useCallback' (หรือปล่อยไว้ก็ได้ แต่ useMemo ข้างล่างสำคัญกว่า)
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // 3. ✅ (สำคัญที่สุด) ห่อหุ้ม 'value' ทั้งหมดด้วย 'useMemo'
  // นี่คือตัวแก้บั๊ก F5 ครับ
  // มันจะบอก React ว่า "ให้สร้าง object นี้ใหม่ *ต่อเมื่อ* 'token' เปลี่ยน"
  const authValue = useMemo(
    () => ({
      isAuthenticated: !!token,
      token,
      login,
      logout,
    }),
    [token]
  ); // <-- มันจะอัปเดตทุกครั้งที่ 'token' เปลี่ยน

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("AuthContext.tsx loaded");
  if (context === null) {
    throw new Error("useAuth ต้องถูกเรียกใช้ภายใน AuthProvider");
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// 1. กำหนดหน้าตาของข้อมูลใน Context
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// 2. สร้าง Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. สร้าง "Provider" (ตัวห่อหุ้มแอป)
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // 4. เมื่อแอปโหลด, เช็คว่ามี Token ใน localStorage (เคย Login ค้างไว้) หรือไม่
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // 5. ฟังก์ชันสำหรับ Login
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // เก็บ Token ไว้ในเครื่อง
  };

  // 6. ฟังก์ชันสำหรับ Logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // ลบ Token ออก
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!token, // ถ้ามี token = true, ถ้าไม่มี = false
      token, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// 7. สร้าง Hook สั้นๆ ไว้เรียกใช้
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth ต้องถูกเรียกใช้ภายใน AuthProvider');
  }
  return context;
};
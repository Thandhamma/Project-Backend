import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// รับ 'children' (ก็คือหน้า <Profile /> ที่เราส่งมา)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // ถ้ายังไม่ Login, เตะกลับไปหน้า Home
    return <Navigate to="/" replace />;
  }

  // ถ้า Login แล้ว, แสดงผล 'children' (หน้า Profile) ตามปกติ
  return <>{children}</>;
};

export default ProtectedRoute;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 1. เพิ่ม State สำหรับ Confirm Password
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // เคลียร์ error เก่า

    // ---------------------------------------------------
    // 2. เพิ่มการตรวจสอบ (Validation) ก่อนส่ง Request
    // ---------------------------------------------------
    if (username.length < 7 || username.length > 20) {
      setError("Username ต้องมีความยาว 7-20 ตัวอักษร");
      return; // หยุดการทำงาน
    }

    if (password !== confirmPassword) {
      setError("รหัสผ่านทั้งสองช่องไม่ตรงกัน");
      return; // หยุดการทำงาน
    }
    // ---------------------------------------------------

    // 1. เรียก API ของ Backend
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        // 2. ถ้าสมัครสำเร็จ, ไปหน้า Home (เพราะ Login เราเป็น Modal)
        navigate("/"); // <-- แก้ไขจาก '/login' เป็น '/'
      } else {
        // 3. ถ้า Error (เช่น username ซ้ำ)
        const errorData = await response.json();
        setError(errorData.message || "สมัครสมาชิกไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err); // ดู Error จริงๆ ใน Console
      // 4. (แก้ไข) เพิ่มคำใบ้เรื่อง CORS ใน catch
      setError("ไม่สามารถเชื่อมต่อ Server ได้ (โปรดตรวจสอบ CORS บน Backend)");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Username </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* 3. เพิ่ม Input Field สำหรับ Confirm Password */}
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* 4. แสดง Error ถ้ามี */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-pink-500 rounded-md hover:bg-pink-600"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center">
          มีบัญชีอยู่แล้ว?{" "}
          <Link to="/" className="text-pink-500 hover:underline">
            Login ที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

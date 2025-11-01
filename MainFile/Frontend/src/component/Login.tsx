// 1. Import 'useNavigate'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// (ไม่ต้อง import useAuth ที่นี่ก็ได้ ถ้าเราส่ง onLoginSuccess เข้ามา)

// 2. เปลี่ยน Props ที่รับเข้ามา
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string) => void; // เปลี่ยนจาก onLogin
}
const Login: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // 3. เรียกใช้ useNavigate

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const loginBody: { [key: string]: string } = { password };
    if (identifier.includes("@")) {
      loginBody.email = identifier;
    } else {
      loginBody.username = identifier;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginBody),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.user.id);

        // 4. เรียก onLoginSuccess พร้อมส่ง token กลับไปให้ App.tsx
        onLoginSuccess(data.access_token);

        if (data.role === "admin") {
          navigate("/admin/products");
        } else {
          navigate("/");
        }
      } else {
        setError("Username/Email หรือ Password ไม่ถูกต้อง");
      }
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อ Server ได้");
    }
  };

  // 5. ฟังก์ชันสำหรับกดปุ่ม "Sign up"
  const handleSignUpClick = () => {
    onClose(); // สั่งปิด Modal
    navigate("/register"); // สั่งย้ายหน้า
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      {" "}
      {/* 6. แก้ bg-opacity ตามที่ชอบ */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-3xl cursor-pointer"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {/* 7. สร้าง form และใช้ onSubmit */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full mb-3 p-2 border rounded"
          />

          {/* ... (โค้ด Input Password + ปุ่มสลับตา ... อยู่ที่นี่) ... */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded pr-10"
            />
            {/* ... (ปุ่มสลับตา) ... */}
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center mb-3">{error}</p>
          )}

          <button
            type="submit" // 8. เปลี่ยนเป็น type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3 font-semibold"
          >
            Login
          </button>
        </form>{" "}
        {/* 7. ปิด form */}
        {/* 9. แก้ไข "Sign In" (Sign Up) */}
        <div className="flex justify-between text-sm mb-4">
          <button
            type="button"
            onClick={handleSignUpClick} // 10. เรียกฟังก์ชันใหม่
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign up for free
          </button>
          <div className="text-blue-500 hover:underline cursor-pointer">
            Forget Password?
          </div>
        </div>
        {/* ... (Social Login Buttons) ... */}
      </div>
    </div>
  );
};

export default Login;

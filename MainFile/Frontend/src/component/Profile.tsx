import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// 1. สร้าง Interface (หน้าตา) ของข้อมูลที่จะได้รับกลับมา
interface UserProfile {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const Profile: React.FC = () => {
  // 2. ดึง Token มาจาก AuthContext
  const { token } = useAuth();

  // 3. สร้าง State ไว้เก็บข้อมูล Profile
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 4. ให้มันทำงานเมื่อหน้านี้ถูกโหลด (และเมื่อ 'token' พร้อมใช้งาน)
  useEffect(() => {
    // ถ้าไม่มี token ก็ไม่ต้องทำอะไร
    if (!token) {
      setError("คุณยังไม่ได้ Login");
      return;
    }

    const fetchProfile = async () => {
      try {
        // 5. เรียก API (จาก Swagger ของคุณ)
        const response = await fetch("http://localhost:3000/profile/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 6. (สำคัญที่สุด) ส่ง Token ไปใน Header
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const raw = await response.json();
          console.log("Profile response:", raw);

          // map ให้ตรงกับ UserProfile
          const data: UserProfile = {
            _id: raw.user?._id || raw._id,
            username: raw.user?.username || raw.username,
            email: raw.user?.email || raw.email,
            role: raw.user?.role || raw.role,
          };

          setProfile(data);
        } else {
          // ถ้า Token หมดอายุ หรือไม่ถูกต้อง
          setError("ไม่สามารถโหลดข้อมูล Profile ได้ (Token อาจหมดอายุ)");
        }
      } catch (err) {
        setError("ไม่สามารถเชื่อมต่อ Server ได้");
      }
    };

    fetchProfile();
  }, [token]); // 8. รัน Effect นี้ใหม่ทุกครั้งที่ 'token' เปลี่ยน

  // --- 9. ส่วนแสดงผล ---

  // (ระหว่างรอโหลด)
  if (!profile && !error) {
    return <div className="container mx-auto p-8">Loading profile...</div>;
  }

  // (ถ้า Error)
  if (error) {
    return <div className="container mx-auto p-8 text-red-500">{error}</div>;
  }

  // (ถ้าสำเร็จ)
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Username:</span> {profile?.username}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {profile?.email}
          </div>
          <div>
            <span className="font-semibold">Role:</span> {profile?.role}
          </div>
          <div>
            <span className="font-semibold">User ID:</span> {profile?._id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

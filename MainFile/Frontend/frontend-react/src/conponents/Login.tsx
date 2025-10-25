import React from 'react';
const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => (
    <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <button
            onClick={onLogin}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Log In
        </button>
    </div>
);
export default Login
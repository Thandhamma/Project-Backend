import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ backgroundColor: "black" }}>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "2px 2px 5px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Care Bear Wonderland 🧸
        </h1>

        <p
          style={{
            fontSize: "1.5rem",
            marginBottom: "2rem",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          Discover our adorable handmade dolls that bring smiles and love to
          your home 💖
        </p>

        <Link
          to="/Product"
          style={{
            backgroundColor: "#ff6f91",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "30px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLAnchorElement).style.backgroundColor = "#ff4f7a")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLAnchorElement).style.backgroundColor = "#ff6f91")
          }
        >
          🛍️ Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Home;

import React, { useState } from "react";

const Accueil = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleClientSpaceClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div style={{ backgroundColor: "#4033FF", color: "white", fontFamily: "Arial, sans-serif", height: "100vh" }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0rem 7rem", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="logo.png" alt="ShipFlow Logo" style={{ height: "100px", marginRight: "15px" }} />
                    <h1 style={{ fontSize: "2.7rem" ,color:"#ECEBFF",marginTop:"26px" }}>ShipFlow</h1>
                </div>
                <nav style={{ position: "relative" }}>
                    <a href="acceuil" style={{ margin: "0 20px", color: "white", textDecoration: "none", fontSize: "1.5rem" }}>Acceuil</a>
                    <a href="tracking" style={{ margin: "0 20px", color: "white", textDecoration: "none", fontSize: "1.5rem" }}>Tracking</a>
                    <a href="contact" style={{ margin: "0 20px", color: "white", textDecoration: "none", fontSize: "1.5rem" }}>Contact</a>
                    <button
                        onClick={handleClientSpaceClick}
                        style={{
                            backgroundColor: "#090BE6",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            padding: "0.75rem 1.5rem",
                            cursor: "pointer",
                            fontSize: "1.25rem",
                            marginLeft:"62px"
                        }}
                    >
                        Espace Client
                    </button>
                    {isDropdownOpen && (
                        <div style={{
                            position: "absolute",
                            top: "100%",
                            right: "0",
                            backgroundColor: "#f0f0f0",
                            color: "#4a4aff",
                            borderRadius: "10px",
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                            marginTop: "0.5rem",
                            zIndex: 1000,
                            width: "250px"
                        }}>
                            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                                <li style={{ padding: "1.5rem", borderBottom: "1px solid #ddd", cursor: "pointer", textAlign: "center", fontSize: "1.25rem" }}><a href="./Login">Se connecter</a></li>
                                <li style={{ padding: "1.5rem", cursor: "pointer", textAlign: "center", fontSize: "1.25rem" }}><a href="./Register">Créer un compte</a></li>
                            </ul>
                        </div>
                    )}
                </nav>
            </header>
            <main style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3rem 6rem" }}>
                <div>
                    <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>Bienvenue Chez ShipFlow </h2>
                    <h1 style={{ fontSize: "4rem", fontWeight: "bold", lineHeight: "1.2" }}>Solution Intelligente,<br /> Livraison Transparente</h1>
                    <button style={{
                        marginTop: "1.5rem",
                        backgroundColor: "white",
                        color: "#4a4aff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "1rem 2rem",
                        fontSize: "1.25rem",
                        cursor: "pointer"
                    }}>Découvrir</button>
                </div>
                <div>
                    <img
                        src="./illustration.png"
                        alt="Illustration"
                        style={{
                            width: "500px",
                            animation: "verticalMove 3s ease-in-out infinite"
                        }}
                    />
                </div>
            </main>
            <style>
                {`
                    @keyframes verticalMove {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-20px);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Accueil;

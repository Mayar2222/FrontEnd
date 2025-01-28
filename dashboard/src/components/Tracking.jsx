import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";

const Tracking = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const handleInputChange = (e) => {
        setOrderNumber(e.target.value);
    };
    const handleClientSpaceClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleSearch = () => {
        // Implement logic to track the package using the orderNumber
        console.log('Tracking order:', orderNumber);
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "1",
                    marginTop:"100px"
                }}
            >
                <h1 className="title">Suivre Votre Colis</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="ENTER YOUR ORDER NUMBER"
                        value={orderNumber}
                        onChange={handleInputChange}
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="search-button">
                        SEARCH
                    </button>
                </div>
                <style jsx>{`
          .title {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 2rem;
          }

          .search-container {
            display: flex;
            width: 80%;
            max-width: 600px;
          }

          .search-input {
            flex-grow: 1;
            padding: 1rem;
            font-size: 1.2rem;
            border: none;
            border-radius: 8px 0 0 8px;
            color:black;
          }

          .search-button {
            background-color: #ff5c5c;
            color: white;
            font-size: 1.2rem;
            padding: 1rem 2rem;
            border: none;
            border-radius: 0 8px 8px 0;
            cursor: pointer;
          }
        `}</style>
            </div>
            <footer style={{
                backgroundColor: "white",
                color: "#0d0d0e",
                padding: "1rem ",
                textAlign: "center",
                marginTop: "30rem"
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 7rem",marginRight:"226px", position: "relative" }}>
                            <img src="./logo.png"/>
                            <h1 style={{fontSize:"2rem"}}>ShipFlow</h1>
                        </div>
                        <h3>Notre solution vous intéresse ?</h3>
                        <p>
                            Nos experts en logistique sont là pour vous aider !

                        </p>

                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{
                            fontSize: "22px",
                            marginBottom: "15px", // Espacement sous le titre
                            textAlign: "left", // Aligner à gauche
                        }}>Informations</h2>
                        <p style={{ textAlign: "left" }}>Adresse 1: Ariana, Marie Curie ZI Chotrana 2, Tunis</p>
                        <p style={{ textAlign: "left" }}>Adresse 2: Boulevard 14 Janvier App A4-2, Résidence El Bahri, 4011 Hammam Sousse, Sousse</p>
                        <p style={{ textAlign: "left" }}>Tel: +216 36 435 220</p>
                        <p style={{ textAlign: "left" }}>Email: contact@ShipFlow.tn</p>
                    </div>


                    <div style={{ flex: 1 }}>
                        <h4>Suivez-nous</h4>
                        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#130fc2" }}>
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#198be8" }}>
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "#150dbd" }}>
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ee5a21" }}>
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a>
                        </div>
                    </div>
                </div>
                <div >
                    <h3 style={{ textAlign: "left",paddingLeft:"4rem" }}>ShipFlow</h3>
                    <p style={{ textAlign: "left",paddingLeft:"4rem" }}>&copy; 2024 ShipFlow. Tous droits réservés.</p>
                </div>

            </footer>
        </div>
    );
};

export default Tracking;

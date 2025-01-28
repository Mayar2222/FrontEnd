import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Vous pouvez ajouter ici la logique pour envoyer le formulaire.
        console.log('Formulaire soumis:', { name, email, subject, message });
        // Réinitialiser les champs du formulaire
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    const handleClientSpaceClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <header style={{ backgroundColor: "#4033FF", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0rem 7rem", position: "relative" }}>
                <div style={{ display: "flex" }}>
                    <img src="logo.png" alt="ShipFlow Logo" style={{ height: "100px", marginRight: "15px" }} />
                    <h1 style={{ fontSize: "2.7rem", color: "#ECEBFF", marginTop: "35px" }}>ShipFlow</h1>
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
                            marginLeft: "62px"
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

            <main style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0rem 0rem" }}>
                <img
                    src="./contact.png"
                    alt="contact"
                    style={{
                        width: "100%",
                    }}
                />
            </main>

            <div className="contact-info" style={{ marginLeft: "2rem" }}>
                <div className="contact-item">
                    <FontAwesomeIcon icon={faPhone} size="4x" color="white" />
                    <div>
                        <p>Tel : +216 36 435 220</p>
                        <p>Lundi-Vendredi (8h30-17h)</p>
                        <p>Samedi (8h30-12h30)</p>
                    </div>
                </div>
                <div className="contact-item">
                    <FontAwesomeIcon icon={faEnvelope} size="4x" color="white" />
                    <p>Email : Contact@massar.tn</p>
                </div>
                <div className="contact-item" style={{ marginRight: "2rem" }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" color="white" />
                    <div>
                        <p>boulevard 14 janvier App A4-2,</p>
                        <p>résidence El Bahri, 4011 hammam</p>
                        <p>Sousse, Sousse</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{width:"550px", marginTop: "2rem", marginLeft: "29rem", padding: "1rem", backgroundColor: "#C5CDD7", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>

                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="name" style={{ display: "block", fontWeight: "bold" }}>Nom:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="email" style={{ display: "block", fontWeight: "bold" }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="subject" style={{ display: "block", fontWeight: "bold" }}>Sujet:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="message" style={{ display: "block", fontWeight: "bold" }}>Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows="6"
                        style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
                    ></textarea>
                </div>
                <button type="submit" style={{ backgroundColor: "#4033FF", color: "white", padding: "0.8rem 2rem", borderRadius: "8px", border: "none", fontSize: "1.1rem", cursor: "pointer" }}>
                    Envoyer le message
                </button>
            </form>


            <style jsx>{`
                .contact-info {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 2rem;
                    margin-top: 2rem;
                }
                .contact-item {
                    background-color: #4033FF;
                    border-radius: 10px;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                .contact-item i {
                    font-size: 3rem;
                    color: #ECEBFF;
                    margin-bottom: 1rem;
                }
                .contact-item p {
                    font-size: 1.2rem;
                    margin: 0.5rem 0;
                }
            `}</style>
            <footer style={{
                backgroundColor: "#4033FF",
                color: "#ECEBFF",
                padding: "2rem 0",
                textAlign: "center",
                marginTop: "2rem"
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
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ECEBFF" }}>
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ECEBFF" }}>
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ECEBFF" }}>
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ECEBFF" }}>
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

export default Contact;

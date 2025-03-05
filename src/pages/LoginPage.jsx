import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
  position: relative;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;
  &:hover {
    background: #5563c1;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 10px 0;
`;

const LoginPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      // La redirection est maintenant gérée par AuthContext
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <BackgroundVideo autoPlay loop muted playsInline>
        <source
          src="../media/20250304_1648_MountainSunriseSerenity_simple_compose_01.mp4"
          type="video/mp4"
        />
      </BackgroundVideo>
      <Card>
        <h2>{isRegistering ? "Inscription" : "Connexion"}</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading
            ? "Chargement..."
            : isRegistering
              ? "S'inscrire"
              : "Se connecter"}
        </Button>
        <ToggleButton
          onClick={() => setIsRegistering(!isRegistering)}
          disabled={isLoading}
        >
          {isRegistering
            ? "Déjà un compte ? Se connecter"
            : "Pas de compte ? S'inscrire"}
        </ToggleButton>
      </Card>
    </Container>
  );
};

export default LoginPage;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard'); // Rediriger vers Dashboard si authentifié
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return null; // Ce composant ne rend rien, il sert uniquement à la redirection
}

export default AuthRedirect;
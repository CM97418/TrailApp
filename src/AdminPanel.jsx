import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

const RoleSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/"); // Redirige si l'utilisateur n'est pas admin
      return;
    }

    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs");
      }
    };

    fetchUsers();
  }, [user, navigate]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { role: newRole });
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      setError("Erreur lors de la mise à jour du rôle");
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <Container>
      <Title>Panneau d'administration</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <UserList>
        {users.map((u) => (
          <UserItem key={u.id}>
            <span>{u.email}</span>
            <RoleSelect
              value={u.role}
              onChange={(e) => handleRoleChange(u.id, e.target.value)}
            >
              <option value="coureur">Coureur</option>
              <option value="organisateur">Organisateur</option>
              <option value="admin">Administrateur</option>
            </RoleSelect>
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
};

export default AdminPanel;
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const useUserInformation = (userId) => {
  const [usersEmail, setUserEmail] = useState("");
  const [userCreatedAt, setUserCreatedAt] = useState("");
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserEmail(user.email);
        setUserCreatedAt(formatDate(user.metadata.creationTime));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return formattedDate;
  };

  return { usersEmail, userCreatedAt };
};

export default useUserInformation;

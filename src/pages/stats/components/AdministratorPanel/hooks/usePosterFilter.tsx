import { useEffect, useState } from "react";
import { useCollection } from "../../../../../hooks/useCollection";
import { useUsersContextProvider } from "../../context/UsersContext";
import { poster } from "../../../../../components/PosterItem";

type UsersPosters = {
  email: string;
  uid: string;
  posters: poster[];
};

const usePosterFilter = () => {
  const { documents: userPosters } = useCollection<poster>("yourCatalog");
  const { users } = useUsersContextProvider();
  const [usersPosters, setUsersPosters] = useState<UsersPosters[] | null>(null);
  useEffect(() => {
    if (userPosters && userPosters.length > 0 && users && users.length > 0) {
      const filteredUsers: UsersPosters[] = [];

      users.forEach((user) => {
        if (user?.email && user?.uid) {
          const userPostersFiltered = userPosters.filter((poster) => poster.uid === user?.uid);
          if (userPostersFiltered.length > 0) {
            filteredUsers.push({
              email: user.email,
              uid: user.uid,
              posters: userPostersFiltered,
            });
          }
        }
      });
      setUsersPosters(filteredUsers as UsersPosters[]);
    }
  }, [userPosters, users]);

  return { usersPosters };
};

export default usePosterFilter;

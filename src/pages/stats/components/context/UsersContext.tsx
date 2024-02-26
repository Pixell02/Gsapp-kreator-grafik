import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useCollection } from "../../../../hooks/useCollection";
import { License } from "../../../../context/LicenseContext";

export type User = {
  license: "free-trial" | "no-license" | "admin" | "full-license";
  uid: string;
  email: string;
};

type props = {
  users: User[] | null;
};

const UsersContext = createContext<props | null>(null);

export const UsersProvider = ({ children }: PropsWithChildren) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const { documents: licenseUsers } = useCollection<License>("user");
  const { documents: userEmails } = useCollection<{ email: string; uid: string }>("email");

  useEffect(() => {
    if (licenseUsers && licenseUsers?.length > 0 && userEmails && userEmails?.length > 0) {
      const formattedUser: User[] = [];
      licenseUsers?.map((user) => {
        const userEmail = userEmails?.find((item) => item.uid === user.uid);
        if (userEmail && user?.uid) {
          formattedUser.push({ license: user.license, uid: user.uid, email: userEmail.email });
        }
      });
      setUsers(formattedUser);
    }
  }, [licenseUsers, userEmails]);

  return <UsersContext.Provider value={{ users }}>{children}</UsersContext.Provider>;
};

export const useUsersContextProvider = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw Error("users context is not available");
  }
  return context;
};

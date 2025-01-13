import { ReactNode, useEffect, useState } from "react";
import { GetUserInfoResponse } from "shared/src/responses/auth/getInfo";
import { toaster } from "../../components/ui/toaster";
import { getUserInfo } from "../../services/getUserInfo";
import { UserContext } from "./UserContext";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = useState<GetUserInfoResponse | null>(null);

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        toaster.create({
          title: "Something went wrong with your login",
          description: "Please try again",
          type: "error",
          duration: 3000,
          action: { label: "Dismiss", onClick: () => {} },
        });
      });
  }, []);

  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
};

export default UserProvider;

import { createContext } from "react";
import { GetUserInfoResponse } from "shared/src/responses/auth/getInfo";

export const UserContext = createContext<GetUserInfoResponse | null>(null);

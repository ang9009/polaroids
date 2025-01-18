import { useQuery } from "@tanstack/react-query";
import { userQueryKey } from "../data/constants";
import { getUserInfo } from "../services/getUserInfo";

/**
 * A hook that fetches the user's currently logged in info. If the user is not
 * logged in, the current user object will be null.
 */
export const useUser = () =>
  useQuery({
    queryKey: [userQueryKey],
    queryFn: getUserInfo,
    retry: 0,
    staleTime: 1000 * 60 * 60 * 10,
  });

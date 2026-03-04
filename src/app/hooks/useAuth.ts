// hooks/useAuth.ts
import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth;
};

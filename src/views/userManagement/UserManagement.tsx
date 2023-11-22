import { Route, Routes } from "react-router-dom";
import { SearchUser } from "./SearchUser";

export const UserManagement = () => {
  return (
    <Routes>
      <Route element={<SearchUser />} path="/" />
    </Routes>
  );
};

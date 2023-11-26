import { Route, Routes } from "react-router-dom";
import { SearchUser } from "./SearchUser";
import { CreateUser } from "./CreateUser";

export const UserManagement = () => {
  return (
    <Routes>
      <Route element={<SearchUser />} path="/" />
      <Route element={<CreateUser />} path="/create-user" />
      <Route element={<CreateUser />} path="/view-user" />
      <Route element={<CreateUser />} path="/edit-user" />
    </Routes>
  );
};

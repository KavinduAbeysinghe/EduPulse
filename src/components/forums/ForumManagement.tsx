import React from "react";
import { Route, Routes } from "react-router-dom";
import { SearchForums } from "./SearchForums";

export const ForumManagement = () => {
  return (
    <Routes>
      <Route element={<SearchForums />} path="/" />
    </Routes>
  );
};

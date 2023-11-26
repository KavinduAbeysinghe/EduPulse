import React from "react";
import { Route, Routes } from "react-router-dom";
import { SearchForums } from "./SearchForums";
import { ViewForum } from "./ViewForum";

export const ForumManagement = () => {
  return (
    <Routes>
      <Route element={<SearchForums />} path="/" />
      <Route element={<ViewForum />} path="/view" />
    </Routes>
  );
};

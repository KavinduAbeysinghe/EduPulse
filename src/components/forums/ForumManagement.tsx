import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ViewForum } from "./ViewForum";

const SearchForums = React.lazy(() => import("./SearchForums"));

export const ForumManagement = () => {
  return (
    <Routes>
      <Route
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SearchForums />
          </Suspense>
        }
        path="/"
      />
      <Route element={<ViewForum />} path="/view" />
    </Routes>
  );
};

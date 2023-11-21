import { Route, Routes } from "react-router-dom";
import { SearchCourse } from "./SearchCourse";
import { CreateCourse } from "./CreateCourse";

export const CourseManagement = () => {
  return (
    <Routes>
      <Route element={<SearchCourse />} path="/" />
      <Route element={<CreateCourse />} path="/create-course" />
      <Route element={<CreateCourse />} path="/view-course" />
      <Route element={<CreateCourse />} path="/edit-course" />
    </Routes>
  );
};

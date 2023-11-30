import { Route, Routes } from "react-router-dom";
import { SearchModules } from "./SearchModules";
import { CreateModule } from "./CreateModule";
import HorizontalNonLinearStepper from "./StepperForm";

export const ModuleManagement = () => {
  return (
    <Routes>
      <Route element={<SearchModules />} path={"/"} />
      <Route element={<HorizontalNonLinearStepper />} path={"/view-module"} />
      <Route element={<HorizontalNonLinearStepper />} path={"/create-module"} />
      <Route element={<HorizontalNonLinearStepper />} path={"/edit-module"} />
    </Routes>
  );
};

import { Grid, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { ModuleContentCard } from "./ModuleContentCard";
import CustomizedAccordions from "../../components/accordion/CustomAccordion";
import { InnerModal } from "../../components/modals/CustomModal";
import { AddModuleMaterial } from "./AddModuleMaterial";
import { useFieldArray, useForm } from "react-hook-form";
import { moduleData, moduleMaterials, quizData } from "../../util";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation } from "react-router-dom";
import { AddQuiz } from "./AddQuiz";

export const ModuleContent = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [page, setPage] = useState<string>("");

  const [id, setId] = useState<any>("");

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const moduleObj = searchParams.get("module");
    if (moduleObj) {
      const mod = JSON.parse(moduleObj);
      const module = moduleData?.find((d: any) => d?.id === mod?.id);
      setPage(mod?.page);
      setId(mod?.id);
      setTitle(
        mod?.page === "view"
          ? "View Module"
          : mod?.page === "edit"
          ? "Edit Module"
          : "Create Module"
      );
    }
  }, [location]);

  const [modal, setModal] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);

  const [modalDetails, setModalDetails] = useState<any>(null);

  const [sectionList, setSectionList] = useState<Array<any>>([]);

  const defaultValues = {
    moduleMaterials: [],
    quizes: [],
  };

  const validationSchema = Yup.object().shape({
    moduleMaterials: Yup.array(),
    quizes: Yup.array(),
  });

  const { control, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    fields: moduleMaterialsFields,
    remove: removeModuleMaterials,
    append: appendModuleMaterials,
  } = useFieldArray({
    control,
    name: "moduleMaterials",
  });

  const {
    fields: quizFields,
    remove: removeQuiz,
    append: appendQuiz,
  } = useFieldArray({
    control,
    name: "quizes",
  });

  useEffect(() => {
    setValue("moduleMaterials", moduleMaterials);
    setValue("quizes", quizData);
  }, [moduleMaterials, quizData]);

  const setModuleMaterialModalDetails = () => {
    setModalDetails({
      maxWidth: "sm",
      title: "Add Module Materials",
      body: (
        <AddModuleMaterial
          moduleMaterials={moduleMaterialsFields}
          appendModuleMaterials={appendModuleMaterials}
          sectionList={moduleMaterialsFields?.map((m: any) => ({
            label: m?.title,
            value: m?.id,
          }))}
        />
      ),
    });
  };

  const openModuleMaterialsModal = () => {
    setModal("module");
    setModuleMaterialModalDetails();
    setShowModal(true);
  };

  const setQuizModalDetails = () => {
    setModalDetails({
      maxWidth: "lg",
      title: "Add Quiz",
      body: <AddQuiz appendQuiz={appendQuiz} quizes={quizFields} />,
    });
  };

  const openQuizModal = () => {
    setModal("quiz");
    setQuizModalDetails();
    setShowModal(true);
  };

  // useEffect(() => {
  //   if (moduleMaterialsFields?.length > 0) {
  //     setModuleMaterialModalDetails();
  //   }
  // }, [moduleMaterialsFields]);

  useEffect(() => {
    if (modal === "module") {
      setModuleMaterialModalDetails();
    } else if (modal === "quiz") {
      setQuizModalDetails();
    }
  }, [modal, moduleMaterialsFields]);

  return (
    <>
      <InnerModal
        open={showModal}
        setOpen={setShowModal}
        maxWidth={modalDetails?.maxWidth}
        title={modalDetails?.title}
        body={modalDetails?.body}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <ModuleContentCard
            header={"Module Materials"}
            onAddClick={openModuleMaterialsModal}
            isDisabled={page === "view"}
          >
            {moduleMaterialsFields.length ? (
              <CustomizedAccordions
                data={moduleMaterialsFields}
                isQuiz={false}
              />
            ) : (
              <Typography>No Module Materials Available</Typography>
            )}
          </ModuleContentCard>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ModuleContentCard
            header={"Assignments"}
            onAddClick={() => {}}
            isDisabled={page === "view"}
          >
            <CustomizedAccordions data={moduleMaterials} isQuiz={false} />
          </ModuleContentCard>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ModuleContentCard
            header={"Quizes"}
            onAddClick={openQuizModal}
            isDisabled={page === "view"}
          >
            <CustomizedAccordions data={quizFields} isQuiz={true} />
          </ModuleContentCard>
        </Grid>
      </Grid>
    </>
  );
};

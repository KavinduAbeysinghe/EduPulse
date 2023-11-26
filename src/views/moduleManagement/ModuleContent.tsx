import { Grid, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { ModuleContentCard } from "./ModuleContentCard";
import CustomizedAccordions from "../../components/accordion/CustomAccordion";
import { InnerModal } from "../../components/modals/CustomModal";
import { AddModuleMaterial } from "./AddModuleMaterial";
import { useFieldArray, useForm } from "react-hook-form";
import { moduleMaterials, quizData } from "../../util";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const ModuleContent = () => {
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
    setModuleMaterialModalDetails();
    setShowModal(true);
  };

  useEffect(() => {
    if (moduleMaterialsFields?.length > 0) {
      setModuleMaterialModalDetails();
    }
  }, [moduleMaterialsFields]);

  return (
    <>
      <InnerModal
        open={showModal}
        setOpen={setShowModal}
        maxWidth={"sm"}
        title={modalDetails?.title}
        body={modalDetails?.body}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <ModuleContentCard
            header={"Module Materials"}
            onAddClick={openModuleMaterialsModal}
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
          <ModuleContentCard header={"Assignments"} onAddClick={() => {}}>
            <CustomizedAccordions data={moduleMaterials} isQuiz={false} />
          </ModuleContentCard>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ModuleContentCard header={"Quizes"} onAddClick={() => {}}>
            <CustomizedAccordions data={quizFields} isQuiz={true} />
          </ModuleContentCard>
        </Grid>
      </Grid>
    </>
  );
};

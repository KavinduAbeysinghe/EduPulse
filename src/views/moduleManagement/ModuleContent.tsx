import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useRef, useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { FormCard } from "../../components/common/FormCard";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { ModuleContentCard } from "./ModuleContentCard";
import CustomizedAccordions from "../../components/accordion/CustomAccordion";
import file from "../../assets/files/sample.pdf";
import { InnerModal } from "../../components/modals/CustomModal";
import { AddModuleMaterial } from "./AddModuleMaterial";

export const ModuleContent = () => {
  const [files, setFiles] = useState<Array<any>>([]);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [modalDetails, setModalDetails] = useState<any>(null);

  const fileInputRef = useRef<any>(null);

  const handleBoxClick = () => {
    // Trigger file input click on Box click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: any) => {
    // Handle the selected files here
    const selectedFiles = e.target.files[0];
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.push(selectedFiles);
      return newFiles;
    });
    // notify.success("File upload success");
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.push(files);
      return newFiles;
    });
    // notify.success("File upload success");
  };

  const moduleMaterials = [
    {
      title: "Week 1",
      data: [
        {
          title: "Database Management Systems Lecture",
          file: file,
        },
        {
          title: "Database Management Systems Tutorial",
          file: file,
        },
      ],
    },
    {
      title: "Week 2",
      data: [
        {
          title: "Database Management Systems Lecture",
          file: file,
        },
        {
          title: "Database Management Systems Tutorial",
          file: file,
        },
      ],
    },
    {
      title: "Week 3",
      data: [
        {
          title: "Database Management Systems Lecture",
          file: file,
        },
        {
          title: "Database Management Systems Tutorial",
          file: file,
        },
      ],
    },
    {
      title: "Week 4",
      data: [
        {
          title: "Database Management Systems Lecture",
          file: file,
        },
        {
          title: "Database Management Systems Tutorial",
          file: file,
        },
      ],
    },
  ];

  const openModuleMaterialsModal = () => {
    setModalDetails({
      title: "Add Module Materials",
      body: <AddModuleMaterial />,
    });
  };

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
            <CustomizedAccordions data={moduleMaterials} />
          </ModuleContentCard>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ModuleContentCard header={"Assignments"} onAddClick={() => {}}>
            <CustomizedAccordions data={moduleMaterials} />
          </ModuleContentCard>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ModuleContentCard header={"Quizes"} onAddClick={() => {}}>
            <CustomizedAccordions data={moduleMaterials} />
          </ModuleContentCard>
        </Grid>
      </Grid>
    </>
  );
};

import { AvatarGroup, Avatar } from "@mui/material";
import React from "react";

interface AvatarGroupProps {
  images: Array<any>;
}

export const CustomAvatarGroup = ({ images }: AvatarGroupProps) => {
  return (
    <AvatarGroup
      max={4}
      sx={{
        justifyContent: "start",
      }}
    >
      {images?.map((img: any, index) => (
        <Avatar key={index} alt="Remy Sharp" src={img} />
      ))}
    </AvatarGroup>
  );
};

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumbs, Link } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const Breadcrumb = () => {
  const location = useLocation();

  const [paths, setPaths] = useState<Array<any>>([]);

  useLayoutEffect(() => {
    const pathStr = location?.pathname?.split("control/")[1];
    const pathNames = Array.from(new Set(pathStr?.split("/")));
    const paths = pathNames?.map((p: string) => {
      const name = p
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (match: any) => match.toUpperCase());
      return {
        name: name,
        path: `${location?.pathname?.split(p)[0]}${p}`,
      };
    });
    setPaths(paths);
  }, [location]);

  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <div role="presentation" onClick={() => {}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          sx={{ cursor: "pointer", fontSize: "small" }}
          underline="hover"
          color={"inherit"}
          onClick={() => {}}
        >
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        {paths?.map((p: any, index) => (
          <Link
            sx={{ cursor: "pointer", fontSize: "small" }}
            key={index}
            underline="hover"
            fontWeight={index === paths?.length - 1 ? 600 : 0}
            color={index === paths?.length - 1 ? "primary.main" : "inherit"}
            onClick={() => handleLinkClick(p?.path)}
          >
            {p?.name}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

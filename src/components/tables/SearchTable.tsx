import {
  IconButton,
  Pagination,
  Paper,
  Popover,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ActionButton from "../buttons/ActionButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TableData {
  tableData: Array<any>;
  tableHeaders: Array<string>;
  id: string;
  actionButtons?: Array<any>;
  paginate: boolean;
  viewMoreOptions?: Array<any>;
}

const SearchTable = ({
  tableData,
  tableHeaders,
  id,
  actionButtons,
  paginate,
  viewMoreOptions,
}: TableData) => {
  const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
    [`&.${tableCellClasses.head}`]: {
      color: "rgb(123, 128, 154)",
      // backgroundColor: "#F0F4F8",
      fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.hover,
    // },
    // // hide last border
    // "&:last-child td, &:last-child th": {
    //   border: 0,
    // },
  }));

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const paginatedData = tableData.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ID = open ? "simple-popover" : undefined;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableHeaders?.map((header) => (
              <StyledTableCell key={header} align="left">
                {header}
              </StyledTableCell>
            ))}
            {actionButtons?.length ? (
              <StyledTableCell></StyledTableCell>
            ) : (
              <></>
            )}
            {viewMoreOptions?.length ? (
              <StyledTableCell></StyledTableCell>
            ) : (
              <></>
            )}
          </TableRow>
        </TableHead>
        {tableData.length ? (
          <TableBody>
            {paginatedData?.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ borderLeft: row?.isIncompleted ? "5px solid red" : "" }}
              >
                {Object.entries(row).map(([key, value], index2) => (
                  <React.Fragment key={index2}>
                    {key !== id && key !== "isIncompleted" && (
                      <StyledTableCell align="left">
                        {<>{value}</>}
                      </StyledTableCell>
                    )}
                  </React.Fragment>
                ))}
                {actionButtons?.length ? (
                  <StyledTableCell align="right" width={116}>
                    {actionButtons?.map((b, index) => (
                      <ActionButton
                        key={index}
                        tooltip={b.tooltip}
                        icon={b.icon}
                        handleClick={() => {
                          return b.handleClick(row[id ? id : ""]);
                        }}
                      />
                    ))}
                  </StyledTableCell>
                ) : (
                  <></>
                )}
                {viewMoreOptions?.length ? (
                  <StyledTableCell align="right">
                    <Tooltip title={"More"}>
                      <IconButton onClick={handleClick}>
                        <FontAwesomeIcon
                          fontSize={"large"}
                          icon={faEllipsis}
                          style={{
                            cursor: "pointer",
                            marginLeft: 5,
                            marginRight: 5,
                            color: "gray",
                            verticalAlign: "center",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Popover
                      id={ID}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>
                        The content of the Popover.
                      </Typography>
                    </Popover>
                  </StyledTableCell>
                ) : (
                  <></>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableRow>
              <StyledTableCell
                align={"center"}
                colSpan={tableHeaders.length + 1}
              >
                No Data to Display
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        )}
      </Table>
      {paginate && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          {tableData?.length ? (
            <Pagination
              shape="rounded"
              count={Math.ceil(tableData.length / rowsPerPage)}
              color="primary"
              onChange={handleChangePage}
              page={page}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </TableContainer>
  );
};

export default SearchTable;

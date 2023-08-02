import React, { useState, useEffect } from "react";
// import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getAllReports } from "../../api/api";
import { Box, Typography } from "@mui/material";
import post from "../../assets/svg/post.svg";
import useMakeToast from "../../hooks/makeToast";
import { deletePost, deleteReport } from "../../api/api";
import Loading from "../../components/Loading";
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

function ReportPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const makeToast = useMakeToast();

  const fetchAllReports = async () => {
    const response = await getAllReports();
    if (response) {
      const postReport = response?.data?.data.filter(
        (el) => el?.label === "post"
      );
      setAllReports(postReport);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReports();
  }, []);

  const deleteUserHandler = async (id, listId) => {
    await deleteReport({ listId });
    const response = await deletePost(id);
    if (response) {
      const newPostList = allReports.filter((el) => el?._id !== listId);
      setAllReports(newPostList);
      makeToast("Post deleted successfully", "success", 3);
    } else {
      makeToast("Post deleted Not Deleted", "warn", 3);
    }
  };
  if (loading) {
    return (
      <>
        <Loading loading={loading} />
      </>
    );
  }
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {/* sx={{ maxHeight: 440 }} */}
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Type
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Post Image
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Heading
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Description
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Post Text
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Post Likes
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Post Comments
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Reporter Name
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Reporter Email
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Reporter Role
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Delete Post
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        user text
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })} */}

              {allReports &&
                allReports.map((row) => {
                  console.log(row?.scammerId);
                  return (
                    <TableRow hover tabIndex={-1} key={row?._id}>
                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {row.label}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="left">
                        <Box
                          sx={{
                            borderRadius: "7px",
                            overflow: "hidden",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <img
                            src={
                              row?.scammerId?.file[0]
                                ? row?.scammerId?.file[0]
                                : post
                            }
                            width="50px"
                            height="50px"
                            style={{
                              // borderRadius: "50%",
                              objectFit: "cover",
                              border: "1px solid gray",
                              width: "50px",
                            }}
                          />
                        </Box>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {row?.heading}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {row?.description}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {row?.scammerId?.text ? (
                              row?.scammerId?.text
                            ) : (
                              <Typography sx={{ color: "red" }}>
                                No Text
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {row?.scammerId?.likes?.length ? (
                              row?.scammerId?.likes?.length
                            ) : (
                              <Typography sx={{ color: "red" }}>0</Typography>
                            )}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {row?.scammerId?.comments?.length ? (
                              row?.scammerId?.comments?.length
                            ) : (
                              <Typography sx={{ color: "red" }}>0</Typography>
                            )}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {row?.reporterId?.firstName ? (
                              <>
                                {row?.reporterId?.firstName}{" "}
                                {row?.reporterId?.lastName}
                              </>
                            ) : (
                              <Typography
                                sx={{ color: "red", fontSize: "14px" }}
                              >
                                Not Available
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {row?.reporterId?.email ? (
                              <>{row?.reporterId?.email}</>
                            ) : (
                              <Typography
                                sx={{ color: "red", fontSize: "14px" }}
                              >
                                Not Available
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {row?.reporterId?.email ? (
                              <>{row?.reporterId?.accountType}</>
                            ) : (
                              <Typography
                                sx={{ color: "red", fontSize: "14px" }}
                              >
                                Not Available
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="left">
                        <button
                          style={{
                            padding: "5px",
                            minWidth: "80px",
                            border: "none",
                            outline: "none",
                            borderRadius: "4px",
                            backgroundColor: "#F24C3D",
                            color: "white",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            deleteUserHandler(row?.scammerId?._id, row?._id)
                          }
                        >
                          Post Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      </Paper>
      {allReports.length === 0 ? (
        <Box
          sx={{
            minHeight: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",  
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#888888",
            }}
          >
            There in no Record Available At this Moment
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

export default ReportPage;

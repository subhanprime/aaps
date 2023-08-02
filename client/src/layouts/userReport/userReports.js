import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getAllUserReport } from "../../api/api";
import { Box, Typography } from "@mui/material";
import post from "../../assets/svg/post.svg";
import useMakeToast from "../../hooks/makeToast";
import {
  deletePost,
  deleteReport,
  deleteUser,
  deleteUserReport,
} from "../../api/api";
import Loading from "../../components/Loading";
import person from "../../assets/svg/person.svg";
function UserReportPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const makeToast = useMakeToast();

  const fetchAllReports = async () => {
    const response = await getAllUserReport();
    if (response) {
      console.log("response", response);
      const postReport = response?.data?.data.filter(
        (el) => el?.label === "user"
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

  const deleteUserHandler = async (userId, listId) => {
    // await deleteUserReport({ listId });
    console.log("userId", userId);
    const response = await deleteUser({ userId });
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
                    Username
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    User Email
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    User Type
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    User Rating
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    sx={{
                      fontWeight: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Reporter Image
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
                            borderRadius: "50%",
                            overflow: "hidden",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <img
                            src={
                              row?.reportedUser?.profilePic
                                ? row?.reportedUser?.profilePic
                                : person
                            }
                            width="50px"
                            height="50px"
                            style={{
                              //   borderRadius: "50%",
                              scale: "1.1",
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
                            {row?.reportedUser?.firstName ? (
                              <>
                                {row?.reportedUser?.firstName}{" "}
                                {row?.reportedUser?.lastName}
                              </>
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
                            {row?.reportedUser?.email ? (
                              row?.reportedUser?.email
                            ) : (
                              <Typography sx={{ color: "red" }}>
                                No Email
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
                            {row?.reportedUser?.accountType ? (
                              row?.reportedUser?.accountType
                            ) : (
                              <Typography sx={{ color: "red" }}>
                                Type Not Found
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
                            {row?.reportedUser?.ratingStartValue ? (
                              <>{row?.reportedUser?.ratingStartValue}</>
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
                            borderRadius: "50%",
                            overflow: "hidden",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <img
                            src={
                              row?.reporterId?.profilePic
                                ? row?.reporterId?.profilePic
                                : person
                            }
                            width="50px"
                            height="50px"
                            style={{
                              //   borderRadius: "50%",
                              scale: "1.1",
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
                            {row?.reporterId?.accountType ? (
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
                            minWidth: "90px",
                            border: "none",
                            outline: "none",
                            borderRadius: "4px",
                            backgroundColor: "#F24C3D",
                            color: "white",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            deleteUserHandler(row?.reportedUser?._id, row?._id)
                          }
                        >
                          Delete User
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

export default UserReportPage;

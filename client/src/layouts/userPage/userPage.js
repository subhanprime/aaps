import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAllUser } from "../../redux/slices/userSlice";
import { allUsers } from "../../api/api";
import { Box, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useMakeToast from "../../hooks/makeToast";
import Loading from "../../components/Loading";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { deleteUser } from "../../api/api";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { signUp } from "../../api/api";
import person from "../../assets/svg/person.svg";
import { io } from "socket.io-client";
// const socket = io("http://localhost:5000");
export const socket = io.connect('http://localhost:5000', { transports: ['websocket'] });
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #888",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

const UserPage = () => {
  const userList = useSelector((state) => state?.users?.allUser);
  const [loading, setLoading] = useState(true);
  const [allUserList, setAllUserList] = useState([]);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [accountType, setAccountType] = useState("seller");
  const dispatch = useDispatch();
  const makeToast = useMakeToast();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const callUserList = async () => {
    const response = await allUsers();
    if (response) {
      setAllUserList(response?.data?.response);
      // console.log("allUserList", allUserList);
      dispatch(addAllUser(response?.data?.response));
      setLoading(false);
    } else {
      setLoading(false);
      setAllUserList([]);
    }
  };
  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });
    socket.emit("addUser", 823749827349);
    // setTimeout(() => {
      socket.on("getUsers", (data) => {
        console.log(data, "data all");
      });
    // }, 200);
  }, []);

  useEffect(() => {
    // if (userList?.length === 0) {
    callUserList();

    // } else {
    //   setAllUserList(userList);
    // }
  }, []);

  const deleteUserHandler = async (id) => {
    console.log("handle user id", id);
    const response = await deleteUser({ userId: id });
    console.log("response", response);
    if (response) {
      const newUserList = allUserList.filter((el) => el?._id !== id);
      setAllUserList(newUserList);
      makeToast("User Deleted Successfully", "success", 3);
    } else {
      makeToast("User Not Deleted", "warn", 3);
    }
  };

  const handleChangeRole = (e) => setAccountType(e?.target?.value);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await signUp({ accountType, ...user });
    if (response?.data.success) {
      setAllUserList([...allUserList, { accountType, ...user }]);
      makeToast(response?.data?.message, "success", 3);
      handleClose();
      setLoading(false);
    } else {
      setLoading(false);
      makeToast(response?.data?.message, "warn", 3);
    }
  };

  if (loading) {
    return (
      <>
        <Loading loading={loading} />
      </>
    );
  }

  if (allUserList.length <= 1) {
    return (
      <>
        <Box
          p={1}
          sx={{
            backgroundColor: "#dddddd",
            display: "flex",
            justifyContent: "end",
            borderRadius: "7px",
            marginBottom: "5px",
          }}
        >
          <button
            style={{
              padding: "4px 7px",
              border: "none",
              outline: "none",
              fontSize: "18px",
              backgroundColor: "#17594A",
              color: "white",
              minWidth: "100px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <Typography>Add User</Typography>
          </button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              color: "#888888",
            }}
          >
            There is no User yet
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        p={1}
        sx={{
          backgroundColor: "#dddddd",
          display: "flex",
          justifyContent: "end",
          borderRadius: "7px",
          marginBottom: "5px",
        }}
      >
        <button
          style={{
            padding: "4px",
            border: "none",
            outline: "none",
            fontSize: "18px",
            backgroundColor: "#17594A",
            color: "white",
            minWidth: "100px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        >
          <Typography>Add User</Typography>
        </button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Profile Image
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    Full Name
                  </Typography>
                </Box>
              </TableCell>
              {/* <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Last Name
                </Typography>
              </TableCell> */}
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Email
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Account Verified
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Account Type
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  City
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Country
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Block User
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Delete User
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUserList.map((user) => {
              if (user?.accountType === "admin") return false;

              return (
                <TableRow
                  key={user?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Box
                      sx={{
                        borderRadius: "50%",
                        overflow: "hidden",
                        width: "50px",
                        height: "50px",
                        boxShadow: "0 0 2px #888",
                      }}
                    >
                      <img
                        src={user?.profilePic ? user?.profilePic : person}
                        style={{
                          scale: "1.1",
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          // border: "1px solid gray",
                          width: "50px",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Box>
                      {user?.firstName} {user?.lastName}
                    </Box>
                  </TableCell>
                  {/* <TableCell align="left">{user?.lastName}</TableCell> */}
                  <TableCell align="left">{user?.email}</TableCell>
                  <TableCell align="left">
                    {user?.isVerified ? (
                      <>
                        <Typography sx={{ color: "green", fontSize: "14px" }}>
                          Verified
                        </Typography>
                      </>
                    ) : (
                      <Typography sx={{ color: "red", fontSize: "14px" }}>
                        Un Verified
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="left">{user?.accountType}</TableCell>
                  <TableCell align="left">
                    {user?.city ? (
                      user?.city
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "red",
                        }}
                      >
                        Not Available
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {user?.country ? (
                      user?.country
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "red",
                        }}
                      >
                        Not Available
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell align="left">
                    <button
                      style={{
                        padding: "2px 5px",
                        minWidth: "80px",
                        border: "none",
                        outline: "none",
                        borderRadius: "4px",
                        backgroundColor: "#F29727",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      // onClick={() => deleteUserHandler(user?._id)}
                    >
                      <Typography sx={{ fontSize: "14px" }}>
                        Block User
                      </Typography>
                    </button>
                  </TableCell>
                  <TableCell align="left">
                    <button
                      style={{
                        padding: "2px 5px",
                        minWidth: "90px",
                        border: "none",
                        outline: "none",
                        borderRadius: "4px",
                        backgroundColor: "#F24C3D",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteUserHandler(user?._id)}
                    >
                      <Typography sx={{ fontSize: "14px" }}>
                        Delete User
                      </Typography>
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Typography>First Name</Typography>
                <input
                  type="text"
                  value={user?.firstName}
                  name="firstName"
                  onChange={handleChange}
                  style={{
                    width: "90%",
                    height: "50px",
                    borderRadius: "7px",
                    border: "1px solid #888",
                    outline: "none",
                    padding: "0px 5px",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Typography>Last Name</Typography>
                <input
                  name="lastName"
                  onChange={handleChange}
                  value={user?.lastName}
                  type="text"
                  style={{
                    width: "90%",
                    height: "50px",
                    borderRadius: "7px",
                    border: "1px solid #888",
                    outline: "none",
                    padding: "0px 5px",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                with: "100%",
              }}
            >
              <Typography my={1}>Email</Typography>
              <input
                name="email"
                onChange={handleChange}
                value={user?.email}
                type="email"
                required
                style={{
                  width: "95%",
                  height: "50px",
                  borderRadius: "7px",
                  border: "1px solid #888",
                  outline: "none",
                  padding: "0px 5px",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              />
            </Box>

            <Box my={1} sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <FormControl sx={{ mt: 3, width: "90%", height: "50px" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Account Type
                  </InputLabel>
                  <Select
                    sx={{
                      height: "50px",
                      // border: "none",
                      outline: "none",
                      borderRadius: "7px",
                      // border: "1px solid #888",
                    }}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={accountType}
                    label="Account Type"
                    onChange={handleChangeRole}
                  >
                    <MenuItem value="seller">Seller</MenuItem>
                    <MenuItem value="consultant">Consultant</MenuItem>
                    <MenuItem value="supplier">Supplier</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Typography>Password</Typography>
                <input
                  name="password"
                  value={user?.password}
                  type="password"
                  onChange={handleChange}
                  style={{
                    width: "90%",
                    height: "50px",
                    borderRadius: "7px",
                    border: "1px solid #888",
                    outline: "none",
                    padding: "0px 5px",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                />
              </Box>
            </Box>
            <Box>
              <button
                style={{
                  width: "95%",
                  height: "40px",
                  backgroundColor: "#539165",
                  border: "none",
                  outline: "none",
                  borderRadius: "7px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  onClick={handleSubmit}
                >
                  Create User
                </Typography>
              </button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default UserPage;

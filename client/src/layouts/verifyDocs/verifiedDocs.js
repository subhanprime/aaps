import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllIdentificationReq, verifyDocument } from "../../api/api";
import { useEffect, useState } from "react";
import post from "../../assets/svg/post.svg";
import person from "../../assets/svg/person.svg";
import Modal from "@mui/material/Modal";
import Loading from "../../components/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "550px",
  // border: "1px solid #ddd",
  boxShadow: "0 0 3px rgba(0,0,0,0.3)",
  bgcolor: "background.paper",
  p: 2,
};
const VerifiedDocs = () => {
  const [loading, setLoading] = useState(true);
  const [allList, setAllList] = useState([]);
  const [fileUri, setFileUri] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getAllIdentification = async () => {
    const response = await getAllIdentificationReq();
    if (response) {
      setLoading(false);
      setAllList(response?.data?.data);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllIdentification();
  }, []);

  const handleVerifyDoc = async (id) => {
    const response = await verifyDocument({ id });
    if (response?.data?.status) {
      let filterList = allList.filter((el) => el?._id !== id);
      setAllList(filterList);
    }
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <Box
        px={1}
        sx={{
          backgroundColor: "#dddddd",
          height: "40px",
          display: "flex",
          //   justifyContent: "center",
          alignItems: "center",
          borderRadius: "7px",
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          Document For Identification
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Document Image</TableCell>
                <TableCell>UserImage</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>User type</TableCell>
                <TableCell>User Verified</TableCell>
                <TableCell>Verified</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allList.map((el) => (
                <TableRow
                  key={el?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Box
                      sx={{
                        borderRadius: "5px",
                        overflow: "hidden",
                        width: "60px",
                        // height: "50px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setFileUri(el?.docs_for_identify);
                        handleOpen();
                      }}
                    >
                      <img
                        src={
                          el?.docs_for_identify ? el?.docs_for_identify : post
                        }
                        width="100%"
                        // height="50px"
                        style={{
                          borderRadius: "5px",
                          objectFit: "cover",
                          border: "1px solid gray",
                          // width: "50px",
                        }}
                      />
                    </Box>
                  </TableCell>

                  <TableCell align="left">
                    <Box
                      sx={{
                        borderRadius: "5px",
                        overflow: "hidden",
                        width: "60px",
                        // height: "50px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setFileUri(el?.profilePic);
                        handleOpen();
                      }}
                    >
                      <img
                        src={el?.profilePic ? el?.profilePic : person}
                        width="100%"
                        // height="50px"
                        style={{
                          borderRadius: "5px",
                          objectFit: "cover",
                          border: "1px solid gray",
                          // width: "50px",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    {el?.firstName}
                    &nbsp;
                    {el?.firstName}
                  </TableCell>
                  <TableCell>{el?.email}</TableCell>
                  <TableCell>{el?.accountType}</TableCell>
                  <TableCell>
                    {el?.isVerified ? (
                      <Typography sx={{ color: "green" }}>Verified</Typography>
                    ) : (
                      <Typography sx={{ color: "red" }}>Un Verified</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <button
                      style={{
                        border: "none",
                        outline: "none",
                        backgroundColor: "green",
                        width: "100px",
                        height: "30px",
                        borderRadius: "7px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          letterSpacing: "1px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleVerifyDoc(el?._id)}
                      >
                        Verify
                      </Typography>
                    </button>
                  </TableCell>
                  {/* <TableCell align="right">Verified</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={fileUri} width="100%" />
        </Box>
      </Modal>

      {allList.length === 0 ? (
        <>
          <Box
            sx={{
              height: "500px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                color: "#888",
              }}
            >
              There Is No Data Yet
            </Typography>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default VerifiedDocs;

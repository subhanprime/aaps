import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allPostDetails } from "../../redux/slices/allPostList";
// import { allUsers } from "../../api/api";
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
import {
  deleteUser,
  allPost,
  allPostList,
  deletePost,
  createPost,
} from "../../api/api";
import post from "../../assets/svg/post.svg";
import Modal from "@mui/material/Modal";
import uploadImg from "../../assets/svg/upload.png";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "#A2X",
  "#Acquire",
  "#Adobe Commerce",
  "#Unicorn Smasher",
  "#Veeqo",
  "#Viral",
  "#Analytics",
  "#Launch",
  "#Walmart",
  "#Launch",
  "#Wayfair",
  "#Whatagraph",
  "#Wix",
  "#WooCommerce",
  "#WordPress",
  "#Yotpo",
  "#Zalando",
  "#Zapier",
  "#Zendesk",
  "#Zoho",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #888",
  boxShadow: 24,
  p: 2,
  borderRadius: "7px",
};

const PostPage = () => {
  const postList = useSelector((state) => state?.allPostDetails);
  const [loading, setLoading] = useState(true);
  const [allPostListArr, setAllPostListArr] = useState([]);
  const [privacyStatus, setPrivacyStatus] = useState("anyone");
  const [open, setOpen] = useState(false);
  const [baseImage, setBaseImage] = useState([]);
  const [fileType, setFileType] = useState("");
  const [textParagraph, setTextParagraph] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const dispatch = useDispatch();
  const makeToast = useMakeToast();
  const [preview, setPreview] = useState(false);
  const fileRef = useRef(null);
  const callPostList = async () => {
    const response = await allPostList();
    if (response) {
      console.log(response?.data?.allPosts);
      setAllPostListArr(response?.data?.allPosts);
      dispatch(allPostDetails(response?.data?.allPosts));
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (postList?.length === 0) {
    callPostList();
    // } else {
    //   setAllPostListArr(postList);
    //   setTimeout(() => setLoading(false), 200);
    // }
  }, []);

  const deleteUserHandler = async (id) => {
    const response = await deletePost(id);
    if (response) {
      const newPostList = allPostListArr.filter((el) => el?._id !== id);
      setAllPostListArr(newPostList);
      makeToast("Post deleted successfully", "success", 3);
    } else {
      makeToast("Post deleted Not Deleted", "warn", 3);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const ImageHandle = async (event) => {
    let file = event.target.files[0];
    let type = "";
    console.log("file", file);
    // let files = file.length > 0;
    if (event.target.files && file.name.match(/\.(jpg|jpeg|png|gif|mp4)$/)) {
      if (file?.type === "video/mp4") {
        setFileType("video");
        type = "video";
      } else {
        type = "image";
        setFileType("image");
      }

      setPreview(URL.createObjectURL(file));
      const base64Img = await toBase64(file);

      setBaseImage({ file: base64Img, type });
    } else {
      makeToast("Please Select Only Image", "warn", 3);
      fileRef.current.value = null;
      return false;
    }
  };

  const handleMultipleSelect = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeRole = (e) => setPrivacyStatus(e?.target?.value);

  const handleSubmit = async () => {
    setLoading(true);
    console.log("fileType===>", fileType);
    const response = await createPost({
      hashtags: personName,
      file: [baseImage],
      privacyStatus,
      text: textParagraph,
      fileType: fileType ? fileType : "text",
    });
    if (response?.data?.success) {
      makeToast(response?.data?.message, "success", 3);
      setAllPostListArr([response?.data?.post, ...allPostListArr]);
      setLoading(false);
      setTextParagraph("");
      setBaseImage([]);
      setFileType("");
      setPreview(false);
      handleClose();
      setPersonName([]);
    } else {
      makeToast("Please Provide all Fields", "warn", 3);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Loading loading={loading} />
      </>
    );
  }

  if (allPostListArr.length === 0) {
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
            <Typography>Add Admin Post</Typography>
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
            There is no Post Yet
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
            padding: "4px 10px",
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
          <Typography sx={{ fontSize: "14px" }}>Add Admin Post</Typography>
        </button>
      </Box>
      {/* sx={{ maxHeight: 500 }} */}
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
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Text
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Author Name
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Audience Country
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Total BookMarks
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Total Likes
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Total Comments
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Total HashTags
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Privacy Status
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Post Delete
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPostListArr.map((user) => {
              // console.log('post',user)

              if (user?.accountType === "admin") return false;

              return (
                <TableRow
                  key={user?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Box
                      sx={{
                        overflow: "hidden",
                        width: "50px",
                        height: "50px"
                      }}
                    >
                      {user?.file.length == 0 ||
                      user?.file[0]?.type === "image" ? (
                        <>
                          <img
                            src={
                              user?.file && user?.file[0]?.fileKey
                                ? user?.file[0]?.fileKey
                                : post
                            }
                            width="50px"
                            height="50px"
                            style={{
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "1px solid gray",
                              width: "50px",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <video
                            width="50px"
                            height="50px"
                            src={user?.file[0]?.fileKey}
                            type="video/mp4"
                            // controls
                            autoplay
                            loop
                          ></video>
                        </>
                      )}
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
                      {user?.text ? (
                        <>{user?.text}</>
                      ) : (
                        <Typography sx={{ fontSize: "14px", color: "red" }}>
                          Not Provide
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    {user?.author?.firstName ? (
                      <>
                        {user?.author?.firstName}&nbsp;
                        {user?.author?.lastName}
                      </>
                    ) : (
                      <Typography sx={{ fontSize: "14px", color: "red" }}>
                        Not Provide
                      </Typography>
                    )}
                  </TableCell>
                  {/* <TableCell align="right">{row.fat}</TableCell> */}
                  <TableCell align="left">
                    {user?.audienceCountry ? (
                      user?.audienceCountry
                    ) : (
                      <Typography sx={{ fontSize: "14px", color: "red" }}>
                        Null
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="left">{user?.bookmarks.length}</TableCell>
                  <TableCell align="left">{user?.likes.length}</TableCell>
                  <TableCell align="left">{user?.comments.length}</TableCell>
                  <TableCell align="left">{user?.hashtags.length}</TableCell>
                  <TableCell align="left">{user?.privacyStatus}</TableCell>
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
                      onClick={() => deleteUserHandler(user?._id)}
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

      {/* modal create here */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              cursor: "pointer",
              height: "140px",
              width: "100%",
              backgroundColor: "#EDF1D6",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
            onClick={() => fileRef.current.click()}
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </>
            ) : (
              <>
                <img src={uploadImg} />
              </>
            )}

            <input
              hidden
              ref={fileRef}
              type="file"
              //   style={{ display: "none" }}
              accept="image/png, image/gif, image/jpeg, video/mp4"
              onChange={ImageHandle}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                marginTop: "10px",
              }}
            >
              Write Text Here
            </Typography>
            <textarea
              value={textParagraph}
              onChange={(e) => setTextParagraph(e.target.value)}
              style={{
                margin: "10px 0px",
                resize: "none",
                width: "calc(100% - 0px)",
                minHeight: "120px",
                borderRadius: "7px",
                padding: "5px",
                fontSize: "16px",
                outline: "none",
                border: "1px solid #888888",
              }}
            />
          </Box>
          <Box>
            {/* <Typography
              sx={{
                fontSize: "14px",
                // marginTop: "10px",
              }}
            >
              Privacy Status
            </Typography> */}

            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-name-label">Hashtags</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleMultipleSelect}
                input={<OutlinedInput label="Hashtags" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl sx={{ mt: 3, width: "100%", height: "50px" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Privacy Status
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
                value={privacyStatus}
                label="Privacy Status"
                onChange={handleChangeRole}
              >
                <MenuItem value="onlyme">OnlyMe</MenuItem>
                <MenuItem value="anyone">anyOne</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <button
              style={{
                width: "100%",
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
                Submit Post
              </Typography>
            </button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PostPage;

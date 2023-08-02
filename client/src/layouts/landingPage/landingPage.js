import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { allUsers, allPost } from "../../api/api";
import { addAllUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
const LandingPage = () => {
  const [allUser, setAllUser] = useState([]);
  const [howManyPost, setHowManyPost] = useState(0);
  const dispatch = useDispatch();
  const getAllUsers = async () => {
    const response = await allUsers();
    if (response) {
      setAllUser(response?.data?.response);
      dispatch(addAllUser(response?.data?.response));
    }
  };

  const fetchAllPost = async () => {
    const response = await allPost();
    if (response) {
      let post = response?.data?.posts;
      setHowManyPost(post);
    } else {
      setHowManyPost(0);
    }
  };
  useEffect(() => {
    getAllUsers();
    fetchAllPost();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          p={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            maxWidth: "1400px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "300px",
              height: "80px",
              boxShadow: "0 0 5px rgba(0,0,0,0.4)",
              borderRadius: "10px",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                minWidth: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                p={1}
                sx={{
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "#525FE1",
                }}
              >
                {allUser?.length}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
              }}
              px={1}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#002B5B",
                  }}
                >
                  Total User
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#808080",
                  }}
                >
                  dolor consectetur adipiscing
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "300px",
              height: "80px",
              boxShadow: "0 0 5px rgba(0,0,0,0.4)",
              borderRadius: "10px",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                minWidth: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                p={1}
                sx={{
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "#525FE1",
                }}
              >
                {allUser?.filter((el) => el?.accountType === "seller").length >
                0
                  ? allUser?.filter((el) => el?.accountType === "seller").length
                  : 0}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
              }}
              px={1}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#002B5B",
                  }}
                >
                  Seller User
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#808080",
                  }}
                >
                  dolor consectetur adipiscing
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "300px",
              height: "80px",
              boxShadow: "0 0 5px rgba(0,0,0,0.4)",
              borderRadius: "10px",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                minWidth: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                p={1}
                sx={{
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "#525FE1",
                }}
              >
                {allUser?.filter((el) => el?.accountType === "consultant")
                  .length > 0
                  ? allUser?.filter((el) => el?.accountType === "consultant")
                      .length
                  : 0}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
              }}
              px={1}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#002B5B",
                  }}
                >
                  Consultant User
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#808080",
                  }}
                >
                  dolor consectetur adipiscing
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "300px",
              height: "80px",
              boxShadow: "0 0 5px rgba(0,0,0,0.4)",
              borderRadius: "10px",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                minWidth: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                p={1}
                sx={{
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "#525FE1",
                }}
              >
                {allUser?.filter((el) => el?.accountType === "supplier")
                  .length > 0
                  ? allUser?.filter((el) => el?.accountType === "supplier")
                      .length
                  : 0}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
              }}
              px={1}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#002B5B",
                  }}
                >
                  Supplier User
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#808080",
                  }}
                >
                  dolor consectetur adipiscing
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "300px",
              height: "80px",
              boxShadow: "0 0 5px rgba(0,0,0,0.4)",
              borderRadius: "10px",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                minWidth: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                p={1}
                sx={{
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "#525FE1",
                }}
              >
                {howManyPost}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
              }}
              px={1}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#002B5B",
                  }}
                >
                  Total Post
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#808080",
                  }}
                >
                  dolor consectetur adipiscing
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "300px",
              height: "80px",
              boxShadow: "0 0 5px rgba(0,0,0,0.4)",
              borderRadius: "10px",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                minWidth: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                p={1}
                sx={{
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "#525FE1",
                }}
              >
                {howManyPost}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
              }}
              px={1}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#002B5B",
                  }}
                >
                  Total Post
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#808080",
                  }}
                >
                  dolor consectetur adipiscing
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;

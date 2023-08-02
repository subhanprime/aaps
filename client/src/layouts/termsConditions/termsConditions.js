import { Box, InputBase, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addTermsConditions } from "../../api/api";
import useMakeToast from "../../hooks/makeToast";
var quill;
const modules = {
  toolbar: {
    container: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
  },
};
function imageHandler() {
  var range = this.quill.getSelection();
  var value = prompt("please copy paste the image url here.");
  if (value) {
    this.quill.insertEmbed(range.index, "image", value);
  }
}

const CreateBlog = () => {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const [allow, setAllow] = useState(true);
  // const devRef = useRef(null);
  // const [Show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const makeToast = useMakeToast();

  const postBlogs = async () => {
    if (!allow) return false;
    console.log("valueeee", value);
    if (!value) {
      makeToast("Please write some data", "error", 3);
      return false;
    }
    setAllow(false);
    const response = await addTermsConditions({ terms: value });
    if (response?.data?.status === "success") {
      makeToast("Terms And Conditions add Successfully", "success", 4);
      document.querySelector(".ql-editor").innerHTML = null;
      setTimeout(() => {
        document.querySelector(".ql-editor").innerHTML = null;
        setValue(null);
      }, 100);
      //   setTitle("");
      setAllow(true);
      setValue(null);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              // display: 'flex',
              // justifyContent: 'space-between',
              bgcolor: `${theme.palette.background.light}`,
              alignItems: "center",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              boxShadow: "0 0 2px rgba(0,0,0,0.5)",
            }}
            p={1}
            mx={1.1}
            mt={1}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                color: `${theme.palette.text.primary}`,
              }}
            >
              Write Terms and Conditions Here
            </Typography>

            {/* <Box
              sx={{
                display: "flex",
                // justifyContent: 'space-between',
                // backgroundColor: '#F3E8FF',
                bgcolor: `${theme.palette.background.light}`,
                alignItems: "center",
                gap: "10px",
              }}
              // p={1}
              mt={2}
              // mt={1}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                Enter Tittle
              </Typography>
              <InputBase
                sx={{
                  height: "30px",
                  width: "100%",
                  maxWidth: "400px",
                  border: "none",
                  outline: "none",
                  borderRadius: "5px",
                  boxShadow: "0 0 2px rgba(0,0,0,0.5)",
                  pl: 1,
                  color: `${theme.palette.background.primary}`,
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title Here ..."
              />
            </Box> */}
          </Box>
          <Box px={1}>
            <ReactQuill
              ref={(el) => {
                quill = el;
              }}
              modules={modules}
              theme="snow"
              onChange={setValue}
              placeholder="Content goes here..."
              height="1000px"
              style={{
                color: `${theme.palette.background.primary}`,
              }}
            />
            <Box
              mx={0.1}
              px={1}
              sx={{
                bgcolor: `${theme.palette.background.light}`,
                height: "50px",
                borderBottomLeftRadius: "7px",
                borderBottomRightRadius: "7px",
                boxShadow: "0 0 2px rgba(0,0,0,0.5)",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#F49D1A",
                    padding: "7px 14px",
                    outline: "none",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    color: "white",
                    letterSpacing: "1px",
                    fontSize: "16px",
                    fontWeight: "500",
                    width: "70px",
                  }}
                  onClick={() =>
                    (document.querySelector(".ql-editor").innerHTML = null)
                  }
                >
                  Clear
                </button>
                <button
                  style={{
                    backgroundColor: "#285430",
                    padding: "7px 14px",
                    outline: "none",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    color: "white",
                    letterSpacing: "1px",
                    fontSize: "16px",
                    fontWeight: "500",
                    width: "70px",
                  }}
                  onClick={postBlogs}
                >
                  Post
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateBlog;

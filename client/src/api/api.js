import axios from "axios";
import Cookies from "js-cookie";
// const URL = "https://reactnative-socialapp.up.railway.app";
const URL = "http://localhost:5000";

axios.interceptors.request.use(
  (config) => {
    config.timeout = 40000;
    const AUTH_TOKEN = `${Cookies.get("access-token-ref")}` || "";
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `${AUTH_TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// let checkTry = true;
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const prevRequest = error?.config;
//     if (error?.response?.status === 409) {
//       try {
//         if (checkTry) {
//           checkTry = false;
//         //   console.log("Cookies.get('simpleUser')", Cookies.get("simpleUser"));
//         //   if (!Cookies.get("simpleUser") || Cookies.get("simpleUser")) {
//         //     cogoToast.info("Please Login And Try Again", {
//         //       position: "top-right",
//         //     });
//         //   }
//           setTimeout(() => {
//             checkTry = true;
//           }, 3000);
//         }
//       } catch (error) {}
//     }

//     if (error?.response?.status == 403 && !prevRequest?.sent) {
//       try {
//         prevRequest.sent = true;
//         // const token = Cookies.get('feelFresh');
//         // const response = await axios.get(`${URL}/refresh/${token}`);
//         // prevRequest.headers['Authorization'] = `Bearer ${response?.data?.accessToken}`;
//         return axios(prevRequest);
//       } catch (err) {
//         // Cookies.remove('feelFresh');
//         // Cookies.remove('jwtToken');
//         Promise.reject(error);
//         return;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export const login = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/auth/login`, data);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const allUsers = async () => {
  try {
    const response = await axios.get(`${URL}/api/user/allUser`);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const allPost = async () => {
  try {
    const response = await axios.get(`${URL}/api/post/allPost`);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const allPostList = async () => {
  try {
    const response = await axios.get(
      `${URL}/api/post/getAllPosts?page=1&limit=100`
    );
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

//

export const userInfo = async () => {
  try {
    const response = await axios.get(`${URL}/api/auth/getUser`);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const deleteUser = async (data) => {
  try {
    const response = await axios.delete(`${URL}/api/user/deleteUser`, {
      data: data,
    });
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

// /delete/:postId

export const deletePost = async (data) => {
  try {
    const response = await axios.delete(`${URL}/api/post/delete/${data}`, {
      data: data,
    });
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/auth/register`, data);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const createPost = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/post/create`, data);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const addTermsConditions = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/termsConditions`, data);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const createPrivacyPolicy = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/privacyPolicy`, data);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const getAllReports = async (data) => {
  try {
    const response = await axios.get(`${URL}/api/report/submitReport`);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const deleteReport = async (data) => {
  console.log("delete report api", data);
  try {
    const response = await axios.delete(`${URL}/api/report/submitReport`, {
      data,
    });
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const getAllUserReport = async (data) => {
  try {
    const response = await axios.get(`${URL}/api/report/userReport`);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const deleteUserReport = async (data) => {
  console.log("delete report api", data);
  try {
    const response = await axios.delete(`${URL}/api/report/userReport`, {
      data,
    });
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

export const getAllIdentificationReq = async () => {
  try {
    const response = await axios.get(`${URL}/api/user/identify-docs`);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};


export const verifyDocument = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/user/approve-identify-docs`,data);
    if (response) {
      return response;
    }
  } catch (err) {
    return err?.response;
  }
};

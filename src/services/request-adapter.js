import axiosInstance from "../axiosInstance";
import mobileAxiosInstance from "../mobileAxiosInstance";

export const sendGetRequestMobile = async (URL, signal) => {
  const res = await mobileAxiosInstance.get(URL, signal);
  return res;
};

export const sendPostRequestMobile = async (URL, params) => {
  const res = await mobileAxiosInstance.post(URL, params);
  return res;
};

export const sendPatchRequestMobile = async (URL, params) => {
  const res = await mobileAxiosInstance.put(URL, params);
  return res;
};

export const sendGetRequest = async (URL, signal) => {
  const res = await axiosInstance.get(URL, signal);
  return res;
};

export const sendPostRequest = async (URL, params) => {
  const res = await axiosInstance.post(URL, params);
  return res;
};

export const sendPostMultipartRequest = async (URL, params) => {
  const formData = new FormData();

  Object.keys(params).forEach((fieldName) => {
    formData.append(fieldName, params[fieldName]);
  });

  const res = await axiosInstance.post(URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const sendPatchRequest = async (URL, params) => {
  const res = await axiosInstance.patch(URL, params);
  return res;
};

export const sendPutRequest = async (URL, params) => {
  const res = await axiosInstance.put(URL, params);
  return res;
};

export const sendDeleteRequest = async (URL) => {
  const res = await axiosInstance.delete(URL);
  return res;
};

export const generateErrorMessage = (error) => {
  const message = error.response.data.message;
  let detail;

  if (error.response.data.errors?.length > 0) {
    const errors = error.response.data.errors;

    if (typeof errors === "object") {
      detail = [];
      Object.keys(errors).forEach((key) => {
        errors[key].forEach((err) => detail.push(`${err}`));
      });

      detail = detail.join(", ");
    } else if (typeof errors === "string") {
      detail = errors;
    }
  } else {
    detail = message;
  }

  return `${detail ?? "Unexpected error happened"}`;
};

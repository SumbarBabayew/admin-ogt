import axios from "axios";
export const request = async ({
  url,
  method = "post",
  headers = {},
  params = {},
  data = {},
  onUploadProgress = {},
  file = false,
  java = false,
  lan = true,
}) => {
  const config = useRuntimeConfig();
  // const fileURL = config.public.VITE_APP_FILE_URL;

  const baseURL = config.public.VITE_APP_BASE_URL;
  const formData = new FormData();

  if (file) {
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "multipart/form-data";
    if (data?.files?.length) {
      for (let i = 0; i < data.files.length; i++) {
        if (typeof data.files[i] == "object")
          formData.append(`images-${i}`, data.files[i]);
        if (typeof data.files[i] == "string")
          formData.append(`images`, data.files[i]);
      }
    } else if (data.file) {
      formData.append("images", data.file);
    }
    data = formData;
  }
  if (typeof window !== "undefined") {
    localStorage.getItem("Authorization-admin-truck") &&
      (headers["Authorization"] =
        "Bearer " + localStorage.getItem("Authorization-admin-truck"));
  }

  return axios({
    url: `${baseURL}${url}`,
    method,
    headers,
    ...onUploadProgress,
    params,
    data,
  });
};

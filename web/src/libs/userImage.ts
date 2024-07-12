import Cookies from "js-cookie";

export const getUserImage = async () => {};

export const postUserImage = async (formData: FormData) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/media-app/user-image",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const putUserImage = async (formData: FormData) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/media-app/user-image",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const deleteUserImage = async () => {};

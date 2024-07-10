import Cookies from "js-cookie";

export const getUserImage = async () => {};

export const postUserImage = async (image: any) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/media-app/user-image",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(image),
    }
  );
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const putUserImage = async () => {};

export const deleteUserImage = async () => {};

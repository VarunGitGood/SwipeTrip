import axios from "axios";

export const validateToken = async (): Promise<boolean> => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/user/test",
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

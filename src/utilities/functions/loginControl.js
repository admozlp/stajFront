export const LoginController = () => {
  const userToken = localStorage.getItem("user-token");

  if (!userToken || userToken === "undefined") {
    return false;
  } else {
    return true;
  }
};

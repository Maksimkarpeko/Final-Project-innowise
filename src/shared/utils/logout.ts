export const logOut = () => {
  try {
    localStorage.clear();
  } catch (e) {
    console.error(e);
  }
};

export function getLoggedInUser() {

  const user = localStorage.getItem("currentUser");

  if (!user) return null;

  return JSON.parse(user);

}
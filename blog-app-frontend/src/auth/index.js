// isLoggedIn
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) return true;
  else return false;
};

// doLogin: set data to localstorage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// doLogout: remove data from localstorage
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

// getCurrentUser
export const getCurrentUserDetails = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user;
  } else {
    return undefined;
  }
};

export const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).token;
  }else{
    return null;
  }
};

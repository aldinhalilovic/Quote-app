const SetLocalStorage = (key, value) => {
  if (typeof key !== "string") {
    return false;
  }

  localStorage.setItem(key, value);
};

const GetLocalStorage = (key) => {
  if (typeof key !== "string") {
    return false;
  }

  return localStorage.getItem(key);
};

const RemoveLocalStorage = (key) => {
  if (typeof key !== "string") {
    return false;
  }

  localStorage.removeItem(key);
};

const RemoveAllLocalStorage = () => {
  localStorage.clear();
};

export default {
  setLocalStorage: SetLocalStorage,
  getLocalStorage: GetLocalStorage,
  removeLocalStorage: RemoveLocalStorage,
  removeAllLocalStorage: RemoveAllLocalStorage,
};

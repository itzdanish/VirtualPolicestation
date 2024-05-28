const key = "authToken";


const storeToken = async (authToken) => {
  try {
    const item = { value: authToken, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    const value = localStorage.getItem(key);
    const item = JSON.parse(value);
    if (!item) return null;
    return item.value;
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  const user = token ? await jwt_decode(token) : null;
  return user;
};

const removeToken = async () => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};


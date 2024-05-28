function storeValue(key, value) {
  const item = { value, timestamp: Date.now() };
  localStorage.setItem(key, JSON.stringify(item));
};


function removeValue(key) {
  localStorage.removeItem(key);
};


function getValue(key) {
  const value = localStorage.getItem(key);
  const item = JSON.parse(value);
  if (!item) return null;
  return item.value;
};

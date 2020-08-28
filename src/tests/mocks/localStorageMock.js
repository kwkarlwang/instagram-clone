export let store = {};
export let getItem = jest.fn((key) => {
  return store[key] || undefined;
});
export let setItem = jest.fn((key, value) => {
  store[key] = value;
});
export let clear = jest.fn(() => {
  store = {};
});
export let localStorage = {
  getItem,
  setItem,
  clear,
};

Object.defineProperty(window, "localStorage", { value: localStorage });

export default localStorage;

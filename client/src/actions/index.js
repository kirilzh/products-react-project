export const addProduct = (name, price, currency) => ({
  type: "ADD_PRODUCT",
  name,
  price,
  currency
});

export const updateProduct = (index, name, price, currency) => ({
  type: "UPDATE_PRODUCT",
  index,
  name,
  price,
  currency
});

export const deleteProduct = index => ({
  type: "DELETE_PRODUCT",
  index
});

export const toggleButton = (button, index) => ({
  type: "TOGGLE_BUTTON",
  button,
  index
});

export const changeAction = (field, value) => ({
  type: "CHANGE_ACTION",
  field,
  value
});

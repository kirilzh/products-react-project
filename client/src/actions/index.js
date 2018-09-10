// CRUD
export const addProduct = (name, price, currency) => ({
  type: "ADD_PRODUCT",
  name,
  price,
  currency
});

export const updateProduct = index => ({
  type: "UPDATE_PRODUCT",
  index
});

export const saveProduct = (index, name, price, currency) => ({
  type: "SAVE_PRODUCT",
  index,
  name,
  price,
  currency
});

export const deleteProduct = index => ({
  type: "DELETE_PRODUCT",
  index
});

// TOGGLE
export const toggleButton = (button, index) => ({
  type: "TOGGLE_BUTTON",
  button,
  index
});

export const addProductFormToggle = () => ({
  type: "ADD_PRODUCT_FORM_TOGGLE"
});

// INPUT FIELD CHANGE
export const changeAction = (field, value, index) => ({
  type: "CHANGE_ACTION",
  field,
  value,
  index
});


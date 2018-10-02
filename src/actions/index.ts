// TOGGLE
export const toggleButton = (button, index) => ({
  type: "TOGGLE_BUTTON",
  button,
  index
});

// INPUT FIELD CHANGE
export const changeAction = (
  field: string,
  value: number | string,
  valid: boolean
) => ({
  type: "CHANGE_ACTION",
  field,
  value,
  valid
});

import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  TOGGLE_BUTTON,
  CHANGE_ACTION
} from "../constants/ActionTypes";

const initialState = {
  products: [
    {
      name: "TV",
      price: 1000,
      currency: "USD"
    },
    {
      name: "SSD",
      price: 100,
      currency: "USD"
    }
  ],
  permissions: [
    {
      name: "ADD",
      visible: true
    },
    {
      name: "DELETE",
      visible: true
    },
    {
      name: "UPDATE",
      visible: false
    }
  ],
  temporary: [
    {
      name: "",
      price: "",
      currency: ""
    }
  ],
};

export default function products(state = initialState, action) {
  const products = state.products;
  const permissions = state.permissions;
  const temporary = state.temporary;

  switch (action.type) {
    case ADD_PRODUCT:
      return {
        products: [
          ...products,
          { name: action.name, price: action.price, currency: action.currency }
        ],
        permissions,
        temporary
      };
    case UPDATE_PRODUCT:
      const updateProducts = [...products];
      updateProducts[action.index].name = action.name;
      updateProducts[action.index].price = action.price;
      updateProducts[action.index].currency = action.currency;
      return {
        products: updateProducts,
        permissions,
        temporary
      };
    case DELETE_PRODUCT:
      const deleteProducts = [...products];
      deleteProducts.splice(action.index, 1);
      return {
        products: deleteProducts,
        permissions,
        temporary
      };
    case TOGGLE_BUTTON:
      const updatedPermission = permissions.map((permission, i) => {
        if (i === action.index) {
          return {
            ...permission,
            visible: !permission.visible
          };
        }
        return permission;
      });

      return {
        ...state,
        permissions: updatedPermission,
        temporary
      };

    case CHANGE_ACTION:
      const changes = temporary[0];
      changes[action.field] = action.value;

      return {
        products,
        permissions,
        temporary
      };

    default:
      return state;
  }
}

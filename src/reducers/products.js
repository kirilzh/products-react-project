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
  ]
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products,
          { name: action.name, price: action.price, currency: action.currency }
        ]
      };
    case UPDATE_PRODUCT:
      const updateProducts = [...state.products];
      updateProducts[action.index].name = action.name;
      updateProducts[action.index].price = action.price;
      updateProducts[action.index].currency = action.currency;
      return {
        ...state,
        products: updateProducts
      };
      case DELETE_PRODUCT:
      const deleteProducts = [...state.products];
      deleteProducts.splice(action.index, 1);
      return {
          ...state,
        products: deleteProducts,
      };
    case TOGGLE_BUTTON:
      const updatedPermission = state.permissions.map((permission, i) => {
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
        permissions: updatedPermission
      };

      case CHANGE_ACTION:
      const changes = state.temporary[0];
      changes[action.field] = action.value;

      return {
          ...state
      };

    default:
      return state;
  }
}

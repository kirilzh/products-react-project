import {
  ADD_PRODUCT,
  SAVE_PRODUCT,
  DELETE_PRODUCT,
  TOGGLE_BUTTON,
  CHANGE_ACTION,
  UPDATE_PRODUCT,
  ADD_PRODUCT_FORM_TOGGLE
} from "../constants/ActionTypes";

const initialState = {
  products: [
    {
      name: "TV",
      price: 1000,
      currency: "USD",
      editable: false
    },
    {
      name: "SSD",
      price: 100,
      currency: "USD",
      editable: false
    }
  ],
  permissions: [
    {
      name: "ADD",
      visible: true
    },
    {
      name: "DELETE",
      visible: false
    },
    {
      name: "UPDATE",
      visible: true
    }
  ],

  name: "",
  price: "",
  currency: "",
  addProductFormVisible: false
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products,
          {
            name: action.name,
            price: action.price,
            currency: action.currency,
            editable: false
          }
        ]
      };

    case UPDATE_PRODUCT:
      const updateProductButton = [...state.products];
      updateProductButton[action.index].editable = !updateProductButton[
        action.index
      ].editable;

      return {
        ...state,
        products: updateProductButton
      };

    case SAVE_PRODUCT:
      const updateProducts = [...state.products];
      updateProducts[action.index].name = action.name;
      updateProducts[action.index].price = action.price;
      updateProducts[action.index].currency = action.currency;
      updateProducts[action.index].editable = !updateProducts[action.index]
        .editable;
      return {
        ...state,
        products: updateProducts
      };

    case DELETE_PRODUCT:
      const deleteProducts = [...state.products];
      deleteProducts.splice(action.index, 1);
      return {
        ...state,
        products: deleteProducts
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
      if (action.index === undefined) {
        state[action.field] = action.value;
        return {
          ...state
        };
      } else {
        state.products[action.index][action.field] = action.value;
        return {
          ...state
        };
      }

    case ADD_PRODUCT_FORM_TOGGLE: {
      state.addProductFormVisible = true;
      return {
        ...state
      };
    }

    default:
      return state;
  }
}

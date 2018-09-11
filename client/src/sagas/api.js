import axios from "axios";

function fetchProducts() {
  return axios({
    method: "get",
    url: "/products"
  });
}

function postProduct(newProduct) {
  return axios({
    method: "post",
    url: "/products",
    data: newProduct
  });
}

function deleteProduct(id) {
  return axios({
    method: "delete",
    url: `/products/${id}`
  })
}

export const api = {
  fetchProducts,
  postProduct,
  deleteProduct
};

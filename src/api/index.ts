import { IProduct, ICategory } from './types';
import { http, httpPost, httpPatch, httpDelete, asyncForEach } from '../utils/utils';

// Sækja slóð á API úr env
const baseurl: string = process.env.REACT_APP_API_URL as string;

async function getProducts() {
  const path = 'products';
  const url = new URL(path, baseurl);

  const resultProducts = await http(url.href);
  resultProducts.data.forEach(async (item: any) => {
    const cat = await getCategory(item.categoryid);
    item.category = cat.data.name;
  })

  return resultProducts;
}

async function getProductsByCategoryId(id: number, page: number = 0, query: string = '') {
  let path = `products?category=${id}&page=${page}`;
  if (query.length > 0) {
    path += `&search=${query}`;
  }
  const url = new URL(path, baseurl);

  const resultProducts = await http(url.href);
  const category= await getCategory(resultProducts.data[0].categoryid);
  resultProducts.data.forEach((p: any) => {
    p.category = category.data.name;
  })
  return resultProducts
}

async function getProduct(id: number) {
  const path = `products/${id}`
  const url = new URL(path, baseurl);

  const resultProduct = await http(url.href);
  const category = await getCategory(resultProduct.data.categoryid);
  resultProduct.data.category = category.data;
  return resultProduct;
}

async function getProductCount(id: number = -1) {
  let path = 'products/count';
  if (id !== -1) path += `?category=${id}`;
  const url = new URL(path, baseurl);

  const data: any = await http(url.href);
  const { count } = data.data;
  // @ts-ignore
  return parseInt(count, 10);
}

async function getCategories() {
  const path = 'categories';
  const url = new URL(path, baseurl);

  return await http(url.href);
}

async function getCategory(id: number) {
  const path = `categories/${id}`
  const url = new URL(path, baseurl);

  return await http(url.href);
}

async function addToCart(productid: number, quantity: number) {
  const path = 'cart';
  const url = new URL(path, baseurl);

  const data = {'productid': productid, 'quantity': quantity};
  return await httpPost(url.href, data);
}

async function getCart() {
  const path = 'cart';
  const url = new URL(path, baseurl);

  return await http(url.href);
}

async function updateCartline(id: number, quantity: number) {
  const path = `cart/line/${id}`;
  const url = new URL(path, baseurl);

  const data = {'quantity': quantity};
  return await httpPatch(url.href, data);
}

async function deleteCartline(id: number) {
  const path = `cart/line/${id}`;
  const url = new URL(path, baseurl);

  return await httpDelete(url.href);
}

async function createOrder(name: string, address: string) {
  const path = 'orders';
  const url = new URL(path, baseurl);

  const data = {'name': name, 'address': address};
  return await httpPost(url.href, data);
}

/**
 * Method: POST
 * @param data
 */
async function registerUser(data: any) {
  const path = 'users/register';
  const url = new URL(path, baseurl);

  return await httpPost(url.href, data);
}

/**
 * Method: POST
 * @param data
 */
async function loginUser(data: any) {
  const path = 'users/login';
  const url = new URL(path, baseurl);

  return await httpPost(url.href, data);
}

async function getUserMe() {
  const path = 'users/me';
  const url = new URL(path, baseurl);

  return await http(url.href);
}

async function getOrders() {
  const path = '/orders';
  const url = new URL(path, baseurl);

  return await http(url.href);
}

async function getOrder(id: number) {
  const path = `/orders/${id}`
  const url = new URL(path, baseurl);

  /**
   * Populate orderlines with product and total price of
   * product price * product quantity
   * @param orderlines
   */
  const populateOrderlines = async (orderlines: any) => {
    await asyncForEach(orderlines, async (item: any, i: number) => {
      orderlines[i].product = await getProduct(item.productid).then(result => result.data);
      orderlines[i].total = orderlines[i].product.price * item.quantity;
    });
    return orderlines;
  }

  const resultOrder = await http(url.href)
  await populateOrderlines(resultOrder.data.orderlines);

  return resultOrder;
}

export {
  getProduct,
  getProducts,
  getProductsByCategoryId,
  getProductCount,
  getCategory,
  getCategories,
  addToCart,
  getCart,
  updateCartline,
  deleteCartline,
  createOrder,
  registerUser,
  loginUser,
  getUserMe,
  getOrder,
  getOrders,
};

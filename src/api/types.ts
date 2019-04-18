import { string } from "prop-types";
import { getProductsByCategoryId } from ".";

export interface ICategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: ICategory;
  categoryid: number;
  description?: string;
  created?: Date;
  updated?: Date;
}

export interface IOrderline {
  id: number;
  orderid: number;
  productid: number;
  quantity: number;
  created: string;
  updated: string;
}

export interface IOrderlines {
  id: number;
  orderid: number;
  productid: number;
  product: IProduct; // Changed
  quantity: number;
  total: number; // Changed
  created?: Date;
  updated?: Date;
}

export interface IOrder {
  id: number;
  userid: number;
  cart: Boolean;
  name: string;
  address: string;
  orderlines: IOrderlines[];
  total: string;
  created?: Date;
  updated?: Date;
}

export interface IOrders {
  id: number;
  userid: number;
  cart: Boolean;
  name: string;
  address: string;
  created?: Date;
  updated?: Date;
}

export interface IUser {
  admin: boolean;
  email: string;
  token: string;
  username: string;
}

export interface IAuth {
  user: IUser;
  isUser: boolean;
  isAdmin: boolean;
  authLoading: boolean;
  match?: any;
  history?: any;
}

export interface IError {
  errors: string[],
  field: string;
  location: string;
}
// todo fleiri týpur

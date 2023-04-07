import {ProductRepository} from "./product.repository.js";
import { productDao } from "../factory.js";

export const productService = new ProductRepository(productDao);
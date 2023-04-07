import { options } from "../config/options.js";

let productDao;

switch (options.server.persistence) {
    case "mongo":
        ///solamente cuando se use mongo conectamos la base de datos
        await import("../config/dbConnection.js");
        //importar los managers
        const {ProductManagerMongo} = await import("./managers/productManagerMongo.js");
        const {ProductModel} = await import("./models/product.model.js");
        productDao = new ProductManagerMongo(ProductModel);
        break;
    case "fileSystem":
        const {ProductManagerFile} = await import("./managers/productManagerFile.js");
        productDao = new ProductManagerFile(options.fileSystem.productsFileName);
        break;
}

export {productDao};
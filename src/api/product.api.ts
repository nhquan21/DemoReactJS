import type { DisplayListingProduct } from "../features/product/product.types";
import type { ApiResponse } from "./utils/ApiResponse";

export const listProducts: DisplayListingProduct[] = [
    {
        id: 1,
        name: "Acer Nitro 6",
        price: 1500000,
        quantity: 10,
        productType: "Laptop",
        warranty: 22,
        power: 11,
        size: "RAM_16GB",
        image: "https://quan-hotel-images.s3.ap-southeast-2.amazonaws.com/4f1925e5-00c8-4287-a31b-1ff13009a46b_c6ad5b3f-2374-4f6a-a4fb-7c4a30e5ac6d_laptop-acer-nitro-6.jpg",
        material: "Nhom",
        createdDate: "2026-01-01T10:00:00"
    },
    {
        id: 2,
        name: "Dell In Spiron",
        price: 1700000,
        quantity: 14,
        productType: "Laptop",
        warranty: 22,
        power: 11,
        size: "RAM_8GB",
        image: "https://quan-hotel-images.s3.ap-southeast-2.amazonaws.com/b534aa08-c706-4e8e-bf64-24ee31bff2e7_9b0d6912-78c3-4fea-a445-549221d2bdd0_Dell_Inspiron.jpg",
        material: "Nhom",
        createdDate: "2026-01-02T10:00:00"
    },
    {
        id: 3,
        name: "Asus vivobook pro",
        price: 13000000,
        quantity: 4,
        productType: "Laptop",
        warranty: 16,
        power: 1,
        size: "RAM_8GB",
        image: "https://quan-hotel-images.s3.ap-southeast-2.amazonaws.com/ea9dc157-f680-4b28-a496-6cbcf49bf31c_Asus-Vivobokk-pro.webp",
        material: "Nhom",
        createdDate: "2026-01-03T10:00:00"
    },
    {
        id: 4,
        name: "MSI GF63",
        price: 2000000,
        quantity: 8,
        productType: "Laptop",
        warranty: 15,
        power: 1,
        size: "RAM_16GB",
        image: "https://quan-hotel-images.s3.ap-southeast-2.amazonaws.com/353a840b-f77b-49bb-909f-90e80e8be813_msi-gf63.jpg",
        material: "Nhom",
        createdDate: "2026-01-04T10:00:00"
    },
    {
        id: 5,
        name: "MSI Cryborg 15 AI",
        price: 18000000,
        quantity: 6,
        productType: "Laptop",
        warranty: 11,
        power: 1,
        size: "RAM_32GB",
        image: "https://quan-hotel-images.s3.ap-southeast-2.amazonaws.com/6c4944d2-1c5b-47cc-b475-0209bf90a7be_msi_cyborg_15_ai.jpg",
        material: "Nhom",
        createdDate: "2026-01-05T10:00:00"
    }
];

export const getAll = (): DisplayListingProduct[] => {
    return listProducts;
}

export const save = (
    product: DisplayListingProduct
): ApiResponse<DisplayListingProduct> => {

    const existingProduct = listProducts.find(
        item => item.name.toLowerCase() === product.name.toLowerCase()
    );

    if (existingProduct) {
        throw new Error("Product already exists");
    }

    const newProduct = {
        ...product,
        id: listProducts.length + 1,
    };

    listProducts.push(newProduct);

    return {
        code: 201,
        message: "Product created successfully",
        data: newProduct,
    };
};

export const edit = (
    id: number,
    product: DisplayListingProduct
): ApiResponse<DisplayListingProduct> => {

    const index = listProducts.findIndex(item => item.id === Number(id));

    if (index === -1) {
        throw new Error("Product not found");
    }

    // check trùng tên nhưng bỏ qua chính nó
    const duplicate = listProducts.find(
        item =>
            item.name.toLowerCase() === product.name.toLowerCase() &&
            item.id !== Number(id)
    );

    if (duplicate) {
        throw new Error("Another product with this name already exists");
    }

    const updatedProduct: DisplayListingProduct = {
        ...product,
        id: Number(id),
        createdDate: listProducts[index].createdDate, // giữ ngày tạo
    };

    listProducts[index] = updatedProduct;

    return {
        code: 200,
        message: "Product updated successfully",
        data: updatedProduct,
    };
};

export const findProduct = (id: any): DisplayListingProduct | undefined => {
    return listProducts.find(item => item.id === id);
};



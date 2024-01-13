export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    // type: Type;
    gender: Category
}

export interface CartProduct {
    id: string;
    slug: string;
    quantity: number;
    title: string;
    price: number;
    size: Size;
    image: string;
}

export interface ProductImage {
    id: number;
    url: string;
    productId: string;
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';
export type Category = 'men'|'women'|'kid'|'unisex'
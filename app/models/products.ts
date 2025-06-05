
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imagePath: string;
}

interface ProductDto {
    name: string;
    description: string;
    price: number;
    image: File;
}

interface ProductMetaDataDto {
    name: string;
    description: string;
    price: number;
    imagePath: string;
}





export type { Product, ProductDto, ProductMetaDataDto };
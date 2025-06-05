import { Product } from "./products";

interface OrderRequestDto {
    items: OrderItemDto[]; // Array of items in the order
    totalItemCount: number; // Total number of items in the order
    totalAmount: number; // Total amount for the order
    contactPerson: OrderContactPersonDto; // Contact person details for the order
    shippingAddress: AddressDto; // Shipping address for the order
}

interface OrderContactPersonDto {
    name: string; // Name of the contact person for the order
    phone: string; // Phone number of the contact person
}

interface OrderItemDto {
    productId: number; // ID of the product being ordered
    quantity: number;
    product: Product; // Include product details for easier access in the cart
    totalPrice: number; // Total price for this item (quantity * product price)
}

export type { OrderRequestDto, OrderContactPersonDto, OrderItemDto };
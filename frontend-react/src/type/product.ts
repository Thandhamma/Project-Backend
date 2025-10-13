export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    rating: number; // e.g., 4.5
    tags: string[];
    // สามารถเพิ่ม properties อื่นๆ ที่จำเป็นได้ในอนาคต
    // category?: string;
    // inStock?: boolean;
}
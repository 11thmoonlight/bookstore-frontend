// global.d.ts
declare global {
  interface Image {
    url: string;
    alternativeText: string;
  }

  interface AuthorImage {
    url: string;
    alternativeText: string;
  }

  interface Book {
    author: string;
    category: string;
    createdAt: string;
    authorImg: AuthorImage;
    description: string;
    discount: number;
    documentId: string;
    id: number;
    image: Image[];
    language: string;
    locale: null;
    name: string;
    pagesNum: number;
    price: number;
    publicationYear: string;
    publishedAt: string;
    publisher: string;
    rate: number;
    stock: number;
    updatedAt: string;
  }

  interface CartItems {
    createdAt: string;
    documentId: string;
    products: Book[];
    id: number;
    locale: null;
    publishedAt: null;
    updatedAt: string;
  }

  interface WhishListItems {
    createdAt: string;
    documentId: string;
    products: Book[];
    id: number;
    locale: null;
    publishedAt: null;
    updatedAt: string;
  }

  interface OrderProps {
    address: string;
    phoneNumber: number;
    postalCode: number;
    emailAddress: string;
  }

  interface OrderItems {
    address: string;
    phoneNumber: number;
    postalCode: number;
    emailAddress: string;
    orderStatus: string;
    payAmount: number;
    stripePaymentId: string;
    createdAt: string;
    documentId: string;
    id: number;
    locale: null;
    publishedAt: null;
    updatedAt: string;
  }

  interface User {
    blocked: boolean;
    cart: CartItems;
    confirmed: boolean;
    createdAt: string;
    documentId: string;
    email: string;
    id: number;
    locale: null;
    localizations: unknown[];
    orders: OrderItems[];
    provider: string;
    publishedAt: string;
    updatedAt: string;
    username: string;
    wishlists: WhishListItems[];
  }

  interface CheckoutFormValues {
    address: string;
    phoneNumber: string;
    postalCode: string;
    emailAddress: string;
  }
}

export {};

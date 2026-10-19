export type StrapiList<T> = {
  data: T[];
  meta: {
    pagination: { page: number; pageSize: number; pageCount: number; total: number };
  };
};

export type Media = {
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type StockStatus =
  | "out_of_stock"
  | "in_stock"
  | "low_stock"
  | "call_to_confirm";

export type Brand = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  isConfirmed: boolean;
  logo?: Media | null;
};

export type Category = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  parent?: Category | null;
  children?: Category[];
  image?: Media | null;
};

export type Product = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string | null;
  packSize?: string | null;
  unitOfSale?: string | null;
  price?: number | null;
  stockStatus: StockStatus;
  storageType?: string | null;
  category?: Category | null;
  brand?: Brand | null;
  images?: Media[] | null;
};

export type Branch = {
  documentId: string;
  name: string;
  slug: string;
  area?: string | null;
  address?: string | null;
  phone?: string | null;
  openingHours?: string | null;
  mapUrl?: string | null;
  isActive: boolean;
  sortOrder?: number | null;
};

export type DeliveryZone = {
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
  areas?: string | null;
  deliveryFee?: number | string | null;
  minimumOrder?: number | string | null;
  leadTime?: string | null;
  isActive: boolean;
  sortOrder?: number | null;
};

export type Faq = {
  documentId: string;
  question: string;
  answer: string;
  category?: string | null;
  sortOrder?: number | null;
};

export type PaymentMethod = {
  id: number;
  type: "bank" | "paybill" | "till";
  label?: string | null;
  accountName?: string | null;
  bankName?: string | null;
  branchName?: string | null;
  accountNumber?: string | null;
  paybillNumber?: string | null;
  tillNumber?: string | null;
  instructions?: string | null;
};

export type SiteSetting = {
  legalName?: string | null;
  whatsappNumber?: string | null;
  primaryPhone?: string | null;
  secondaryPhone?: string | null;
  salesEmail?: string | null;
  address?: string | null;
  openingHours?: string | null;
  kraPin?: string | null;
  vatNumber?: string | null;
  companyRegNumber?: string | null;
  fraudNotice?: string | null;
  paymentMethods?: PaymentMethod[] | null;
  odpcRegNumber?: string | null;
};
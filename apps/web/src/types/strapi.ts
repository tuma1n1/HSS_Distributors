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
  sortOrder?: number | null;
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
  description?: unknown;
  sizeLabel?: string | null;
  sizeSort?: number | string | null;
  shelfLifeDays?: number | null;
  vatTreatment?: "unknown" | "standard" | "zero_rated" | "exempt" | null;
  isFeatured?: boolean | null;
  isNew?: boolean | null;
};

export type Branch = {
  documentId: string;
  name: string;
  slug: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  openingHours?: string | null;
  mapUrl?: string | null;
  isMainBranch?: boolean | null;
  sortOrder?: number | null;
};

export type DeliveryZone = {
  documentId: string;
  name: string;
  slug: string;
  county?: string | null;
  wards?: string | null;
  deliveryFee?: number | string | null;
  minimumOrder?: number | string | null;
  freeDeliveryThreshold?: number | string | null;
  cutOffTime?: string | null;
  estimatedTime?: string | null;
  notes?: string | null;
  isActive?: boolean | null;
  sortOrder?: number | null;
};

export type Faq = {
  documentId: string;
  question: string;
  answer: unknown; // Strapi blocks
  group?: "ordering" | "delivery" | "payments" | "products" | "credit_terms" | "general" | null;
  sortOrder?: number | null;
};

export type PaymentMethod = {
  id: number;
  label: string;
  methodType?: "paybill" | "till" | "bank_transfer" | null;
  businessNumber?: string | null;
  accountNumber?: string | null;
  accountName?: string | null;
  bankName?: string | null;
  branchName?: string | null;
  notes?: string | null;
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
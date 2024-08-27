export type Product = {
  _id: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  productBrand: string;
  metaTitle: string;
  reviewCount?: number;
  averageRating?: number;
  metaDescription: string;
  shortDescription: string;
  longDescription: string;
  keywords: string;
  partNumber: string;
  sku: string;
  productDimensions: {
    length: number;
    width: number;
    height: number;
  };
  categoryId: {
    categoryName: string;
    categorySlug: string;
    id: string;
  };
  productStock: number;
  regularPrice: number;
  salePrice: number;
  shippingPrice: number;

  productImages: [
    {
      url: string;
      alt: string;
      _id: string;
    },
  ];

  productCondition: string;
  isFeaturedProduct: boolean;
  salesCount: number;
  addedToCartCount: number;

  compatibleWith: {
    vehicleMake: string;
    vehicleModel: [];
    vehicleSubmodel: [];
    vehicleEngine: [];
    vehicleYear: Array<number>;
  };

  merchant?: {
    _id: string;
    dispatchFreq: number;
    displayName: string;
    // merchantRating: number,
    storeSlug: string;
    businessLogoURL?: string;
    businessEmail: string;
    businessPhone: number;
    returnPolicyTerms: string;
    shippingPolicyTerms: string;
    aboutSeller: string;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
};

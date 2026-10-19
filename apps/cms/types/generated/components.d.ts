import type { Schema, Struct } from '@strapi/strapi';

export interface SharedPaymentMethod extends Struct.ComponentSchema {
  collectionName: 'components_shared_payment_methods';
  info: {
    displayName: 'payment-method';
  };
  attributes: {
    accountName: Schema.Attribute.String;
    accountNumber: Schema.Attribute.String;
    businessNumber: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    methodType: Schema.Attribute.Enumeration<
      ['paybill', 'till', 'bank_transfer']
    >;
    notes: Schema.Attribute.Text;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.payment-method': SharedPaymentMethod;
      'shared.seo': SharedSeo;
    }
  }
}

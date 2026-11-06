import type { Core } from '@strapi/strapi';

// What the storefront reads without a token. Enquiries are deliberately absent: they are only
// created through STRAPI_ENQUIRY_TOKEN and hold customer details.
const PUBLIC_READ_ACTIONS = [
  ...['product', 'category', 'brand', 'branch', 'delivery-zone', 'faq'].flatMap((name) => [
    `api::${name}.${name}.find`,
    `api::${name}.${name}.findOne`,
  ]),
  'api::site-setting.site-setting.find',
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * Permissions live in the database, not in git, so a new machine or a fresh database would
   * otherwise answer every storefront request with 403. Only adds what is missing.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const role = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });
    if (!role) return;

    const permissions = strapi.db.query('plugin::users-permissions.permission');
    for (const action of PUBLIC_READ_ACTIONS) {
      const existing = await permissions.findOne({ where: { action, role: role.id } });
      if (!existing) await permissions.create({ data: { action, role: role.id } });
    }
  },
};

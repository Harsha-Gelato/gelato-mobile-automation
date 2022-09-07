export const menuOptions = [
    'home_navigation_item',         // Home
    'orders_navigation_item',       // Orders
    'analytics_navigation_item',    // Analytics
    'catalog_navigation_item',      // Catalog
    'more_navigation_item',         // More
];

export const menClothingcatalogMap = [
    'T-shirts',
    'Tank Tops',
    '¾ Sleeve shirts',
    'Long sleeve shirts',
    'Sportswear',
    'Organic',
    'Hoodies',
    'Sweatshirts',
];

export const TShirtcatalogMap = [
    'Classic Unisex Crewneck T-shirt',
    'Premium Unisex Crewneck T-shirt',
    'Performance Unisex Crewneck T-shirt',
    'Polycotton Unisex Crewneck T-shirt',
    'Organic Unisex Crewneck T-shirt',
    'Premium Unisex V-Neck T-shirt',
    'Triblend Unisex Crewneck T-shirt',
    'Unisex Ringer T-shirt',
    'Heavyweight Unisex Crewneck T-shirt',
];

type AMap = Record<string, [string, string[]]>;
export const catalogMap: AMap = {
    'men': ['Men\'s clothing', menClothingcatalogMap],
    'women': ['Women\'s clothing', []],
    'kids': ['Kids & baby clothing', []],
    'phone': ['Phone cases', []],
    'wallart': ['Wall art', []],
    'wallpaper': ['Wallpaper', []],
    'mugs': ['Mugs', []],
    'photobooks': ['Photo books', []],
    'cards': ['Cards', []],
    'calendars': ['Calendars', []],
    'stationery': ['Stationery & Business', []],
    'tote': ['Tote Bags', []],
};

export const linksMap = {
    'terms_and_conditions_item': 'https://www.gelato.com/en-US/legal/api-terms/',
    'support_item': 'https://dashboard.staging.gelato.tech/chatbot',
    'policies_item': 'https://www.gelato.com/en-US/legal/privacy/',
    'google_play_link': 'https://play.google.com/store/apps/details?id=com.gelato.api.stage',
};

export const linksHeadingMap = {
    'terms_and_conditions_item': 'Gelato API Terms of Use',
    'support_item': 'How Do I Contact Gelato',
    'policies_item': 'Gelato Privacy Policy',
    'google_play_link': 'https://play.google.com/store/apps/details?id=com.gelato.api.stage',
};

export const languageMap = {
    'language_fr_FR': 'Langue',
    'language_es_ES': 'Idioma',
    'language_it_IT': 'Lingua',
    'language_de_DE': 'Sprache',
    'language_sv_SE': 'Språk',
    'language_nb_NO': 'Språk',
    'language_ja_JP': '言語',
    'language_vi_VN': 'Language',
    'language_nl_NL': 'Taal',
    'language_en': 'Language',
};

export const notificationOptions = [
    'notification_setting_push_order_status',
    'notification_setting_push_new_order',
    'notification_setting_push_shipment_alerts',
    'notification_setting_push_pending_approval',
    'notification_setting_push_pending_personalization',
];


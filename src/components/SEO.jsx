import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'TNG Shops';
const SITE_URL = 'https://tngshops.com';
const DEFAULT_DESC = 'Perfumes originales Lattafa y Armaf. Envío rápido y asesoría personal por WhatsApp. Fragancias que dejan huella.';

export default function SEO({ title, description = DEFAULT_DESC, image = '/images/og-image.png', type = 'website' }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Perfumes Originales Lattafa & Armaf`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="theme-color" content="#f59e0b" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <link rel="canonical" href={SITE_URL} />
    </Helmet>
  );
}

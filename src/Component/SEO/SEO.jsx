import React from 'react';

import { Helmet } from 'react-helmet-async';


const SEO = ({ title, description, canonicalLink }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonicalLink &&
      <link rel="canonical" href={canonicalLink} />
    }
  </Helmet>
);


export default SEO;
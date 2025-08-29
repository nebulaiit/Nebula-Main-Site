import React from "react";

const LazyImage = ({ src, alt, ...props }) => (
  <img src={src} alt={alt} loading="lazy" {...props} />
);

export default LazyImage;
import React from "react";

const LazyImage = ({ src, alt, ...props }) => (
  <img
    src={src}
    alt={alt}
    width={600}
    height={300}
    loading="lazy"
    {...props} />
);

export default LazyImage;
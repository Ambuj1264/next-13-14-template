import Image from "next/image";
import React from "react";

const ImageComponent = ({
  className = "",
  src = "",
  alt = "",
  height,
  width,
}: {
  className?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}) => {
  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      height={height}
      width={width}
    />
  );
};

export default ImageComponent;

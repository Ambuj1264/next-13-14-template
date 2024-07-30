import { useQueryContext } from "@/context/query/queryContext";
import { whiteColor, zIndex } from "@/styles/variables";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

const LoaderComponents = styled.div`
  position: fixed;
  top: 0%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
  background: ${whiteColor};
  transform: translate(-50%);
  z-index: ${zIndex.z1};
`;
const Loader = () => {
  const { loader } = useQueryContext();
  return loader ? (
    <LoaderComponents>
      <Image
        src="/assets/images/loader.gif"
        alt="loader"
        width={462}
        height={368}
      />
    </LoaderComponents>
  ) : null;
};

export default Loader;

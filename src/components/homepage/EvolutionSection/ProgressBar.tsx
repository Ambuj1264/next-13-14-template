import Loader from "@/components/ui/loader/Loader";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const ProgressBarContainer = styled.div`
  display: flex;
  height: 33px;
  margin: 20px 0;
  border-radius: 10px;
  position: relative;
`;

const style = {
  "border-top-left-radius": 0,
  "border-bottom-left-radius": 0,
};

const ProgressBarFill = styled.div<{ isFirst: any; zIndex: number }>(
  ({ isFirst, zIndex }) => css`
    transition: width 2s;
    height: 33px;
    border-radius: 10px;
    z-index: ${zIndex};
    margin-left: ${isFirst ? "-7px" : "7px"};
    ${isFirst}
  `,
);

interface ProgressProp {
  percentage: string;
  color: string;
}
interface WidthProp {
  [index: number]: number;
}
const ProgressIndex = {
  FIRST_INDEX: 0,
  SECOND_INDEX: 1,
  THIRT_INDEX: 2,
};

const getZindex = (value: number) => {
  if (value === ProgressIndex.FIRST_INDEX) {
    return 4;
  } else if (value === ProgressIndex.SECOND_INDEX) {
    return 2;
  } else {
    return 1;
  }
};

const ProgressBar = ({ progressData }: { progressData: ProgressProp[] }) => {
  const [widths, setWidths] = useState<WidthProp>([]);
  useEffect(() => {
    if (progressData) {
      requestAnimationFrame(() => {
        setWidths(
          progressData?.map((item) => {
            return parseFloat(item.percentage);
          }),
        );
      });
    }
  }, [progressData]);
  if (!progressData) {
    return <Loader />;
  }
  return (
    <>
      <ProgressBarContainer>
        {progressData?.map((item, index) => {
          return (
            <ProgressBarFill
              key={index}
              style={{
                width: `${widths[index]}%`,
                backgroundColor: item.color,
              }}
              isFirst={index !== 0 && style}
              zIndex={getZindex(index)}
            />
          );
        })}
      </ProgressBarContainer>
    </>
  );
};
export default ProgressBar;

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false },
);
import styled from "@emotion/styled";

const EmojiPickerComponent = ({
  open,
  onClose,
  setValue,
}: {
  open: boolean;
  onClose: () => void;
  setValue: (arg: string) => void;
}) => {
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emoji: { emoji: string }) => {
    setValue(emoji?.emoji);
  };

  return (
    <>
      {open && (
        <EmojiPickerPopup ref={emojiRef}>
          <EmojiPicker
            searchDisabled
            height={250}
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
            onEmojiClick={handleEmojiClick}
          />
        </EmojiPickerPopup>
      )}
    </>
  );
};

export default EmojiPickerComponent;

const EmojiPickerPopup = styled.div`
  position: absolute;
  right: 0;
  top: 0%;
  z-index: 1;
  transform: translate(0, -88%);
  z-index: 1;
  display: block;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  -webkit-animation: lide-up 0.3s ease-in-out;
  animation: lide-up 0.3s ease-in-out;
`;

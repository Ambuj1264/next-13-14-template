import React, { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import EditorToolBar, { formats } from "../editor/EditorToolbar";
import styled from "@emotion/styled";
import { fontFamily, greyColor } from "@/styles/variables";
import { typographyParagraph } from "@/styles/typography";
import { useScheduledContext } from "@/context/schedule/scheduledContext";
import { ErrorMessage } from "@/shared/UserMenu/SharedUserMenuComponents";
/* eslint-disable */
const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  { ssr: false, loading: () => <p>Loading...</p> },
);

QuillWrapper.displayName = "QuillWrapper";

function insertHash(
  quillEditor: {
    getSelection: () => { (): any; new (): any; index: number };
    insertText: (arg0: any, arg1: any) => void;
    setSelection: (arg0: any, arg1: number) => void;
    getLength: () => any;
  },
  hashtag: React.SetStateAction<string>,
) {
  const cursorPosition = quillEditor?.getSelection()?.index || 0;
  quillEditor.insertText(cursorPosition, hashtag);
  quillEditor.setSelection(quillEditor.getLength(), 0);
}

export function TextEditor(props: any) {
  const { editorState, editorErr, setEditorState, getEditorErr } =
    useScheduledContext();
  const [isBold, setIsBold] = useState(true);
  const [isItalic, setIsItalic] = useState(true);
  const [selectedText, setSelectedText] = useState(null);

  const quillRef = useRef<any>();

  const getEmptyElement = (html: string) => {
    if (html === "<p><br></p>") {
      setIsBold(true);
      setIsItalic(true);
    } else if (!html.includes("strong")) {
      setIsBold(true);
    } else if (!html.includes("em")) {
      setIsItalic(true);
    }
  };

  const handleChange = (html: any) => {
    setSelectedText(null);
    setEditorState({ editorHtml: html });
    getEmptyElement(html);
    getEditorErr(html);
  };

  const handleHash = (value: React.SetStateAction<string>) => {
    const editor = quillRef.current?.getEditor();
    quillRef.current?.getEditor().focus();
    if (editor) {
      insertHash(editor, value);
    }
  };

  const modules = {
    toolbar: "#toolbar",
    clipboard: {
      matchVisual: false,
    },
  };

  const handleBoldClick = useCallback(() => {
    quillRef.current?.getEditor().focus();
    const editor = quillRef.current?.getEditor();
    if (editor) {
      setIsBold(!isBold);
      editor.format("bold", isBold);
    }
  }, [isBold, quillRef.current]);

  const handleItalicClick = useCallback(() => {
    quillRef.current?.getEditor().focus();
    const editor = quillRef.current?.getEditor();
    setIsItalic(!isItalic);
    editor?.format("italic", isItalic);
  }, [isItalic, quillRef.current]);

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      editor.on("selection-change", (range: any) => {
        if (range) {
          const text = editor.getText(range);
          setSelectedText(text);
        }
      });
    }
  }, [quillRef.current]);

  const handleAddLink = (link: string) => {
    quillRef.current?.getEditor().focus();
    const range = quillRef.current.getEditor()?.getSelection();
    if (range) {
      quillRef.current
        ?.getEditor()
        .formatText(range.index, range.length, "link", link);
    }
  };
  const isEmpty = selectedText === null || selectedText === "";
  return (
    <TextEditorWrapper className="text-editor">
      <QuillWrapper
        theme="snow"
        forwardedRef={quillRef as any}
        value={editorState.editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        {...props}
        placeholder={props.placeholder}
      />
      <EditorToolBar
        hideLink={props.hideLink}
        isEmpty={isEmpty}
        handleAddLink={handleAddLink}
        handleBoldClick={handleBoldClick}
        isItalic={isItalic}
        isBold={isBold}
        handleItalicClick={handleItalicClick}
        setValue={handleHash}
      />
      {editorErr && <ErrorMessage>{editorErr}</ErrorMessage>}
    </TextEditorWrapper>
  );
}

const TextEditorWrapper = styled.div`
  min-height: 151px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .ql-editor {
    min-height: 100px;
    max-height: 300px;
    overflow-y: auto;
  }
  .ql-container.ql-snow {
    border: none !important;
  }
  .ql-toolbar.ql-snow {
    border: none !important;
  }
  .ql-snow .ql-stroke {
    stroke: ${greyColor};
  }
  .ql-editor.ql-blank::before {
    ${typographyParagraph};
    font-style: normal;
    font-family: ${fontFamily};
    color: ${greyColor};
  }
`;

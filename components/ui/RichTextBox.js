import React, { useState, useCallback, useRef, useEffect } from "react";
import { convertToRaw } from "draft-js";
import { Editor, EditorState, RichUtils } from "draft-js";
import { Box } from "@mui/material";

function MyEditor({ type, getData }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const isDiffEmptyFirstTime = useRef(true);
  const [isTouched, setIsTouched] = useState(false);
  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  });

  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const value = blocks.map((block) => block.text);

  const hasError = isTouched && !value[0].length !== 0;

  useEffect(() => {
    if (value.join().trim() !== "" && isDiffEmptyFirstTime.current) {
      isDiffEmptyFirstTime.current = false;
      setEditorState(RichUtils.toggleBlockType(editorState, type));
      getData(value);
    } else if (value.join().trim() === "") {
      isDiffEmptyFirstTime.current = true;
    }
    getData(value);
  }, [JSON.stringify(value)]);

  const blurHandler = () => {
    setIsTouched(false);
    console.log(hasError);
  };

  const focusHandler = () => {
    if (!isTouched) {
      setIsTouched(true);
    }
  };

  return (
    <React.Fragment>
      <Box
        // onClick={handleTrigger}
        onFocus={focusHandler}
        onBlur={blurHandler}
        sx={{
          width: "1",
          minHeight: "40px",
          paddingY: "3px",
          borderBottom: `${
            !isTouched ? "2px solid #949494" : "2px solid blue"
          }`,
        }}
      >
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          ariaExpanded
        />
      </Box>
    </React.Fragment>
  );
}

export default React.memo(MyEditor);

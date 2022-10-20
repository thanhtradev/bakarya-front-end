import React, { useState, useCallback, useRef, useEffect } from "react";
import { convertToRaw } from "draft-js";
import { Editor, EditorState, RichUtils } from "draft-js";
import { ButtonGroup, Button, Box, Stack } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

function MyEditor({ type }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const isDiffEmptyFirstTime = useRef(true);

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

  const onOrderListClick = useCallback(() => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  });

  useEffect(() => {
    if (value.join().trim() !== "" && isDiffEmptyFirstTime.current) {
      isDiffEmptyFirstTime.current = false;
      setEditorState(RichUtils.toggleBlockType(editorState, type));
    } else if (value.join().trim() === "") {
      isDiffEmptyFirstTime.current = true;
    }
    console.log(value);
  }, [value]);

  const onUnOrderListClick = useCallback(() => {
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  });

  return (
    <React.Fragment>
      <Box
        // onClick={handleTrigger}
        sx={{
          width: "1",
          minHeight: "50px",
          padding: "3px 5px",
          borderBottom: "1px solid #949494",
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

export default MyEditor;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .th-editor-wrapper {
    width: 100%;
  }

  .th-editor {
    border: 1px solid #f1f1f1;
    padding: 0.5rem;
    width: 100%;
    min-height: ${(props) => props.minHeight};

    .public-DraftStyleDefault-block {
      margin: 2px;
    }
  }
`;

const THEditor = ({ onChange, initialHtmlValue, minHeight, ...rest }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const contentBlock = htmlToDraft(initialHtmlValue);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [initialHtmlValue]);

  const handleChangeEditorState = (newEditorState) => {
    setEditorState(newEditorState);
    const newHtmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onChange(newHtmlValue);
  };

  return (
    <Wrapper minHeight={minHeight}>
      <Editor
        editorState={editorState}
        wrapperClassName="th-editor-wrapper"
        editorClassName="th-editor"
        onEditorStateChange={handleChangeEditorState}
        toolbar={{
          options: ['inline', 'blockType', 'list', 'link', 'emoji'],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
          },
          blockType: {
            inDropdown: false,
            options: ['Code'],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['unordered', 'ordered'],
          },
        }}
        {...rest}
      />
    </Wrapper>
  );
};

THEditor.propTypes = {
  onChange: PropTypes.func,
  initialHtmlValue: PropTypes.string,
  minHeight: PropTypes.string,
};

THEditor.defaultProps = {
  onChange: () => undefined,
  initialHtmlValue: '',
  minHeight: '10rem',
};

export default THEditor;

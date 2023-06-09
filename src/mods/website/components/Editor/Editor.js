import React, { useImperativeHandle, useMemo } from 'react';
import { createEditor, Transforms, Editor } from 'slate';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import renderElement from './renderElement';
import renderLeaf from './renderLeaf';
import Toolbar from './Toolbar';
import { DEFAULT_EDITOR_VALUE, HOTKEYS_MAP, HOTKEYS_MAP_KEYS, toggleMark } from './_utils';
import withCustomPlugins from './withCustomPlugins';

const Wrapper = styled.div`
  width: 100%;

  .editor {
    width: 100%;
    border: 2px solid #e2e8f0;
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 0.25rem;
    min-height: ${(props) => props.minHeight}px;

    ul,
    ol {
      margin: revert;
      padding: revert;
    }

    span[data-slate-placeholder='true'] {
      top: 0;
    }
  }
`;

const THEditor = (props) => {
  const { initialValue, onChange, minHeight, placeholder, editorRef } = props;

  const editor = useMemo(() => withCustomPlugins(withHistory(withReact(createEditor()))), []);

  const handleKeyPress = (event) => {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const hotkey of HOTKEYS_MAP_KEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const format = HOTKEYS_MAP.get(hotkey);
        toggleMark(editor, format);
        break;
      }
    }
  };

  useImperativeHandle(
    editorRef,
    () => ({
      resetEditor: () => {
        Transforms.delete(editor, {
          at: {
            anchor: Editor.start(editor, []),
            focus: Editor.end(editor, []),
          },
        });
      },
    }),
    [editor],
  );

  let fInitialValue = DEFAULT_EDITOR_VALUE;
  if (Array.isArray(initialValue)) {
    fInitialValue = initialValue;
  }

  return (
    <Wrapper minHeight={minHeight}>
      <Slate editor={editor} value={fInitialValue} onChange={onChange}>
        <Toolbar />
        <div className="editor">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={placeholder}
            spellCheck
            onKeyDown={handleKeyPress}
          />
        </div>
      </Slate>
    </Wrapper>
  );
};

THEditor.propTypes = {
  minHeight: PropTypes.number,
  initialValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  editorRef: PropTypes.func.isRequired,
};

THEditor.defaultProps = {
  minHeight: 250,
  initialValue: DEFAULT_EDITOR_VALUE,
  placeholder: 'Type something here...',
};

export default THEditor;

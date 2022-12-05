import React, { useMemo } from 'react';
import { createEditor } from 'slate';
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
  }
`;

const THEditor = (props) => {
  const { initialValue, onChange, minHeight, placeholder } = props;

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

  return (
    <Wrapper minHeight={minHeight}>
      <Slate editor={editor} value={initialValue} onChange={onChange}>
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
};

THEditor.defaultProps = {
  minHeight: 250,
  initialValue: DEFAULT_EDITOR_VALUE,
  placeholder: 'Type something here...',
};

export default THEditor;

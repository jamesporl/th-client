import React from 'react';
import { useSlate } from 'slate-react';
import styled from 'styled-components';
import {
  BoldOutlined,
  CodeOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { isMark, isMarkActive, isBlockActive, toggleBlock, toggleMark } from './_utils';

const Wrapper = styled.div`
  display: flex;
  padding: 0.25rem;

  .toolbar-group {
    display: flex;
    padding-right: 1rem;

  &:not(:last-child) {
    border-right: 1px solid #ccc;
    margin-right: 1rem;
  }

  > *:not(:last-child) {
    margin-right: 0.5rem;
  }

  button {
    border: none;
    display: block;
    border-radius: 0.25rem;
    cursor: pointer;
    width: 2rem;
    transition: all 0.2s ease-out;
    background-color: transparent;
    color: #718096;

    &.active,
    &:hover {
      background-color: #38a169;
      color: #fff;
    }
  }
`;

const Toolbar = () => {
  const editor = useSlate();

  const handleMouseDown = (ev, format) => {
    ev.preventDefault();
    if (isMark(format)) {
      toggleMark(editor, format);
    } else {
      toggleBlock(editor, format);
    }
  };

  return (
    <Wrapper>
      <div className="toolbar-group">
        <button
          type="button"
          className={isMarkActive(editor, 'bold') ? 'active' : ''}
          onMouseDown={(ev) => handleMouseDown(ev, 'bold')}
        >
          <BoldOutlined />
        </button>
        <button
          type="button"
          className={isMarkActive(editor, 'italic') ? 'active' : ''}
          onMouseDown={(ev) => handleMouseDown(ev, 'italic')}
        >
          <ItalicOutlined />
        </button>
        <button
          type="button"
          className={isMarkActive(editor, 'underline') ? 'active' : ''}
          onMouseDown={(ev) => handleMouseDown(ev, 'underline')}
        >
          <UnderlineOutlined />
        </button>
        <button
          type="button"
          className={isMarkActive(editor, 'code') ? 'active' : ''}
          onMouseDown={(ev) => handleMouseDown(ev, 'code')}
        >
          <CodeOutlined />
        </button>
      </div>
      <div className="toolbar-group">
        <button
          type="button"
          className={isBlockActive(editor, 'numbered-list') ? 'active' : ''}
          onMouseDown={(ev) => handleMouseDown(ev, 'numbered-list')}
        >
          <OrderedListOutlined />
        </button>
        <button
          type="button"
          className={isBlockActive(editor, 'bulleted-list') ? 'active' : ''}
          onMouseDown={(ev) => handleMouseDown(ev, 'bulleted-list')}
        >
          <UnorderedListOutlined />
        </button>
      </div>
    </Wrapper>
  );
};

Toolbar.propTypes = {};

Toolbar.defaultProps = {};

export default Toolbar;

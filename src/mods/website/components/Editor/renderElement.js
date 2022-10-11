import React from 'react';

export default function renderElement({ attributes, children, element }) {
  const style = {};
  switch (element.type) {
    case 'link':
      return (
        <a {...attributes} href={element.url} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children.map((c) => (
            <li key={c.key}>{c}</li>
          ))}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children.map((c) => (
            <li key={c.key}>{c}</li>
          ))}
        </ol>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
}

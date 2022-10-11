import { Element as SlateElement, Transforms, Editor } from 'slate';

export const isMark = (format) => ['bold', 'italic', 'underline', 'code'].includes(format);

export const HOTKEYS_MAP = new Map([
  ['mod+b', 'bold'],
  ['mod+i', 'italic'],
  ['mod+u', 'underline'],
  ['mod+`', 'code'],
]);

export const HOTKEYS_MAP_KEYS = Array.from(HOTKEYS_MAP, ([key]) => key);

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const DEFAULT_EDITOR_VALUE = [
  {
    children: [
      {
        type: 'text',
        text: '',
      },
    ],
  },
];

export const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    }),
  );

  return !!match;
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
    split: true,
  });

  let type = format;
  if (isActive) {
    type = 'paragraph';
  } else if (isList) {
    type = 'list-item';
  }

  const newProperties = { type };

  Transforms.setNodes < SlateElement > (editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

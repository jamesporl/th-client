import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./Editor'), { ssr: false });

const EditorWithForwardeddRef = forwardRef((props, ref) => <Editor {...props} editorRef={ref} />);

export default EditorWithForwardeddRef;

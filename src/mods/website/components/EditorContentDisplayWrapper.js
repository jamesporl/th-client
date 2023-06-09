import styled from 'styled-components';

const EditorContentDisplayWrapper = styled.div`
  ul,
  ol {
    margin: revert;
    padding: revert;
  }
  .text-bold {
    font-weight: bold;
  }
  .text-underline {
    text-decoration: underline;
  }
  .text-italic {
    font-style: italic;
  }
  .text-code {
    font-family: 'Menlo', 'DejaVu Sans Mono', 'Liberation Mono', 'Consolas', 'Ubuntu Mono',
      'Courier New', 'andale mono', 'lucida console', monospace;
    font-size: 0.9rem;
    color: #2d3748;
    background-color: #edf2f7;
    padding: 0.25rem 0.125rem;
    border-radius: 0.125rem;
  }
`;

export default EditorContentDisplayWrapper;

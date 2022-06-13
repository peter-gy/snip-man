import { Snippet } from '@geist-ui/core';
import { useSnippetNavigatorState } from '../context/SnippetNavigatorContext';

function SnippetDisplay() {
  const {
    state: { topics, selectedTopic, selectedSnippet },
    dispatch,
  } = useSnippetNavigatorState();

  const snip = "import { someFunc, type BaseType } from './some-module.ts";

  // TODO: code still not highlighted correctly
  return (
    <>
      <pre>
        <Snippet
          text={selectedSnippet?.content}
          filled
          width="300px"
          symbol=""
        />
        {/* <Code block my={0}>
          {snip}
        </Code> */}
      </pre>
    </>
  );
}

export default SnippetDisplay;

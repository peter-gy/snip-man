import { Code, Snippet, Text } from '@geist-ui/core';
import { useSnippetNavigatorState } from '../context/SnippetNavigatorContext';

function SnippetDisplay() {
  const {
    state: { selectedSnippet },
  } = useSnippetNavigatorState();

  const snip = "import { someFunc, type BaseType } from './some-module.ts";

  // TODO: code still not highlighted correctly
  return (
    selectedSnippet && (
      <>
        <div className="columns-1">
          <Text>{selectedSnippet.headline}</Text>
          <Text>{selectedSnippet.progLanguage.name}</Text>
          <Text>{selectedSnippet.progLanguage.version}</Text>
          <pre>
            <Snippet
              text={selectedSnippet?.content}
              filled
              width="300px"
              symbol=""
            />
            <Code block my={0}>
              {snip}
            </Code>
          </pre>
        </div>
      </>
    )
  );
}

export default SnippetDisplay;

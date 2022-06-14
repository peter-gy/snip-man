import { Badge, Display, Snippet, Spacer, Text } from '@geist-ui/core';
import { useSnippetNavigatorState } from '../context/SnippetNavigatorContext';

function SnippetDisplay() {
  const {
    state: { selectedSnippet },
  } = useSnippetNavigatorState();

  const langName = selectedSnippet?.progLanguage.name;
  const langVersion = selectedSnippet?.progLanguage.version;
  const createdAtString = new Date(selectedSnippet?.createdAt).toLocaleString();

  // TODO: code still not highlighted correctly
  return (
    selectedSnippet && (
      <div className="container">
        <div className="columns-auto p-4 ">
          <Text h2>{selectedSnippet.headline}</Text>
          <Badge type="success">{`${langName} (v${langVersion})`}</Badge>
          <Spacer h={2}></Spacer>
          <Display shadow caption={createdAtString}>
            <Snippet
              text={selectedSnippet?.content}
              symbol=""
              type="lite"
              className="pt-4"
            />
          </Display>
        </div>
      </div>
    )
  );
}

export default SnippetDisplay;

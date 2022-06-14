import { Badge, Display, Loading, Snippet, Spacer, Text } from '@geist-ui/core';
import { useSnippetNavigatorState } from '../context/SnippetNavigatorContext';

function SnippetDisplay() {
  const {
    state: { selectedSnippet, selectedTopic },
  } = useSnippetNavigatorState();

  const langName = selectedSnippet?.progLanguage.name;
  const langVersion = selectedSnippet?.progLanguage.version;
  const createdAtString = new Date(selectedSnippet?.createdAt).toLocaleString();

  // TODO: code still not highlighted correctly
  return (
    <>
      <div className="w-full flex flex-col items-start justify-start space-y-5">
        {selectedTopic && (
          <div className="flex space-x-2">
            <p className="p-0 m-0 mr-2 font-bold text-navy-600">Topic Tags</p>
            {selectedTopic.tags.map(({ name, color }) => (
              <span
                key={`${name}-${color}`}
                className="px-2 py-1 border-2 rounded-xl uppercase text-sm"
                style={{ borderColor: color }}
              >
                {name}
              </span>
            ))}
          </div>
        )}
        {selectedSnippet && (
          <div className="w-full flex-col grow">
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
        )}
        {!selectedSnippet && <Loading>Waiting for a Snippet</Loading>}
      </div>
    </>
  );
}

export default SnippetDisplay;

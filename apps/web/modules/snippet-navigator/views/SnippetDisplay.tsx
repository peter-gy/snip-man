import { Badge, Display, Divider, Loading, Snippet, Spacer, Text, Tooltip } from "@geist-ui/core";
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
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-4 justify-start items-center">
              <div className="py-2 px-3 bg-navy-700 text-2xl text-center rounded-lg">
                <p className="p-0 m-0 font-bold text-white uppercase">{selectedTopic.name}</p>
              </div>
              <div className="hidden lg:flex space-x-2">
                {selectedTopic.tags.map(({ name, color }) => (
                  <span
                    key={`${name}-${color}`}
                    className="px-2 py-1 border-2 rounded-xl capitalize text-sm"
                    style={{ borderColor: color }}
                  >
                {name}
              </span>
                ))}
              </div>
            </div>
            <Text blockquote my={0} font="1rem">
              {selectedTopic.description}
            </Text>
          </div>
        )}
        {selectedSnippet && (
          <>
            <div className="w-full py-2 border-t-2 border-navy-900"></div>
            <div className="w-full flex-col">
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
          </>
        )}
        {!selectedSnippet && <Loading>Waiting for a Snippet</Loading>}
      </div>
    </>
  );
}

export default SnippetDisplay;

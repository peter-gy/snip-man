import { Display, Loading, Snippet, Spacer, Tag, Text } from '@geist-ui/core';
import { useSnippetNavigatorState } from '../context/SnippetNavigatorContext';

function SnippetDisplay() {
  const {
    state: { selectedSnippet, selectedTopic },
  } = useSnippetNavigatorState();

  const langName = selectedSnippet?.progLanguage.name;
  const langVersion = selectedSnippet?.progLanguage.version;
  const createdAtString = new Date(selectedSnippet?.createdAt).toLocaleString();

  // TODO: use <Code> instead of snippet to highlight
  return (
    <>
      <div className="w-full flex flex-col items-start justify-start space-y-5">
        {selectedTopic && (
          <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3">
            <div className="flex space-x-4 justify-start items-center">
              <div className="py-2 px-3 bg-navy-700 text-2xl text-center rounded-lg">
                <p className="p-0 m-0 font-bold text-white uppercase">
                  {selectedTopic.name}
                </p>
              </div>
              <div className="hidden lg:flex space-x-2">
                {selectedTopic.tags.map(({ name, color }) => (
                  <span
                    key={`${name}-${color}`}
                    className="px-2 py-1 border-2 rounded-xl capitalize text-sm flex justify-center items-center text-center"
                    style={{ borderColor: color }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
            {selectedTopic.description && (
              <Text blockquote my={0} font="1rem" className="italic">
                {selectedTopic.description}
              </Text>
            )}
          </div>
        )}
        {!selectedTopic && <Loading>Select a Topic</Loading>}
        {selectedSnippet && (
          <>
            <div className="w-full py-2 border-t-2 border-navy-900"></div>
            <div className="w-full flex-col">
              <Text h2>{selectedSnippet.headline}</Text>
              <Tag
                invert
                type="secondary"
              >{`${langName} (v${langVersion})`}</Tag>
              <Spacer h={2}></Spacer>
              <div className="max-h-[37.5vh] sm:max-h-[42.5vh] md:max-h-[47.5vh] lg:max-h-[52.5vh] overflow-scroll drop-shadow-2xl">
                <Display caption={createdAtString}>
                  <Snippet
                    text={selectedSnippet?.content}
                    symbol=""
                    type="lite"
                    className="pt-4"
                  />
                </Display>
              </div>
            </div>
          </>
        )}
        {!selectedSnippet && <Loading>Select a Snippet</Loading>}
      </div>
    </>
  );
}

export default SnippetDisplay;

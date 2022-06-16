import { Loading, Modal, useModal } from '@geist-ui/core';
import { TagEntity } from '@snip-man/entities';
import { BsCodeSquare } from 'react-icons/bs';
import { Developer } from '../../../layout/views/Footer';
import TagSelector from '../../../tag-selector/view/TagSelector';
import ReportCard from '../../views/ReportCard';
import useLanguageDominanceReport from '../hooks/useLanguageDominanceReport';

const developer = {
  name: 'Simon Eckerstorfer',
  githubHandle: 'S-ecki',
  studentId: '11911424',
};

const title = (
  <div className="flex justify-center items-center">
    Find the most dominant languages by tags{' '}
    <span className="ml-2 font-bold">
      <BsCodeSquare />
    </span>
  </div>
);

const description =
  'This report enumerates the programming languages in which the longest code snippets have been written under a specific tag.';

function LanguageDominanceReportCard() {
  const { setVisible: setModalVisible, bindings: modalBindings } = useModal();

  const {
    mutate: getLanguageDominanceReport,
    data: queryResult,
    isLoading,
  } = useLanguageDominanceReport();

  async function onTagSelected(selectedTag: TagEntity) {
    if (!selectedTag) return;
    await getLanguageDominanceReport(selectedTag);
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-[-10px] p-6 bg-navy-700">
          <Developer {...developer} />
        </div>
        <ReportCard
          title={title}
          description={description}
          onExploreClick={() => setModalVisible(true)}
        />
      </div>
      <Modal {...modalBindings} width={3} height={50}>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Subtitle>Actionable Insights ⚡️</Modal.Subtitle>
        <Modal.Content>
          <div className="flex flex-col justify-center items-center space-y-2 sm:space-y-6">
            <p className="text-justify hidden sm:block">{description}</p>
            <div className="flex flex-col items-center justify-center">
              <h4>Please choose a tag</h4>
              <TagSelector onChange={onTagSelected} />
            </div>
            {isLoading && <Loading>Loading</Loading>}
            {queryResult?.data && (
              <>
                {
                  <div className="p-4 border-dashed border-black border-2 rounded-md flex justify-center items-start w-full max-h-[35vh] overflow-hidden">
                    {queryResult?.data.length === 0 && (
                      <p className="font-medium">No results were found</p>
                    )}
                    {queryResult?.data.length !== 0 && (
                      <div className="flex flex-col overflow-hidden">
                        <p className="font-medium">
                          The top 10 language for this tag are:
                        </p>
                        <div className="flex flex-1 items-center justify-center overflow-y-scroll max-h-[25vh]">
                          <div className="flex flex-col space-y-1.5 min-h-min">
                            {[...queryResult.data].map((ret) => (
                              <div
                                key={ret.name + ret.version}
                                className="border-gray-300 border-t-[0.5px] my-1 italic"
                              >
                                {ret.name +
                                  ' v' +
                                  ret.version +
                                  ' : ' +
                                  ret.length +
                                  ' characters'}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                }
              </>
            )}
          </div>
        </Modal.Content>
        <Modal.Action onClick={() => setModalVisible(false)}>
          <span className="font-bold">Done</span>
        </Modal.Action>
      </Modal>
    </>
  );
}

export default LanguageDominanceReportCard;

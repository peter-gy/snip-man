import ReportCard from '../../views/ReportCard';
import { BsCodeSquare } from 'react-icons/bs';
import { Developer } from '../../../layout/views/Footer';
import { Loading, Modal, useModal } from '@geist-ui/core';
import ProgLanguageSelector from '../../../prog-language-selector/views/ProgLanguageSelector';
import { ProgLanguageEntity } from '@snip-man/entities';
import useLanguageUsersReport from '../hooks/useLanguageUsersReport';

const developer = {
  name: 'Péter Ferenc Gyarmati',
  githubHandle: 'peter-gy',
  studentId: '11913446',
};

const title = (
  <div className="flex justify-center items-center">
    Find users active in specific languages{' '}
    <span className="ml-2 font-bold">
      <BsCodeSquare />
    </span>
  </div>
);
const description =
  'This report enumerates the email addresses of all users who have created at least 3 code snippets in the last month written in a specific programming language.';

function LanguageUsersReportCard() {
  const { setVisible: setModalVisible, bindings: modalBindings } = useModal();

  const {
    mutate: getLanguageUsersReport,
    data: queryResult,
    isLoading,
  } = useLanguageUsersReport();

  async function onLanguageSelected(selectedLang: ProgLanguageEntity) {
    if (!selectedLang) return;
    await getLanguageUsersReport(selectedLang);
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-[-10px] p-6 bg-navy-700">
          <Developer {...developer} />
        </div>
        <ReportCard
          onExploreClick={() => setModalVisible(true)}
          title={title}
          description={description}
        />
      </div>
      <Modal {...modalBindings} width={3} height={45}>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Subtitle>Actionable Insights ⚡️</Modal.Subtitle>
        <Modal.Content>
          <div className="flex flex-col justify-center items-center space-y-2 sm:space-y-6">
            <p className="text-justify hidden sm:block">{description}</p>
            <div className="flex flex-col items-center justify-center">
              <h4>Please choose a language</h4>
              <ProgLanguageSelector onChange={onLanguageSelected} />
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
                          The following email addresses were found:
                        </p>
                        <div className="flex flex-1 items-center justify-center overflow-y-scroll max-h-[25vh]">
                          <div className="flex flex-col space-y-1.5 min-h-min">
                            {[...queryResult.data, ''].map((email) => (
                              <div
                                key={email}
                                className="border-gray-300 border-t-[0.5px] my-1 italic"
                              >
                                {email}
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

export default LanguageUsersReportCard;

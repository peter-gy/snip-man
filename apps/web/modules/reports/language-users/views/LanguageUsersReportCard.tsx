import ReportCard from '../../views/ReportCard';
import { BsCodeSquare } from 'react-icons/bs';
import { Developer } from '../../../layout/views/Footer';
import { Loading, Modal, useModal } from '@geist-ui/core';
import ProgLanguageSelector from '../../../prog-language-selector/views/ProgLanguageSelector';
import { useState } from 'react';
import { ProgLanguageEntity } from '@snip-man/entities';
import useLanguageUsersReport from '../hooks/useLanguageUsersReport';
import { data } from 'autoprefixer';

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
  const [didSubmit, setDidSubmit] = useState(false);
  const [selectedLang, setSelectedLang] = useState<
    ProgLanguageEntity | undefined
  >(undefined);

  const {
    mutate: getLanguageUsersReport,
    data: queryResult,
    isLoading,
  } = useLanguageUsersReport();

  async function onSubmit() {
    setDidSubmit(true);
    if (!selectedLang) return;
    await getLanguageUsersReport(selectedLang.id);
  }

  const warningClass = 'font-bold text-red-600 underline';

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
      <Modal {...modalBindings} width={3} height={40}>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Subtitle>Actionable Insights ⚡️</Modal.Subtitle>
        <Modal.Content>
          <div className="flex flex-col justify-center items-center space-y-6">
            <p className="text-justify">{description}</p>
            <div className="flex flex-col items-center justify-center">
              <h4 className={didSubmit && !selectedLang ? warningClass : ''}>
                Please choose a language
              </h4>
              <ProgLanguageSelector
                initialValue={selectedLang}
                onChange={setSelectedLang}
              />
            </div>
            {isLoading && <Loading>Loading</Loading>}
            {queryResult?.data && <p>{JSON.stringify(queryResult?.data)}</p>}
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={() => setModalVisible(false)}>
          Back
        </Modal.Action>
        <Modal.Action onClick={onSubmit}>Submit</Modal.Action>
      </Modal>
    </>
  );
}
export default LanguageUsersReportCard;

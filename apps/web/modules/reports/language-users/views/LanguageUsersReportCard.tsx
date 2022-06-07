import ReportCard from '../../views/ReportCard';
import { BsCodeSquare } from 'react-icons/bs';
import { Developer } from '../../../layout/views/Footer';

const developer = {
  name: 'Péter Ferenc Gyarmati',
  githubHandle: 'peter-gy',
  studentId: '11913446',
};

function LanguageUsersReportCard() {
  return (
    <>
      <div className="flex flex-col">
        <div className="mb-[-10px] p-6 bg-navy-700">
          <Developer {...developer} />
        </div>
        <ReportCard
          title={
            <div className="flex justify-center items-center">
              Find users active in specific languages{' '}
              <span className="ml-2 font-bold">
                <BsCodeSquare />
              </span>
            </div>
          }
          description="This report enumerates the email addresses of all users who have created at least 3 code snippets in the last month written in a specific programming language."
        />
      </div>
    </>
  );
}

export default LanguageUsersReportCard;

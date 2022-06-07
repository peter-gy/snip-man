import ReportCard from '../../views/ReportCard';
import { BsCodeSquare } from 'react-icons/bs';

function LanguageUsersReportCard() {
  return (
    <>
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
    </>
  );
}

export default LanguageUsersReportCard;

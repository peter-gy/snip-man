import ReportCard from '../../views/ReportCard';
import { BiTrendingUp } from 'react-icons/bi';

function LanguageDominanceReportCard() {
  return (
    <>
      <ReportCard
        title={
          <div className="flex justify-center items-center">
            Find the most dominant languages by tags{' '}
            <span className="ml-2 font-bold">
              <BiTrendingUp />
            </span>
          </div>
        }
        description="This report enumerates the programming languages in which the most lines of code snippets have been written under a specific tag."
      />
    </>
  );
}

export default LanguageDominanceReportCard;

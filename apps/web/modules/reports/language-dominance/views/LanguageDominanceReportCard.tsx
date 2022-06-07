import ReportCard from '../../views/ReportCard';
import { BiTrendingUp } from 'react-icons/bi';
import { Developer } from '../../../layout/views/Footer';

const developer = {
  name: 'Simon Eckerstorfer',
  githubHandle: 'S-ecki',
  studentId: '11911424',
};

function LanguageDominanceReportCard() {
  return (
    <>
      <div className="flex flex-col">
        <div className="mb-[-10px] p-6 bg-navy-700">
          <Developer {...developer} />
        </div>
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
      </div>
    </>
  );
}

export default LanguageDominanceReportCard;

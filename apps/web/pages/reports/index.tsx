import { NextPage } from 'next';
import AppBar from '../../modules/app-bar/views/AppBar';
import LanguageUsersReportCard from '../../modules/reports/language-users/views/LanguageUsersReportCard';
import LanguageDominanceReportCard from '../../modules/reports/language-dominance/views/LanguageDominanceReportCard';

const Reports: NextPage = () => {
  return (
    <div className="h-screen bg-blue-100 flex flex-col">
      <AppBar />
      <div className="h-[70vh] mt-4 flex flex-col justify-start items-center">
        <h2>Data Analytics 🔎</h2>
        <div className="grow w-full grid grid-cols-2 items-center justify-items-center">
          <div className="p-2 md:p-4 max-w-[35vw]">
            <LanguageUsersReportCard />
          </div>
          <div className="p-2 md:p-4 max-w-[35vw]">
            <LanguageDominanceReportCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

import { NextPage } from 'next';
import AppBar from '../../modules/app-bar/views/AppBar';

const Reports: NextPage = () => {
  return (
    <div className="h-screen bg-blue-100 flex flex-col">
      <AppBar />
    </div>
  );
};

export default Reports;

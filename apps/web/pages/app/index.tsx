import { NextPage } from 'next';
import AppBar from '../../modules/app-bar/views/AppBar';

const AppIndex: NextPage = () => {
  return (
    <div className="h-screen bg-blue-100">
      <AppBar />
    </div>
  );
};

export default AppIndex;

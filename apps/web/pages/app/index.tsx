import { NextPage } from 'next';
import AppBar from '../../modules/app-bar/views/AppBar';

const AppIndex: NextPage = () => {
  return (
    <div className="h-screen bg-blue-100 flex flex-col">
      <AppBar />
      <div className="grid grid-cols-4 grow">
        <div className="bg-[red] col-span-1">Side</div>
        <div className="bg-[blue] col-span-3">Snippets</div>
      </div>
    </div>
  );
};

export default AppIndex;

import SnippetDisplay from 'apps/web/modules/snippet-navigator/views/SnippetDisplay';
import { NextPage } from 'next';
import AppBar from '../../modules/app-bar/views/AppBar';
import { useSnipManState } from '../../modules/snip-man-state/context/SnipManContext';
import { SnippetNavigatorStateProvider } from '../../modules/snippet-navigator/context/SnippetNavigatorContext';
import CreateTopicButton from '../../modules/snippet-navigator/views/CreateTopicButton';
import TopicTree from '../../modules/snippet-navigator/views/TopicTree';
import UserSelector from '../../modules/user-selector/views/UserSelector';

const Dashboard: NextPage = () => {
  const {
    state: { user },
  } = useSnipManState();
  return (
    <div className="h-screen bg-blue-100 flex flex-col">
      <AppBar />
      <div className="grid grid-cols-4 grow">
        {user && (
          <SnippetNavigatorStateProvider userId={user.id}>
            <div className="col-span-2 lg:col-span-1 p-2 bg-navy-50 drop-shadow-2xl">
              <div className="flex flex-col space-y-5">
                <CreateTopicButton />
                <TopicTree />
              </div>
            </div>
            <div className="col-span-2 lg:col-span-3">
              <div className="p-8 flex justify-center items-center">
                <SnippetDisplay />
              </div>
            </div>
          </SnippetNavigatorStateProvider>
        )}
        {!user && (
          <div className="col-span-4 m-4">
            <div className="flex flex-col text-center space-y-5">
              <h3>Yikes, we did not find a selected user... 🤷‍♂️</h3>
              <p>Please select a user again!</p>
              <UserSelector />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

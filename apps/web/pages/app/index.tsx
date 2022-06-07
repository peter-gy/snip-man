import { NextPage } from 'next';
import AppBar from '../../modules/app-bar/views/AppBar';
import { SnippetNavigatorStateProvider } from '../../modules/snippet-navigator/context/SnippetNavigatorContext';
import { useSnipManState } from '../../modules/snip-man-state/context/SnipManContext';
import UserSelector from '../../modules/user-selector/views/UserSelector';
import TopicTree from '../../modules/snippet-navigator/views/TopicTree';
import CreateTopicButton from '../../modules/snippet-navigator/views/CreateTopicButton';

const AppIndex: NextPage = () => {
  const {
    state: { user },
  } = useSnipManState();
  return (
    <div className="h-screen bg-blue-100 flex flex-col">
      <AppBar />
      <div className="grid grid-cols-4 grow">
        {user && (
          <SnippetNavigatorStateProvider userId={user.id}>
            <div className="col-span-1 p-2">
              <div className="flex flex-col space-y-5">
                <CreateTopicButton />
                <TopicTree />
              </div>
            </div>
            <div className="bg-[blue] col-span-3">Snippets</div>
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

export default AppIndex;

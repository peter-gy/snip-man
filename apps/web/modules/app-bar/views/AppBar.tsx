import { TbHome } from 'react-icons/tb';
import Link from 'next/link';
import { Path } from '../../routes/types/route.type';
import { Avatar, Tooltip } from '@geist-ui/core';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';

function AppBar() {
  const {
    state: { user },
  } = useSnipManState();
  return (
    <div className="bg-navy-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={Path.Home} passHref>
            <div className="flex items-center space-x-3 text-4xl text-white font-bold cursor-pointer">
              <TbHome />
              <div>
                Snip<span className="text-highlight">Man</span>
              </div>
            </div>
          </Link>
          {user && <UserAvatar username={user.username} email={user.email} />}
        </div>
      </div>
    </div>
  );
}

type UserAvatarProps = {
  username: string;
  email: string;
};

function UserAvatar({ username, email }: UserAvatarProps) {
  return (
    <div className="text-lg font-bold">
      <Tooltip text={email} placement="left">
        <Avatar
          text={username.charAt(0).toUpperCase()}
          isSquare={true}
          width={1.25}
          height={1.25}
        />
      </Tooltip>
    </div>
  );
}

export default AppBar;

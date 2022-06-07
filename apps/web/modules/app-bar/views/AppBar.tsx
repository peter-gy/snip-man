import Link from 'next/link';
import { Path } from '../../routes/types/route.type';
import { Avatar, Tooltip } from '@geist-ui/core';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';
import { getRoutes } from '../../routes/utils/route.util';
import { useRouter } from 'next/router';

function AppBar() {
  const router = useRouter();
  const {
    state: { user },
  } = useSnipManState();
  return (
    <nav className="bg-navy-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href={Path.Home} passHref>
                <div className="mr-8 text-2xl lg:text-4xl text-white font-bold cursor-pointer">
                  <div>
                    Snip<span className="text-highlight">Man</span>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <div className="flex space-x-4">
                {getRoutes().map((route) => {
                  const isSelected = router.asPath === route.path;
                  const selectedStyle =
                    'bg-navy-700 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer';
                  const unselectedStyle =
                    'text-gray-300 hover:bg-navy-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer';
                  return (
                    <Link key={route.label} href={route.path} passHref>
                      <div
                        className={isSelected ? selectedStyle : unselectedStyle}
                      >
                        {route.label}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {user && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <div>
                  <UserAvatar username={user.username} email={user.email} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
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

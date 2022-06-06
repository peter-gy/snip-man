import DashedContainer from '../../components/DashedContainer';
import useAppUsers from '../hooks/useAppUsers';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';
import { UserEntity } from '@snip-man/entities';
import { Select } from '@geist-ui/core';

function UserSelector() {
  const {
    state: { user },
  } = useSnipManState();
  const { data: queryRes, isLoading } = useAppUsers();
  const { dispatch } = useSnipManState();
  function selectUser(userJson: string) {
    const user = JSON.parse(userJson) as UserEntity;
    dispatch({ type: 'setUser', data: user });
  }
  return (
    <DashedContainer title="User Selection">
      {isLoading && <div>Loading...</div>}
      {queryRes?.data && queryRes?.data.length === 0 && (
        <div>Please populate the database</div>
      )}
      {queryRes?.data && queryRes?.data.length !== 0 && (
        <Select
          placeholder="Choose one"
          onChange={selectUser}
          initialValue={JSON.stringify(user)}
        >
          {queryRes.data.map((user) => (
            <Select.Option key={user.id} value={JSON.stringify(user)}>
              {user.username}
            </Select.Option>
          ))}
        </Select>
      )}
    </DashedContainer>
  );
}

export default UserSelector;

import { Loading, Select } from '@geist-ui/core';
import { TagEntity } from '@snip-man/entities';
import useTags from '../hooks/useTags';

type TagSelectorProps = {
  onChange: (value: TagEntity) => void;
  initialValue?: TagEntity;
};

function TagSelector({ onChange, initialValue }: TagSelectorProps) {
  const { data: queryRes, isLoading } = useTags();

  function onSelection(value: string) {
    const tag = JSON.parse(value) as TagEntity;
    onChange(tag);
  }

  return (
    <>
      {isLoading && <Loading>Loading</Loading>}
      {queryRes?.data && (
        <Select
          placeholder="Choose a tag"
          initialValue={initialValue ? JSON.stringify(initialValue) : undefined}
          onChange={onSelection}
        >
          {queryRes.data.map((tag) => (
            <Select.Option
              key={JSON.stringify(tag)}
              value={JSON.stringify(tag)}
            >
              {tag.name}
            </Select.Option>
          ))}
        </Select>
      )}
    </>
  );
}

export default TagSelector;

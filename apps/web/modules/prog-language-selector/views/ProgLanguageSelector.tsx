import { Loading, Select } from '@geist-ui/core';
import { ProgLanguageEntity } from '@snip-man/entities';
import useProgLanguages from '../hooks/useProgLanguages';

type ProgLanguageSelectorProps = {
  onChange: (value: ProgLanguageEntity) => void;
  initialValue?: ProgLanguageEntity;
  width?: number;
};

function ProgLanguageSelector({
  onChange,
  initialValue,
  width,
}: ProgLanguageSelectorProps) {
  const { data: queryRes, isLoading } = useProgLanguages();

  function onSelection(value: string) {
    const progLanguage = JSON.parse(value) as ProgLanguageEntity;
    onChange(progLanguage);
  }

  return (
    <>
      {isLoading && <Loading>Loading</Loading>}
      {queryRes?.data && (
        <Select
          width={width}
          placeholder="Choose a language"
          initialValue={initialValue ? JSON.stringify(initialValue) : undefined}
          onChange={onSelection}
        >
          {queryRes.data.map((progLanguage) => (
            <Select.Option
              key={JSON.stringify(progLanguage)}
              value={JSON.stringify(progLanguage)}
            >
              {progLanguage.name} (v{progLanguage.version})
            </Select.Option>
          ))}
        </Select>
      )}
    </>
  );
}

export default ProgLanguageSelector;

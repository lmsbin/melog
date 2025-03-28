import { memo } from 'react';
import { BaseInput, InputProps } from './BaseInput';

export type SearchInputProps = Pick<InputProps, 'onChange' | 'onKeyDown'>;

export const SearchInput = memo(function SearchInput({ onChange, onKeyDown }: SearchInputProps) {
  return <BaseInput onChange={onChange} onKeyDown={onKeyDown} />;
});

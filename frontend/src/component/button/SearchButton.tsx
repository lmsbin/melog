import { memo } from 'react';
import { BaseButton, ButtonProps } from './BaseButton';

export type SearchButtonProps = Pick<ButtonProps, 'onClick'>;

export const SearchButton = memo(function SearchButton({ onClick }: SearchButtonProps) {
  return <BaseButton onClick={onClick}>검색</BaseButton>;
});

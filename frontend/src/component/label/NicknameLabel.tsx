import { memo } from 'react';

export interface NicknameLabelProps {
    nickName: string;
}

export const NicknameLabel = memo(function ({ nickName }: NicknameLabelProps) {
    return <div>{nickName}</div>;
});

import { memo } from 'react';
import { HostLabel } from '../../host';

export interface NicknameLabelProps {
    nickName: string;
}

export const NicknameLabel = memo(function ({ nickName }: NicknameLabelProps) {
    return <HostLabel text={nickName} />;
});

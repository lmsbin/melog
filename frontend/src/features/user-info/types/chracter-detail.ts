import type { UserAbility } from '@/features/user-info/types/ability';
import type { UserHyperStatInfo } from '@/features/user-info/types/hyper-stat';
import type {
	ItemEquipment,
	ItemEquipmentTooltipViewModel,
	UserItemEquipment,
} from '@/features/user-info/types/item-equipment';
import type { UserStatInfo } from '@/features/user-info/types/stat';
import type { UserSymbolEquipment } from '@/features/user-info/types/symbol';
import type { UserInfo } from '@/features/user-info/types/user';

export type ItemEquipmentWithTooltip = Array<{
	item: ItemEquipment;
	tooltip: ItemEquipmentTooltipViewModel;
}>;

export type CharacterDetailProps = {
	nickName: string;
	isLoading: boolean;
	userInfo: UserInfo | null;
	userStatInfo: UserStatInfo | null;
	userAbility: UserAbility | null;
	userHyperStatInfo: UserHyperStatInfo | null;
	userItemEquipment: UserItemEquipment | null;
	userSymbolEquipment: UserSymbolEquipment | null;
	itemEquipmentWithTooltip: ItemEquipmentWithTooltip;
};

export const CHARACTER_DETAIL_TABS = [
	{ id: 'stats', label: '스탯' },
	{ id: 'equipment', label: '장비' },
	{ id: 'symbols', label: '심볼' },
	{ id: 'skills', label: '스킬' },
	{ id: 'union', label: '유니온' },
] as const;

export type CharacterDetailTabId = (typeof CHARACTER_DETAIL_TABS)[number]['id'];

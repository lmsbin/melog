import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserOverviewCard } from './UserOverviewCard';
import { userStore } from '@/store';
import {
    UserInfo,
    UserStatInfo,
    UserHyperStatInfo,
    UserItemEquipment,
    ItemEquipment,
    ItemOption,
} from '@/shared';

const mockUserInfo: UserInfo = {
    character_name: '요약캐릭터',
    world_name: '루나',
    character_level: 275,
    character_gender: '여',
    character_class: '패스파인더',
    character_class_level: '6차',
    character_exp: 999999999,
    character_exp_rate: '89.12%',
    character_guild_name: '요약길드',
    character_image:
        'https://avatar.maplestory.nexon.com/Character/ABCDEFGHIJKLMNOPQRSTUVWXYZ123456.png',
    character_date_create: '2024-03-01',
};

const mockUserStatInfo: UserStatInfo = {
    final_stat: [
        { stat_name: '전투력', stat_value: '5,123,456,789' },
        { stat_name: 'STR', stat_value: '12000' },
        { stat_name: 'DEX', stat_value: '18000' },
        { stat_name: 'INT', stat_value: '4000' },
        { stat_name: 'LUK', stat_value: '9000' },
        { stat_name: '보스 공격력', stat_value: '350%' },
        { stat_name: '크리티컬 데미지', stat_value: '80%' },
    ],
};

const mockHyperStatPreset: UserHyperStatInfo = {
    hyper_stat_preset_1: [
        {
            stat_type: '크리티컬 확률',
            stat_point: 50,
            stat_level: 10,
            stat_increase: '10%',
        },
        {
            stat_type: '보스 몬스터 공격 시 데미지 증가',
            stat_point: 50,
            stat_level: 10,
            stat_increase: '40%',
        },
        {
            stat_type: '방어율 무시',
            stat_point: 45,
            stat_level: 9,
            stat_increase: '45%',
        },
        {
            stat_type: '데미지',
            stat_point: 45,
            stat_level: 9,
            stat_increase: '27%',
        },
        {
            stat_type: 'STR',
            stat_point: 30,
            stat_level: 6,
            stat_increase: '90',
        },
    ],
    hyper_stat_preset_1_remain_point: 10,
    hyper_stat_preset_2: [
        {
            stat_type: 'DEX',
            stat_point: 30,
            stat_level: 6,
            stat_increase: '90',
        },
        {
            stat_type: '크리티컬 데미지',
            stat_point: 45,
            stat_level: 9,
            stat_increase: '27%',
        },
    ],
    hyper_stat_preset_2_remain_point: 5,
    hyper_stat_preset_3: [
        {
            stat_type: '일반 몬스터 공격 시 데미지 증가',
            stat_point: 30,
            stat_level: 6,
            stat_increase: '30%',
        },
        {
            stat_type: '경험치 획득량',
            stat_point: 20,
            stat_level: 4,
            stat_increase: '8%',
        },
    ],
    hyper_stat_preset_3_remain_point: 3,
};

const baseItemOption: ItemOption = {
    str: '100',
    dex: '100',
    int: '100',
    luk: '100',
    max_hp: '0',
    max_mp: '0',
    attack_power: '0',
    magic_power: '0',
    armor: '0',
    speed: '0',
    jump: '0',
};

const createMockItem = (overrides: Partial<ItemEquipment>): ItemEquipment => ({
    item_equipment_part: '모자',
    item_equipment_slot: '모자',
    item_name: '테스트 아이템',
    item_icon: 'https://ssl.nx.com/s2/game/maplestory/renewal/common/test/test_equip_icon.png',
    item_shape_name: '',
    item_shape_icon: '',
    item_total_option: baseItemOption,
    item_base_option: baseItemOption,
    potential_option_grade: '레전드리',
    additional_potential_option_grade: '유니크',
    potential_option_1: 'STR 12%',
    potential_option_2: 'DEX 9%',
    potential_option_3: '올스탯 6%',
    additional_potential_option_1: '공격력 9%',
    additional_potential_option_2: '크리티컬 데미지 8%',
    additional_potential_option_3: '보스 몬스터 공격 시 데미지 30% 증가',
    item_exceptional_option: {},
    item_add_option: {},
    scroll_upgrade: '0',
    cuttable_count: '0',
    golden_hammer_flag: '0',
    scroll_resilience_count: '0',
    scroll_upgradeable_count: '0',
    soul_name: '',
    soul_option: '',
    item_etc_option: baseItemOption,
    starforce: '22',
    item_starforce_option: baseItemOption,
    special_ring_level: 0,
    ...overrides,
});

const mockUserItemEquipment: UserItemEquipment = {
    item_equipment: [
        createMockItem({
            item_equipment_part: '무기',
            item_equipment_slot: '무기',
            item_name: '아케인셰이드 파이렛 봄',
        }),
        createMockItem({
            item_equipment_part: '보조무기',
            item_equipment_slot: '보조무기',
            item_name: '제네시스 카탈리스트',
        }),
        createMockItem({
            item_equipment_part: '엠블렘',
            item_equipment_slot: '엠블렘',
            item_name: '앱솔랩스 파이렛 엠블렘',
        }),
        createMockItem({
            item_equipment_part: '상의',
            item_equipment_slot: '상의',
            item_name: '에테르넬 파이렛 아머',
        }),
        createMockItem({
            item_equipment_part: '하의',
            item_equipment_slot: '하의',
            item_name: '에테르넬 파이렛 팬츠',
        }),
        createMockItem({
            item_equipment_part: '장갑',
            item_equipment_slot: '장갑',
            item_name: '아케인셰이드 파이렛 글러브',
        }),
    ],
};

const meta = {
    title: 'Features/UserInfo/UserOverviewCard',
    component: UserOverviewCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            userStore.setUserInfo(mockUserInfo);
            userStore.setUserStatInfo(mockUserStatInfo);
            userStore.setUserHyperStatInfo(mockHyperStatPreset);
            userStore.setUserItemEquipment(mockUserItemEquipment);
            return <Story />;
        },
    ],
} satisfies Meta<typeof UserOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

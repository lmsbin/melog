import { ItemEquipment } from '@/shared';

interface UserOverviewEquipmentRootProps {
    children: React.ReactNode;
}

const UserOverviewEquipmentRoot = ({ children }: UserOverviewEquipmentRootProps) => {
    return <section className="md:w-1/2">{children}</section>;
};

interface UserOverviewEquipmentHeaderProps {
    title: string;
}

const UserOverviewEquipmentHeader = ({ title }: UserOverviewEquipmentHeaderProps) => {
    return <div className="mb-1 text-xs font-semibold tracking-wide text-gray-400">{title}</div>;
};

interface UserOverviewEquipmentListProps {
    children: React.ReactNode;
}

const UserOverviewEquipmentList = ({ children }: UserOverviewEquipmentListProps) => {
    return (
        <div className="max-h-40 overflow-y-auto rounded-lg bg-gray-50 px-3 py-2 text-xs">
            {children}
        </div>
    );
};

interface UserOverviewEquipmentEmptyProps {
    message: string;
}

const UserOverviewEquipmentEmpty = ({ message }: UserOverviewEquipmentEmptyProps) => {
    return <div className="text-gray-500">{message}</div>;
};

interface UserOverviewEquipmentItemProps {
    equipment: ItemEquipment;
}

const UserOverviewEquipmentItem = ({ equipment }: UserOverviewEquipmentItemProps) => {
    return (
        <div className="flex items-center gap-2">
            {/* 아이콘이 없는 경우를 대비한 기본 배경 처리 */}
            <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={equipment.item_icon}
                    alt={equipment.item_name}
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium text-gray-800">
                        {equipment.item_name}
                    </span>
                    <span className="text-[10px] whitespace-nowrap text-gray-400">
                        {equipment.item_equipment_part}
                    </span>
                </div>
                <div className="text-[10px] text-gray-500">
                    스타포스 {equipment.starforce} / 잠재 {equipment.potential_option_grade}
                </div>
            </div>
        </div>
    );
};

interface UserOverviewEquipmentGridProps {
    children: React.ReactNode;
}

const UserOverviewEquipmentGrid = ({ children }: UserOverviewEquipmentGridProps) => {
    return <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{children}</div>;
};

export const UserOverviewEquipment = Object.assign(UserOverviewEquipmentRoot, {
    Header: UserOverviewEquipmentHeader,
    List: UserOverviewEquipmentList,
    Empty: UserOverviewEquipmentEmpty,
    Item: UserOverviewEquipmentItem,
    Grid: UserOverviewEquipmentGrid,
});

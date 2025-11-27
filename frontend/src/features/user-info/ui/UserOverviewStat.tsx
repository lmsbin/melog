export interface UserOverviewStatProps {
    mainStat?: { stat_name: string; stat_value: string };
    subStats: { stat_name: string; stat_value: string }[];
}

interface UserOverviewStatRootProps {
    children: React.ReactNode;
}

const UserOverviewStatRoot = ({ children }: UserOverviewStatRootProps) => {
    return <section className="md:w-1/2">{children}</section>;
};

interface UserOverviewStatHeaderProps {
    title: string;
}

const UserOverviewStatHeader = ({ title }: UserOverviewStatHeaderProps) => {
    return <div className="mb-1 text-xs font-semibold tracking-wide text-gray-400">{title}</div>;
};

interface UserOverviewStatMainValueProps {
    name?: string;
    value?: string;
}

const UserOverviewStatMainValue = ({ name, value }: UserOverviewStatMainValueProps) => {
    if (!name || !value) return null;

    return (
        <div className="mb-1 flex items-baseline justify-between text-sm">
            <span className="font-medium text-gray-800">{name}</span>
            <span className="font-semibold text-indigo-600">{value}</span>
        </div>
    );
};

interface UserOverviewStatGridProps {
    children: React.ReactNode;
}

const UserOverviewStatGrid = ({ children }: UserOverviewStatGridProps) => {
    return (
        <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-600">
            {children}
        </div>
    );
};

interface UserOverviewStatItemProps {
    name: string;
    value: string;
}

const UserOverviewStatItem = ({ name, value }: UserOverviewStatItemProps) => {
    return (
        <div className="flex items-center justify-between gap-1">
            <span className="truncate">{name}</span>
            <span className="font-medium text-gray-800">{value}</span>
        </div>
    );
};

export const UserOverviewStat = Object.assign(UserOverviewStatRoot, {
    Header: UserOverviewStatHeader,
    MainValue: UserOverviewStatMainValue,
    Grid: UserOverviewStatGrid,
    Item: UserOverviewStatItem,
});

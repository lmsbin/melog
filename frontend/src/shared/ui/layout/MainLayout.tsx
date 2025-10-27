import { memo, useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { NavButton } from '../base';

export const MainLayout = memo(function MainLayout() {
    return (
        <div>
            <header className="flex h-40 items-center justify-center border-b border-gray-100 bg-white">
                <div className="text-2xl font-light text-gray-700">메이플 로그</div>
            </header>
            <NavBar />
            <div className="flex w-full justify-around bg-gray-50">
                <div className="w-1/5 p-4"></div>
                <div className="flex w-full flex-col p-4">
                    <Outlet />
                </div>
                <div className="w-1/5 p-4"></div>
            </div>
        </div>
    );
});

const NavBar = memo(function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [{ url: '/', name: '메인' }];

    const onClickNavButton = useCallback(
        (index: number) => {
            const targetUrl = navItems[index].url;

            if (location.pathname !== targetUrl) {
                navigate(targetUrl);
            }
        },
        [navItems, location.pathname],
    );

    return (
        <nav className="flex h-10 w-full items-center justify-center border-b border-gray-100 bg-white shadow-sm">
            <div className="mx-auto max-w-4xl">
                <ul className="flex gap-2">
                    {navItems.map((x, index) => (
                        <NavButton
                            key={x.name}
                            onClick={onClickNavButton}
                            index={index}
                            isOpen={x.url === location.pathname}
                        >
                            {x.name}
                        </NavButton>
                    ))}
                </ul>
            </div>
        </nav>
    );
});

import { memo, useCallback, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BaseButton, NavButton } from '../component';

export const MainLayout = memo(function MainLayout() {
    return (
        <div>
            <header>헤더입니다</header>
            <NavBar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
});

const NavBar = memo(function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = useMemo(
        () => [
            {
                url: '/',
                name: '메인',
            },
        ],
        [],
    );

    const onClickNavButton = useCallback(
        (index: number) => {
            const targetUrl = navItems[index].url;

            if (location.pathname !== targetUrl) {
                navigate(targetUrl);
            }
        },
        [navItems, location],
    );

    return (
        <nav className="flex h-8 w-full items-center justify-center bg-red-100">
            <div className="mx-auto max-w-4xl">
                <ul className="flex gap-2">
                    {navItems.map((x, index) => (
                        <NavButton key={x.name} onClick={onClickNavButton} index={index}>
                            {x.name}
                        </NavButton>
                    ))}
                </ul>
            </div>
        </nav>
    );
});

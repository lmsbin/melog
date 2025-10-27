import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loading, MainLayout } from '@/shared';

// 페이지 컴포넌트들을 lazy import로 로드

const MainPage = lazy(() => import('../page/MainPage'));
const CharacterPageWrapper = lazy(() => import('../page/CharacterPage'));
const SearchPageWrapper = lazy(() => import('../page/SearchPage'));

export function Router() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="search" element={<SearchPageWrapper />} />
                    <Route path="character/:nickName" element={<CharacterPageWrapper />} />
                </Route>
                <Route path="*" element={<div>not found</div>} />
            </Routes>
        </Suspense>
    );
}

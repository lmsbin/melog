import { SearchBar } from '@/features';
import { memo } from 'react';

const MainPage = memo(function MainPage() {
    return (
        <>
            {/* 로고 */}
            {/* 서치바 */}
            <SearchBar />
            {/* 최근검색 */}
        </>
    );
});

export default MainPage;

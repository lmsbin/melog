import { memo } from 'react';
import { SearchBar } from '../component/SearchBar';
import { Card } from '../component';

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

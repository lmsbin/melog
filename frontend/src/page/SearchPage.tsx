import { memo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import getOcid from '../api/getOcid';

/**
 * 1. queryString을 파싱
 * 2. 위 정보를 토대로 API 요청, 응답
 * 3. 응답 결과가 단건이면 SearchPage를 띄우지 않고 정보 페이지로 이동
 * 4. 응답 결과가 다건이면 SearchPage에 prop을 내려 정보 띄우기
 * 현재는 길드 제외하고 캐릭터만 고려하고 있으므로, 항상 바로 정보페이지로 이동
 */
export const SearchPageWrapper = memo(function SearchPageWrapper() {
    const { searchedValue, ocid, setOcid } = useSearchPage();

    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            if (searchedValue) {
                const result = await getOcid({
                    key: searchedValue,
                    data: {
                        nickName: searchedValue,
                    },
                });

                if (result) {
                    setOcid(result.ocid);
                }
            }
        })();
    }, [searchedValue]);

    useEffect(() => {
        // 현재는 캐릭터만 고려.
        // ocid 존재 => 캐릭터 조회 성공 => 바로 캐릭터 정보 페이지로 이동
        if (ocid) {
            navigate(`/character/${searchedValue}`, {
                replace: true,
                state: { fromSearchPage: true },
            });
        }
    }, [ocid, navigate, searchedValue]);

    return <SearchPage />;
});

const SearchPage = memo(function SearchPage() {
    return <div></div>;
});

const useSearchPage = () => {
    const [searchParam] = useSearchParams();
    const [ocid, setOcid] = useState<string>();

    const searchedValue = searchParam.get('q');

    return {
        searchedValue,
        ocid,
        setOcid,
    };
};

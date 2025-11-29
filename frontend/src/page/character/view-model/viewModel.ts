/**
 * 캐릭터 상세 페이지 ViewModel
 *
 * - 닉네임을 기반으로 OCID를 조회합니다.
 * - 조회한 OCID를 사용해 여러 유저 정보 API를 병렬로 호출합니다.
 * - View에서는 이 ViewModel이 제공하는 데이터와 로딩 상태를 활용해
 *   캐릭터 상세 화면을 렌더링할 수 있습니다.
 *
 * 주의:
 * - 검색 기록 관리, 라우팅 이동 등 유저 액션/사이드이펙트 관련 로직은
 *   현재 단계에서는 포함하지 않고, 데이터 fetch 중심으로 구성합니다.
 */

import { useOcid } from '@/features/search/hooks/useOcid';
import {
	useUserAbility,
	useUserDojang,
	useUserHexaMatrix,
	useUserHyperStatInfo,
	useUserInfo,
	useUserItemEquipment,
	useUserPropensity,
	useUserSetEffect,
	useUserStatInfo,
	useUserSymbolEquipment,
	useUserVMatrix,
} from '@/features/user-info/hooks';

type UseCharacterPageViewModelParams = {
	nickName: string;
};

export function useCharacterPageViewModel({
	nickName,
}: UseCharacterPageViewModelParams) {
	// OCID 조회
	const {
		data: ocidData,
		isLoading: ocidLoading,
		isError: ocidError,
		error: ocidErrorDetail,
	} = useOcid(nickName);

	const ocid = ocidData?.ocid ?? null;

	// 유저 정보 조회
	const userInfoQuery = useUserInfo(ocid);
	const userStatInfoQuery = useUserStatInfo(ocid);
	const userHyperStatInfoQuery = useUserHyperStatInfo(ocid);
	const userPropensityQuery = useUserPropensity(ocid);
	const userAbilityQuery = useUserAbility(ocid);
	const userSymbolEquipmentQuery = useUserSymbolEquipment(ocid);
	const userSetEffectQuery = useUserSetEffect(ocid);
	const userVMatrixQuery = useUserVMatrix(ocid);
	const userHexaMatrixQuery = useUserHexaMatrix(ocid);
	const userDojangQuery = useUserDojang(ocid);
	const userItemEquipmentQuery = useUserItemEquipment(ocid);

	// 페이지 단위 로딩 상태 집계
	const isLoading =
		ocidLoading ||
		userInfoQuery.isLoading ||
		userStatInfoQuery.isLoading ||
		userHyperStatInfoQuery.isLoading ||
		userPropensityQuery.isLoading ||
		userAbilityQuery.isLoading ||
		userSymbolEquipmentQuery.isLoading ||
		userSetEffectQuery.isLoading ||
		userVMatrixQuery.isLoading ||
		userHexaMatrixQuery.isLoading ||
		userDojangQuery.isLoading ||
		userItemEquipmentQuery.isLoading;

	return {
		nickName,
		ocid,
		ocidError,
		ocidErrorDetail,
		isLoading,
		queries: {
			userInfo: userInfoQuery,
			userStatInfo: userStatInfoQuery,
			userHyperStatInfo: userHyperStatInfoQuery,
			userPropensity: userPropensityQuery,
			userAbility: userAbilityQuery,
			userSymbolEquipment: userSymbolEquipmentQuery,
			userSetEffect: userSetEffectQuery,
			userVMatrix: userVMatrixQuery,
			userHexaMatrix: userHexaMatrixQuery,
			userDojang: userDojangQuery,
			userItemEquipment: userItemEquipmentQuery,
		},
	};
}

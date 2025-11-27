/**
 * 유저 심볼 장비 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 심볼 장비 정보를 조회하는 useQuery hook입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserSymbolEquipment } from '../api/getUserSymbolEquipment';

export function useUserSymbolEquipment(ocid: string | null) {
	return useQuery({
		queryKey: ['userSymbolEquipment', ocid],
		queryFn: () => getUserSymbolEquipment({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5,
	});
}


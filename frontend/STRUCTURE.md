# 프로젝트 구조 가이드

## 📁 개선된 디렉토리 구조

```
frontend/
├── app/                          # Next.js App Router (페이지 라우팅)
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈 페이지 (/)
│   ├── _providers/               # 전역 Provider들
│   │   └── query-provider.tsx   # TanStack Query Provider
│   ├── search/
│   │   └── page.tsx              # 검색 페이지 (/search)
│   └── character/
│       └── [nickName]/
│           └── page.tsx          # 캐릭터 상세 페이지 (/character/:nickName)
│
├── src/
│   ├── features/                 # 기능별 모듈 (도메인 중심 구조)
│   │   │
│   │   ├── search/              # 검색 기능
│   │   │   ├── api/             # 검색 관련 API 함수들
│   │   │   │   ├── getOcid.ts   # OCID 조회 API
│   │   │   │   └── index.ts
│   │   │   ├── hooks/           # 검색 관련 TanStack Query hooks
│   │   │   │   ├── useSearch.ts        # 검색 입력/네비게이션 로직
│   │   │   │   ├── useSearchHistory.ts # 검색 기록 관리
│   │   │   │   └── index.ts
│   │   │   ├── types/           # 검색 관련 타입 정의
│   │   │   │   └── index.ts
│   │   │   └── components/      # 검색 관련 컴포넌트
│   │   │       ├── SearchBar.tsx
│   │   │       ├── SearchHistoryCard.tsx
│   │   │       └── index.ts
│   │   │
│   │   └── user-info/           # 유저 정보 기능
│   │       ├── api/             # 유저 정보 관련 API 함수들
│   │       │   ├── getUserInfo.ts
│   │       │   ├── getUserStatInfo.ts
│   │       │   ├── getUserAbility.ts
│   │       │   ├── getUserHyperStatInfo.ts
│   │       │   ├── getUserPropensity.ts
│   │       │   ├── getUserSymbolEquipment.ts
│   │       │   ├── getUserSetEffect.ts
│   │       │   ├── getUserVMatrix.ts
│   │       │   ├── getUserHexaMatrix.ts
│   │       │   ├── getUserDojang.ts
│   │       │   ├── getUserItemEquipment.ts
│   │       │   └── index.ts
│   │       ├── hooks/           # 유저 정보 관련 TanStack Query hooks
│   │       │   ├── useUserInfo.ts        # 단일 유저 정보 조회
│   │       │   ├── useUserStatInfo.ts
│   │       │   ├── useUserAbility.ts
│   │       │   └── index.ts
│   │       ├── types/           # 유저 정보 타입 정의
│   │       │   ├── user.ts      # UserInfo 타입
│   │       │   ├── stat.ts      # UserStatInfo 타입
│   │       │   ├── ability.ts  # UserAbility 타입
│   │       │   └── index.ts
│   │       └── components/      # 유저 정보 컴포넌트들
│   │           ├── UserInfoCard.tsx
│   │           ├── UserStatInfoCard.tsx
│   │           ├── UserAbilityCard.tsx
│   │           ├── UserPropensityCard.tsx
│   │           ├── UserSymbolCard.tsx
│   │           └── index.ts
│   │
│   └── shared/                   # 공통 코드
│       ├── api/
│       │   └── client.ts        # 공통 fetch 클라이언트 (baseURL, 에러 처리 등)
│       │
│       ├── components/           # 공통 UI 컴포넌트
│       │   ├── ui/              # 기본 UI 컴포넌트
│       │   │   ├── button/
│       │   │   │   ├── SearchButton.tsx
│       │   │   │   ├── NavButton.tsx
│       │   │   │   └── index.ts
│       │   │   ├── input/
│       │   │   │   ├── SearchInput.tsx
│       │   │   │   └── index.ts
│       │   │   ├── label/
│       │   │   │   ├── NicknameLabel.tsx
│       │   │   │   ├── WorldLabel.tsx
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   ├── layout/          # 레이아웃 컴포넌트
│       │   │   ├── MainLayout.tsx
│       │   │   └── index.ts
│       │   └── widget/          # 위젯 컴포넌트
│       │       ├── Card.tsx
│       │       ├── Grid.tsx
│       │       ├── Loading.tsx
│       │       └── index.ts
│       │
│       ├── utils/                # 유틸리티 함수들
│       │   ├── data/            # 데이터 변환 유틸
│       │   │   ├── converter.ts
│       │   │   ├── mapper.ts
│       │   │   └── index.ts
│       │   └── tailwind.ts
│       │
│       ├── types/                # 정말 공통 타입만 (API 기본 응답 형태 등)
│       │   └── index.ts
│       │
│       ├── constants/            # 상수들
│       │   ├── api.ts           # API 관련 상수 (BASE_URL 등)
│       │   └── index.ts
│       │
│       └── lib/                  # 라이브러리 설정/유틸
│           └── query.ts         # TanStack Query 기본 설정
```

## 🎯 구조 설계 원칙

### 1. Features 기반 구조 (도메인 중심)

-   **각 기능별로 완전히 독립적인 모듈**

    -   `api/`: 해당 기능의 모든 API 함수
    -   `hooks/`: 해당 기능의 모든 TanStack Query hooks
    -   `types/`: 해당 기능의 모든 타입 정의
    -   `components/`: 해당 기능의 모든 UI 컴포넌트

-   **장점**:
    -   기능별로 코드가 응집되어 있어서 찾기 쉬움
    -   기능 추가/수정 시 한 곳만 수정하면 됨
    -   기능 단위로 테스트하기 쉬움

### 2. Shared는 정말 공통 코드만

-   **여러 features에서 공통으로 사용하는 것만**

    -   `shared/api/client.ts`: 모든 API 호출의 기본 설정
    -   `shared/components/ui/`: 버튼, 입력창 같은 기본 UI 컴포넌트
    -   `shared/types/`: API 기본 응답 형태 같은 정말 공통 타입만

-   **주의**: 기능별 타입은 각 feature/types/에 위치

### 3. TanStack Query 중심 설계

-   **서버 데이터는 모두 TanStack Query로 관리**

    -   각 API별로 개별 `useQuery` hook 생성
    -   자동 캐싱, 리패칭, 에러 처리 등 자동화
    -   MobX store 같은 전역 상태 관리 불필요

-   **예시**:
    ```typescript
    // ❌ 기존: useFetchUserInfo가 10개 API를 한번에 호출
    // ✅ 개선: 각각 개별 hook으로 분리
    const { data: userInfo } = useUserInfo(ocid);
    const { data: statInfo } = useUserStatInfo(ocid);
    const { data: ability } = useUserAbility(ocid);
    ```

### 4. Next.js App Router

-   **파일 기반 라우팅**

    -   `app/search/page.tsx` → `/search` 경로
    -   `app/character/[nickName]/page.tsx` → `/character/:nickName`

-   **페이지는 최소한의 로직만**
    -   데이터 fetching은 hooks에서 처리
    -   UI는 components에서 처리
    -   페이지는 조합만 담당

## 📝 frontend_old 대비 개선점

### ✅ 개선된 점

1. **API와 Features 통합**

    - 기존: `api/` 별도 디렉토리, `features/`는 UI만
    - 개선: 각 feature 내부에 `api/` 포함

2. **Hook과 Features 통합**

    - 기존: `hook/` 별도 디렉토리
    - 개선: 각 feature 내부에 `hooks/` 포함

3. **타입 관리 개선**

    - 기존: `shared/data.ts`에 모든 타입 집중
    - 개선: 기능별로 `features/*/types/`에 분산

4. **TanStack Query 도입**

    - 기존: MobX store + 수동 캐싱
    - 개선: TanStack Query 자동 캐싱/상태 관리

5. **API 호출 개선**

    - 기존: `useFetchUserInfo`가 10개 API를 한번에 호출
    - 개선: 각 API별로 개별 hook 분리 (필요한 것만 호출 가능)

6. **구조 명확화**
    - 기존: `page/` 별도 디렉토리
    - 개선: Next.js App Router의 `app/` 사용

## 🔗 경로 별칭

`tsconfig.json`에 이미 설정되어 있음:

-   `@/*` → `./src/*`
-   예: `@/features/search/hooks` → `src/features/search/hooks`

## 📋 다음 단계

1. **TanStack Query Provider 설정** (`app/_providers/query-provider.tsx`)
2. **공통 API 클라이언트 구현** (`src/shared/api/client.ts`)
3. **기능별 API 함수 구현** (`src/features/*/api/`)
4. **TanStack Query Hooks 구현** (`src/features/*/hooks/`)
5. **타입 정의** (`src/features/*/types/`)
6. **컴포넌트 구현** (`src/features/*/components/`)
7. **페이지 컴포넌트 생성** (`app/*/page.tsx`)

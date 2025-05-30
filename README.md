# 🌿 cotree-frontend

환경을 키우는 소비, 친환경 소비를 유도하는 웹 기반 리워드/게이미피케이션 플랫폼

---

## ⚙️ Tech Stack

- **React 19** –
- **Vite** – 번들링 및 모듈 시스템
- **Tailwind CSS v4** – 커스텀 OKLCH 컬러 시스템 적용
- **ShadCN UI** – UI 컴포넌트 라이브러리
- **FSD (Feature-Sliced Design)** 기능 단위 도메인 구조 설계
- **Ky** - axios 대신 경량 fetch 클라이언트 사용
- **React Query** – API 캐싱/로딩/에러 관리

---

## 🧱 구조

```bash
src/
├── app/            # 앱 진입점 및 Provider 설정
├── pages/          # 라우팅 단위 페이지
├── widgets/        # UI 조합 단위
├── features/       # 독립 기능 단위 (ex. 투표, 트리성장 등)
├── entities/       # 도메인 상태 및 API (ex. user, tree, product)
├── shared/         # 공통 UI, 타입, 유틸
```

## 🐳 Docker 기반 개발 환경 실행

1. 레포지토리 클론

```bash
git clone https://github.com/your-org/cotree-frontend.git
cd cotree-frontend
```

2. 개발 서버 실행

```bash
yarn docker dev
```

- 내부적으로 `docker-compose -f docker-compose.dev.yml up --build` 를 실행합니다. 코드 변경 시 자동 반영(Hot Reload)이 적용됩니다.

---

3. 로컬 접속

```bash
http://localhost:5173
```

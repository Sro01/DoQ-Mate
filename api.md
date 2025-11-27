# API

- 모든 API는 다음 구조를 따름

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}
```

---

## 1. 공용(비로그인)영역 (/api/chatbots)

### 1-1. 챗봇 목록 조회
<!-- 
- 질의: `GET /api/chatbots`
- 목적: 메인 홈 화면 및 좌측 패널에 띄울 챗봇 리스트 용도
- 인증: 없음
- 동작:
    - 비로그인: is_public = true인 챗봇만 대상 (front에서 처리)
    - 로그인: 모든 챗봇 대상
- 응답 예시

```json
[
  {
    "chatbot_id": "{챗봇에 부여될 고유 ID}",
    "name": "{관리자가 설정한 봇 이름}",
    "description": "{관리자가 설정할 해당 봇의 설명 (필요시 추가)}",
    "is_public": true
  },
  {
    "chatbot_id": "bot_0002", // 서버 생성 고유 id
    "name": "사내 메뉴얼", // 관리자가 생성 시 입력하는 봇 이름
    "description": "내부 매뉴얼 질의응답 봇", // 필요시 추가할 항목...
    "is_public": false // 공개 여부 (마찬가지로 관리자가 설정함)
  }
]
``` -->

### 1-2. 챗봇 질의 및 시스템 응답
<!-- 
- 질의: `POST /api/chats`
- 목적: 사용자 질의 (최초 채팅 시작 시에도 해당 API 사용)
- 요청 예시

```json
{
  "chatbot_id": "{chatbot id}",
  "session_id": "{session id}", // 클라이언트 로컬에서 생성 (UUID 등). 서버는 로깅/통계용.
  "messages": [
    {
      "role": "user", // 관리자면 admin. 실질적인 쓰임새는 통계용 말고는 크게 없을듯.
      "content": "농가에서 발주처 그룹을 등록하는 방법이 뭐죠?", // 사용자 쿼리
      "is_first": true // 처음이면 true이기 때문에 응답에서 쿼리 한줄요약 수행.
    }
  ]
}
```

- 응답 예시

```json
{
  "answer": "발주처 그룹을 등록하려면 다음 순서를 따르면 됩니다. ...", // rag pipeline 응답
  "supporting_chunks": [
    { // 이 부분은 현재 rag pipeline상 구현된 부분을 그대로 가져옴. 수정 발생 가능성 있음.
      "chunk_id": "manual-001_p2_c1",
      "score": 0.87,
      "meta": {
        "filename": "급식센터_매뉴얼.pdf",
        "page": 37,
        "manual_id": "manual-001"
      }
    }
  ],
  "uncertainty": "low",
  "suggested_title": "발주처 그룹 등록 방법" // 요청단계 is_first == true만 채워짐.
}
``` -->

---

## 2. 인증 및 관리자 계정 관련 (/api/auth)

### 2-1. 관리자 로그인

<!-- - 질의: `POST /api/auth/login`
- 목적: 로그인 페이지 상 관리자 로그인 용도
- 요청 예시

```json
{
  "username": "{id}",
  "password": "{password}"
}
```

- 응답 예시

```json
{
  "access_token": "{json web token 문자열}",
  "token_type": "{token type}" // Auth header에 Bearer {token} 형태로 사용될 예정...
}
``` -->

### 2-2. 내 정보 조회

<!-- - 질의: `GET /api/auth/me`
- 목적: 로그인 후 해당 로그인 세션이 누구의 것인지 표시하기 위함
- 응답 예시

```json
{
  "admin_id": "{adminid}", // DB 상 PK
  "username": "docu",
  "name": "도큐"
}
``` -->

### 2-3. 비밀번호 변경

- 질의: `PATCH /api/auth/me/password`
<!-- - 목적: 마이페이지 내 회원정보 재설정 페이지에서 비밀번호를 재설정하기 위함
- 요청 예시

```json
{
  "old_password": "passwd1234",
  "new_password": "thisisrealpasswd"
}
```

- 응답 예시 (성공 시)

```json
{
  "success": true
}
``` -->

### 2-4. 아이디 찾기

- 질의: `POST /api/auth/find-username`
<!-- - 목적: 이름만 알고 있는 경우, 아이디 일부를 마스킹하여 보여줌
- 요청 예시

```json
{
  "name": "김도큐"
}
```

- 응답 예시

```json
{ // 동명이인 발생 가능성이 있으므로 아이디 후보를 전부 받아야 함.
  "candidates": [
    { // 마스킹 자체는 서버에서 "먼저 수행한 뒤" 마스킹된 정보를 프론트로 내릴 것.
      "username_masked": "kim***123" // 실제 username: "kimdoq123" 같은 것을 마스킹한 형태
    }
  ]
} 
``` -->

### 2-5. 비밀번호 재설정

<!-- - 질의: `POST /api/auth/reset-password`
- 목적: 이름/아이디를 알고 있을 때 비밀번호 재성성
- 동작:
    - username+name이 일치하는 계정을 찾음
    - 임시 비밀번호를 서버에서 자동 생성하여 DB에 저장
    - 응답으로 임시 비밀번호를 반환 (화면상에 표시해줘야 함)
    - 해당 유저는 임시 비밀번호로 로그인한 뒤 개인정보 변경에서 비밀번호를 변경하여 사용.
- 요청 예시

```json
{
  "username": "kimdoq123",
  "name": "김도큐"
}
```

- 응답 예시

```json
{
  "temp_password": "A9f3kdL2" // 서버가 랜덤 생성한 임시 비밀번호
}
``` -->

---

## 3. 관리자 가입 관련 (/api/signup)

### 3-1. 가입 신청 생성

<!-- - 질의: `POST /api/signup`
- 목적: 비로그인 상태에서 새로운 계정을 생성하기 위함
- 요청 예시

```json
{
  "username": "kimdoq123",
  "password": "pw1234",
  "name": "김도큐"
}
```

- 응답 예시

```json
{
  "signup_id": "signup_0001", // 서버가 생성한 신청 ID
  "username": "kimdoq123",
  "name": "김도큐",
  "created_at": "2025-01-01T00:00:00Z"
}
``` -->

### 3-2. ID 중복 확인

<!-- - 질의:  `GET /api/signup/check-username?username={username}`
- 목적: 회원가입 시 아이디 중복을 피하기 위함
- 응답 예시

```json
{ "available": true }
``` -->

### 3-3. 가입 신청 목록 조회

<!-- - 질의: `GET /api/signup`
- 목적: 관리자가 가입 신청 내역을 확인하기 위함
- 응답 예시

```json
[
  {
    "signup_id": "signup_0001", // 서버가 생성한 신청 ID
    "username": "kimdoq123",
    "name": "김도큐",
    "created_at": "2025-01-01T00:00:00Z"
  },
  {
    "signup_id": "signup_0002",
    "username": "parkdoc",
    "name": "박도큐",
    "created_at": "2025-01-02T00:00:00Z"
  }
]

``` -->

### 3-4. 가입 신청 상세 조회

- 질의: `GET /api/signup/{signup_id}`
- 목적: 특정 가입 신청의 상세 정보를 확인하기 위함.
- 응답은 만약 추가되는 정보가 없다면 당장은 위와 같습니다. 따라서 가입 신청 상세 조회 페이지는 아예 필요가 없을 가능성도 생깁니다. (추후 메모/비고/추가 정보 등 무엇이든 붙을 수 있는 여지…)
- 응답 예시

```json
{
  "signup_id": "signup_0001", // 서버가 생성한 신청 ID
  "username": "kimdoq123",
  "name": "김도큐",
  "created_at": "2025-01-01T00:00:00Z",
  "details": "...",
}
```

### 3-5. 가입 신청 승인 및 반려

<!-- - 질의:
    - 승인: `POST /api/signup/{signup_id}/approve`
    - 반려: `POST /api/signup/{signup_id}/reject`
- 목적: 해당 가입 신청을 승인 및 반려하기 위함.
- 동작:
    - 승인 시:
        - DB 상 admins 테이블에 계정 생성
        - signups 테이블에서 해당 신청 삭제
    - 반려 시:
        - signups 테이블에서 삭제
- 응답 예시

```json
{
  "success": true
}
``` -->

---

## 4. 가입자(관리자) 관리 (/api/admin)

### 4-1. 관리자 계정 목록 조회

<!-- - 질의: `GET /api/admin`
- 목적: 가입자 관리 페이지의 관리자 목록 테이블 표시용
- 응답 예시

```json
[
  {
    "admin_id": "admin_0001",
    "username": "docu",
    "name": "도큐",
    "created_at": "2025-01-01T00:00:00Z"
  },
  {
    "admin_id": "admin_0002",
    "username": "kimdoq",
    "name": "김도큐",
    "created_at": "2025-02-10T00:00:00Z"
  }
]
``` -->

### 4-2. 관리자 계정 상세 조회

<!-- - 질의: `GET /api/admin/{admin_id}`
- 목적: 특정 관리자 상세 정보를 별도 제공된 화면에서 보고 싶을 때 사용 가능 (필요 없거나 기능 최소화를 위해 삭제할 수 있을듯.)
- 응답 예시

```json
{
  "admin_id": "admin_0001",
  "username": "docu",
  "name": "도큐",
  "created_at": "2025-01-01T00:00:00Z",
  "last_login_at": "2025-11-18T10:00:00Z"
}
``` -->

### 4-3. 관리자 계정 삭제 (추방)

<!-- - 질의: `DELETE /api/admin/{admin_id}`
- 목적: 해당 관리자 계정을 삭제하기 위함
- 응답 예시

```json
{
  "success": true
}
``` -->

---

## 5. 챗봇 관리 (/api/set/chatbots)

### 5-1. 챗봇 목록 조회

<!-- - 질의: `GET /api/set/chatbots`
- 목적: 관리자 패널에서 챗봇 관리를 수행하기 위함. 모든 챗봇 목록을 가져옴.
- 응답 예시

```json
[
  {
    "chatbot_id": "bot_0001", // 서버 자동 생성
    "name": "사내 매뉴얼 챗봇",
    "description": "사내 매뉴얼 관련한 응답을 주는 챗봇",
    "is_public": true,
    "created_at": "2025-01-01T00:00:00Z",
    "manual_count": 5
  },
  {
    "chatbot_id": "bot_0002",
    "name": "외부 고객 FAQ 봇",
    "description": "외부 고객용 FAQ 응답 챗봇",
    "is_public": false,
    "created_at": "2025-02-15T00:00:00Z",
    "manual_count": 2
  }
]
``` -->

### 5-2. 챗봇 생성

<!-- - 질의: `POST /api/set/chatbots`
- 목적:
- 요청 예시

```json
{
  "name": "사내 매뉴얼 챗봇", // 필수
  "description": "사내 매뉴얼 관련한 응답을 주는 챗봇", // 선택
  "is_public": true // 기본값 true
}
```

- 응답 예시

```json
{
  "chatbot_id": "bot_0003", // 서버 자동 생성
  "name": "사내 매뉴얼 챗봇",
  "description": "사내 매뉴얼 관련한 응답을 주는 챗봇",
  "is_public": true,
  "created_at": "2025-11-18T00:00:00Z"
}
``` -->

### 5-3. 챗봇 상세 조회

<!-- - 질의: `GET /api/set/chatbots/{chatbot_id}`
- 목적: 해당 챗봇의 설정 페이지에서 나오는 기본 정보 반환 용도
- 응답 예시

```json
{
  "chatbot_id": "bot_0001",
  "name": "사내 매뉴얼 챗봇",
  "description": "사내 매뉴얼 관련한 응답을 주는 챗봇",
  "is_public": true,
  "created_at": "2025-01-01T00:00:00Z"
}
``` -->

### 5-4. 챗봇 설정 수정 (챗봇 이름/설명/공개 여부 등)

<!-- - 질의: `PATCH /api/set/chatbots/{chatbot_id}`
- 목적: 챗봇 상세설정 수정 용도
- 요청 예시 (마찬가지로 수정 가능)

```json
{
  "name": "DoQ-Mate 운영봇",
  "description": "운영 매뉴얼 질의응답 전용 챗봇",
  "is_public": false
}
```

- 응답 예시

```json
{
  "chatbot_id": "bot_0001",
  "name": "DoQ-Mate 운영봇",
  "description": "운영 매뉴얼 질의응답 전용 챗봇",
  "is_public": false,
  "created_at": "2025-01-01T00:00:00Z"
}
``` -->

### 5-5. 챗봇 삭제

<!-- - 질의: `DELETE /api/set/chatbots/{chatbot_id}`
- 목적: 해당 챗봇 관련한 내용을 삭제하기 위함
- 동작:
    - 관련 백엔드 정책 (피드백 필요…): 해당 챗봇 관련된 모든 DB 레코드 및 벡터 인덱스 삭제. (즉 모든 흔적을 남기지 않고 전부 지워버림.)
- 응답 예시

```json
{
  "success": true
}
``` -->

---

## 6. 챗봇별 문서 관리 (/api/set/chatbot/{chatbot_id}/manuals)

### 6-1. 문서 업로드

- 질의: `POST /api/set/manuals?chatbot_id={chatbot_id}`
- Content-type: `multipart/form-data` (FormData 생성 이후 append…)
- 목적: 해당 챗봇이 참조할 PDF 문서를 업로드하고, 인덱싱 파이프라인을 비동기로 시작하기 위함.
- Content 요청 폼 데이터 필드

```json
{
  "file": "<PDF binary>", // PDF 파일. 정보는 실제로 multipart/form-data로 전송
  "display_name": "급식센터 운영 매뉴얼 v1.0", // UI에 표시할 문서 이름 (PDF 파일 이름)
}
```

- 응답 예시

```json
{
  "manual_id": "doc_0001", // 서버에서 생성
  "chatbot_id": "bot_0001",
  "display_name": "급식센터 운영 매뉴얼 v1.0",
  "original_filename": "manual_v1.pdf",
  "status": "pending", // pending / indexing / ready / failed
  "created_at": "2025-11-18T00:00:00Z"
}
```

### 6-2. 문서 목록 조회

- 질의: `GET /api/set/manuals?chatbot_id={chatbot_id}`
- 목적: 해당 챗봇에 연결된 문서 목록 확인
- 응답 예시

```json
[
  {
    "manual_id": "doc_0001",
    "chatbot_id": "bot_0001",
    "display_name": "급식센터 운영 매뉴얼 v1.0", // 서버상에 띄울 PDF 이름 (수정 가능하도록)
    "original_filename": "manual_v1.pdf", // 실제 PDF 파일 이름
    "status": "ready", // pending / indexing / ready / failed
    "created_at": "2025-11-18T00:00:00Z"
  },
  {
    "manual_id": "doc_0002",
    "chatbot_id": "bot_0001",
    "display_name": "발주 프로세스 문서",
    "original_filename": "order_process.pdf",
    "status": "indexing",
    "created_at": "2025-11-19T00:00:00Z"
  }
]
```

### 6-3. 문서 삭제

- 질의: `DELETE /api/set/manuals/{manual_id}`
- 목적: 해당 문서를 삭제하고 생성된 청크/임베딩까지 전부 삭제하기 위함.
- 얘도 챗봇 삭제와 마찬가지로 DB에서 문서 모든 메타 삭제하고, 해당 문서가 생성한 청크나 임베딩 모두 싹 밀어야 함. 이 정책은 수정 가능…
- 응답 예시

```json
{
  "success": true
}
```

---

## 7. 통계 (/api/stats)

### 7-1. 전체 통계

- 질의: `GET /api/stats/overview`
- 목적: 전체 서비스 이용 현황을 개괄적으로 반환
- 응답 예시

```json
{
  "total_queries": 1234, // 전체 질의 수
  "unique_clients": 456, // 추정치 (session_id 기준 등)
  "by_chatbot": [
    { "chatbot_id": "bot_0001", "queries": 800 },
    { "chatbot_id": "bot_0002", "queries": 434 }
  ],
  "by_date": [
    { "date": "2025-11-15", "queries": 300 },
    { "date": "2025-11-16", "queries": 250 }
  ]
}
```

### 7-2. 챗봇별 통계

- 질의: `GET /api/stats/chatbot/{chatbot_id}`
- 목적: 특정 챗봇의 이용 통계
- 응답 예시

```json
{
  "chatbot_id": "bot_0001",
  "total_queries": 800,
  "unique_clients": 200,
  "by_date": [
    { "date": "2025-11-15", "queries": 150 },
    { "date": "2025-11-16", "queries": 120 }
  ]
}
```

### 7-3. 날짜별 통계

- 질의: `GET /api/stats/date/{date}`
- 목적: 특정 날짜의 전체 챗봇 이용 통계
- 응답 예시

```json
{
  "date": "2025-11-15",
  "total_queries": 300,
  "by_chatbot": [
    { "chatbot_id": "bot_0001", "queries": 150 },
    { "chatbot_id": "bot_0002", "queries": 120 }
  ]
}
```

---
# 💰 김수환 김덕기 📕

[프로젝트 구경 하러 가기](http://52.79.101.162:9000/)

## 💎 팀원 소개

<table>
  <th>
    <a href="https://github.com/suhwan2004">
      <p>김수환</p>
      <img src="https://github.com/suhwan2004.png" width="100px" />
    </a>
  </th>
  <th>
    <a href="https://github.com/deok2kim">
      <p>김덕기</p>
      <img src="https://github.com/deok2kim.png" width="100px" />
    </a>
  </th>
</table>

### 💎 구현 기능 목록

> 가계부

- 내역 (월별)조회 - (리스트 또는 달력으로 표현)
- 내역 (범위)조회 - 통계 (차트로 표현)
- 내역 쓰기, 수정

> 결제 수단

- 추가, 삭제

### 💎 구현하면서 어려웠던 점

- 좋은 코드까지 생각하며 구현하기 어려웠다.
- 옵저버 패턴에 대해서 학습하는데 난항을 겪었다.
- 컴포넌트를 나눈 단위가 적절한지 고민이 많이 되었다.

### 💎 성능 최적화에 대한 고민과 개선 방법

- 특히 불필요한 리렌더링과 컴포넌트가 불필요한 데이터를 가지고 있는 것
- 렌더링 시점을 좀 더 작은 단위로 명확하게 하기
- 스토어를 활용하기

### 💎 FAQ, 차후 개선할 점

- 아직도 남아있는 불필요한 렌더링 수정
- 옵저버 패턴의 리렌더링 로직이 약간 불완전함
- 웹팩 난독화로 인해서 기능이 망가지는 현상 개선( 코드를 잘 못 짠거 같다)

### 💎 아쉬운 점

- 그래프의 UX 적인 개선을 할 수 없었던 점
- 뷰와 함수 로직의 분리를 못한 점
- 백엔드에서 서비스 부분과 쿼리 부분을 분리하지 못한 점
- 스파게티 해체 작업 아직 부족함

## 💎 프로젝트 실행 방법

1. `git clone https://github.com/woowa-techcamp-2022/web-moneybook-6.git`
2. `terminal1`: `cd web-moneybook-6/backend && npm i && npm run test`
3. `termianl2`: `cd web-moneybook-6/frontend && npm i && npm run build`
4. [🚀 로컬 실행 주소로 이동](http://localhost:9000)

## 💎 도움을 주신 분들

모든 분들이 많은 도움을 주셨지만 그 중에서 가장 도움을 많이 주신 `7조` 분들에게 감사 인사를 드립니다.

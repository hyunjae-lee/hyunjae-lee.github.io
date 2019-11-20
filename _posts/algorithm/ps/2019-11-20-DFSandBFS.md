---
title:  "Problem Solving - 문제 풀이 팁 정리 (완전 탐색 - DFS & BFS)"
excerpt: "DFS/BFS/Graph/이분그래프"
header:
  teaser: /assets/img/algorithm/ps/ps_cover.png

categories:
  - Problem Solving
tags:
  - Problem Solving
  - Algorithm
  - DFS
  - BFS
  - 깊이 우선 탐색
  - 너비 우선 탐색
---

## 완전 탐색 (Graph & BFS)

### Graph (그래프)?

- 자료구조의 일종
- 정점 (Node, Vertex)
- 간선 (Edge) : 정점간의 관계
- 경로 : 정점 A 에서 B 로 가는 경로
- 중요한 것은, __최단 경로__ 

<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/ps/graph_path.jpg" width = "100%">
</center>

- 사이클 : 정점 A 에서 다시 A 로 돌아오는 경로

<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/ps/graph_cycle.jpg" width = "100%">
</center>

* 단순 경로 / 단순 사이클 
  * 경로/사이클에서 __같은 정점을 두 번 이상 방문하지 않는__ 경로/사이클
  * 보통 일반적으로 경로와 사이클은 단순 경로와 단순 사이클을 의미한다.

* 그래프의 방향성
  * A -> B 와 같이 간선에 방향이 있다 : Directed Graph
  * A - B 와 같이 간선에 방향이 없다 : Undirected Graph (Bidirection Graph)

* 그래프의 가중치
  * 간선에 가중치가 있는 경우
  * A -> B 의 가중치가 10이다 : 비용, 시간 등을 의미

* 그래프의 차수 
  * 정점과 연결되어 있는 간선의 개수

### 그래프를 어떻게 저장할까?

- 그래프에는 정점, 간선이 있다.
- 정점은 보통 개수만 저장하면 된다.
- 따라서 그래프를 저장한다는 것은 보통 간선을 저장하는 것을 의미한다.

<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/ps/matrix_list.jpg" width = "100%">
</center>

* 인접 행렬로 저장하기 (Adjacency-matrix)
  * 정점의 개수를 V 라고 했을 때, V * V 크기의 이차원 배열을 이용한다
  * A[i][j] = 1 (i->j 간선이 있을 때), 0 (없을 때)
  * 장점 [1] : (U -> V) 간선이 존재하는지 찾는데 O(1) 걸림.
  * 장점 [2] : U, V가 존재할 때, (V -> U) 간선이 존재하는지 찾는데 O(1) 걸림. 

* 인접 리스트로 저장하기 (Adjacency-list)
  * A[i] = i와 연결된 정점을 리스트로 포함하고 있음 
  * ex) A[2] = {1, 3, 5} 
  * ==> 2번 정점과 연결된 노드 : 1번, 3번, 5번
  * Linked-list와 같은 __동적 배열__ 이 필요하다. 
  * C++ : Vector, Java : ArrayList

* 공간복잡도 (V = 정점의 개수, E = 간선의 개수)
  * 인접 행렬 : O(V*V) (매우 크다..)
  * 인접 리스트 : O(E) 

* 시간복잡도
  * 'X'와 연결된 모든 간선 찾기
    * 인접 행렬 : O(V) (A[x][i] ~ A[x][v] 까지 모두 검사해야 하므로)
    * 인접 리스트 : O(차수) 
  * 대부분의 경우 `인접 리스트`를 사용한다.

* 완전 그래프
  * 정점이 서로 모두 연결되어 있는 그래프
  * E = V * (V - 1) / 2
  * 이 때는 `인접 행렬`이 유리하다.

---

## 그래프의 탐색

- 그래프 탐색의 목적 : __시작점 X 부터 시작하여 모든 정점을 1번씩 방문하는 것__ 
- DFS : 깊이 우선 탐색, Stack 사용, 주로 재귀함수 구현
- BFS : 너비 우선 탐색, Queue 사용
- 개념에 대한 이해는 아래의 영상을 보면 바로 이해될 것이다.

<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/ps/dfsbfs.gif" width = "100%">
</center>

### DFS 

- 인접 행렬과 인접 리스트를 이용하여 방문한 순서대로 출력하는 DFS 함수를 직접 구현해보자 
- dfs(x) : X 정점에 방문.

```cpp
// DFS , 인접 행렬을 이용한 구현
void dfs(int x){
  check[x] = true; // x에 방문함
  printf("%d ", x);

  // 인접 행렬이므로 다음 방문한 정점을 1부터 n까지 모두 검사해야 한다. => O(V)
  for(int i = 1; i <= n; i++){
    // x->i 간선이 존재한다 && i 정점을 아직 방문하지 않았다
    if(a[x][i] == 1 && check[i] == false){
      // 그럼 i 정점을 방문한다.
      dfs(i);
    }
  }
}
```

```cpp
// DFS , 인접 리스트을 이용한 구현
void dfs(int x){
  check[x] = true; // x에 방문함
  printf("%d ", x);

  // 
  for(int i = 0; i < a[x].size(); i++){
    int y = a[x][i];
    if(check[y] == false){
      dfs(y);
    }
  }
}
```

- 모든 정점을 __한 번씩__ 방문하기 때문에,
- 인접 행렬 / 인접 리스트를 이용한 DFS 시간복잡도는 다음과 같다.
- 인접 행렬 : dfs()함수 V 번 호출 * 함수 1개의 시간복잡도는 O(V) = __O(V^2)__
- 인접 리스트 : dfs()함수 V 번 호출 + 전체 호출되는 for문은 E번 = __O(V + E)__
- V = 정점의 개수, E = 간선의 개수
- 인접 리스트가 더 효율적이다.

---

### BFS

- 인접 행렬과 인접 리스트를 이용하여 방문한 순서대로 출력하는 BFS를 직접 구현해보자 

```cpp
// BFS , 인접 행렬을 이용한 구현, 시작점은 '1'이라고 가정.
queue<int> q;
check[1] = true;
q.push(1);

while(!q.empty()){
  int x = q.front();
  q.pop();

  printf("%d ", x);

  for(int i = 1; i <= n; i++){
    if(a[x][i] == 1 && check[i] == false){
      check[i] = true;
      q.push(i);
    }
  }
}
```

```cpp
// BFS , 인접 리스트를 이용한 구현, 시작점은 '1'이라고 가정.
queue<int> q;
check[1] = true;
q.push(1);

while(!q.empty()){
  int x = q.front();
  q.pop();

  printf("%d ", x);

  for(int i = 0; i < a[x].size(); i++){
    int y = a[x][i];
    
    if(check[y] = false){
      check[y] = true;
      q.push(y);
    }
  }
}
```

- 모든 정점을 __한 번씩__ 방문하기 때문에,
- 인접 행렬 / 인접 리스트를 이용한 BFS 시간복잡도는 다음과 같다.
- 인접 행렬 : 모든 정점 V 번 호출 (큐에 들어가고 나옴) * 큐 안의 시간복잡도 O(V) = __O(V^2)__
- 인접 리스트 : 모든 정점 V 번 호출 (큐에 들어가고 나옴) + (큐 안의 시간복잡도)전체 호출되는 for문은 E번 = __O(V + E)__

___

- 그래프의 탐색에서 이 두 알고리즘은 매우 __중요__ 하다!
- 우선 **취업을 준비하는 입장**이라면 삼성 SW 역량테스트, 카카오 코딩테스트 등 대부분의 기업들에서 SW 직군을 뽑기 위해 코딩테스트를 실시하는데 
- 이 때 나오는 문제들의 유형 중에 __그래프 탐색__이 있다. 물론, 시험장에서는 친절하게 어떤 알고리즘을 써야하는 지 유형을 알려주지는 않는다.
- 따라서, 내가 생각하는 알고리즘 공부법은 (최소 취업을 위한 코딩 테스트를 통과하는 기준으로) __어떤 문제를 접했을 때, 이 문제를 DFS 혹은 BFS 로 풀 수 있는가?__ 를 판단할 수 있는 분석력을 갖추는 것이 우선이라 생각한다.
- 그래서 아래 예제 문제들에서 __어떻게 DFS/BFS 문제라고 판단을 하였고 풀이 계획을 어떻게 세웠는지__ 에 대한 아이디어와 함께 코드를 공유한다.

---

## 예제 문제
- 아래에 DFS/BFS 문제와 풀이들이 있다.
  * [연결 요소](https://hyunjae-lee.github.io/boj/11724sol/){: target="_blank" } (난이도 : 하)
  * [이분 그래프](https://hyunjae-lee.github.io/boj/1707sol/){: target="_blank" } (난이도 : __중__)
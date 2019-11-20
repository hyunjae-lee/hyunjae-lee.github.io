---
title:  "Problem Solving - 문제 풀이 팁 정리 (완전 탐색 - Graph & BFS)"
excerpt: "DFS/BFS/Flood Fill/Deque"
header:
  teaser: /assets/img/algorithm/ps/ps_cover.png

categories:
  - Problem Solving
tags:
  - Problem Solving
  - Algorithm
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
  * 이 때는 `인접 행렬`이 유맇다ㅏ


---


---

## 예제 문제
- 아래에 완전탐색 문제와 풀이들이 있다.
  * [문제 제목](https://hyunjae-lee.github.io/boj/2309sol/){: target="_blank" } (난이도 : 하)
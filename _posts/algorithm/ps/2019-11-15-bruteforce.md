---
title:  "Problem Solving - 문제 풀이 팁 정리 (완전 탐색 - Brute Force)"
excerpt: "For문/순열/재귀호출/비트마스크"
header:
  teaser: /assets/img/algorithm/ps/ps_cover.png

categories:
  - Problem Solving
tags:
  - Problem Solving
  - Algorithm
---

## 완전 탐색 (Brute Force)

### 1. 문제의 가능한 경우의 수를 계산해본다.

- 직접 계산을 통해서 구한다. 대부분 손으로 계산해볼 수 있다.

### 2. 가능한 모든 방법을 다 만들어본다.

- 하나도 빠짐없이 만들어야 한다.
- 대표적으로 For문, 순열 사용, 재귀호출 사용, 비트마스크 사용이 있다.
  
### 3. 각각의 방법을 이용해 답을 구해본다.
- 문제의 조건에 맞게 답을 계산하는 단계.
  
---

## 순열

- 1 ~ N 까지로 이루어진 수열 => 크기는 항상 N 이고, 겹치는 숫자가 존재하지 않음.
- 즉, 1 ~ N 까지 한 번씩 등장한 (순서가 있는) 조합.
- ex) N = 3 일때,
- 123, 132, 213, 231, 312, 321
- 총 `N!`개의 경우의 수

- 첫번째 순열인 `123`은 오름차순, 마지막 순열인 `321`은 내림차순임을 알 수 있다.
- 순열을 사전순으로 나열했을 때, 사전순으로 다음에 오는 순열과 이전에 오는 순열을 찾는 방법은?
- `C++`의 경우 __STL - Algorithm__ 에 존재하는 **next_permutation** 과 **prev_permutation**을 활용하자.
- `JAva`의 경우는 직접 구현해야 하고, `Python`의 경우 __itertools__ 가 있지만, 모든 문제를 풀기에는 다소 부족하다.

### 다음 순열 구하기.

#### (다소 이론적인 내용이니, 실제 순열을 만들어 활용하는 코드 예시를 확인하려면 이 부분은 건너뛰어도 좋다)

- 1 ~ 7 까지의 순열을 구해보려 할 때, __1234567__ 부터 __7654321__ 까지 총 7!개가 존재한다.
- 그러면 그 중간의 수열들은 어떻게 구해야 하고, 얼마의 시간이 걸릴까?
- 사전순으로 (숫자의 경우, 오름차순) 수열을 만든다고 할 때, 아래와 같은 과정을 거친다.

<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/ps/bruteforce1.jpg" width = "100%">
</center>
<br>

- 다음 순열을 구하는 코드를 참고해보자.
- 위의 예시에서 `3`과 `4`가 바뀌었다. 여기서 `3`이 i-1의 인덱스를, `4`이  i의 인덱스를 가진다.
- i와 j의 인덱스를 찾고 나면, __swap(a[i-1], a[j])__ 를 통해 교환하고,
- 다시 재정렬시켜준다.

```cpp
  // 시간복잡도 : O(N)
  bool next_permutation(int *a, int n){
    int i = n - 1;
    
    while(i > 0 && a[i-1] >= a[i]) i -= 1;
    // 이전 순열일 경우,
    // while(i > 0 && a[i-1] <= a[i]) i -= 1;

    if(i <= 0) return false; // 마지막 순열
    
    int j = n - 1;
    while(a[j] <= a[i-1]) j -= 1; 
    // 이전 순열일 경우,
    // while(a[j] >= a[i-1]) j -= 1;
    swap(a[i-1], a[j]);
    j = n - 1;
    while(i < j){
      swap(a[i], a[j]);
      i += 1;
      j -= 1;
    }
    return true;
  }
```

---

### 모든 순열 구하기

- C++ STL 을 이용하여 아주 간단하게 모든 순열을 구해보자!
  
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main(){
  int n;
  cin >> n;
  vector<int> a(n);
  
  for(int i = 0; i < n; i++){
    a[i] = i + 1; // 1 ~ N 까지 첫번째 순열 값 삽입.
  }

  /* 모든 순열을 출력하는 코드 */
  do{
      for(int i = 0; i < n; i++){
        cout << a[i] << ' ';
      }
      cout << '\n';
  } while(next_permutation(a.begin(), a.end()));

  return 0;
}
```

- 다시 한 번 정확히 __모든 순열을 구하는 문제__ 의 시간복잡도를 알아보자.
- 1 ~ N 까지의 모든 순열을 구한다고 하면,
  - 순서의 모든 경우의 수 = N! 개
  - 하나의 순열을 구하는 시간 = O(N)
  - 따라서, O(N) * N! = O(N * N!)이다.

- 그렇다면, 보통의 문제들에서 위와 같은 과정을 거쳐 모든 순열을 구해 문제를 푼다고 했을 때
- N의 제한은 몇일까?
  - 10! = 3,628,800 이므로, O(N * N!) = 대략 4천만.
  - 11! = 39,916,800 이므로 O(N * N!) = 대략 4억.
  - 대부분의 문제는 1초 내에 해결해야 하고, 1억가지의 경우의 수가 보통 허용되므로 
  - __N이 최대 10일때까지만 위와 같은 방법으로 풀 수 있다.__

---

## 재귀 함수 사용하기 

- 재귀함수를 처음 다룬다면, [재귀함수 기초 다지기](https://hyunjae-lee.github.io/posts/#recursive){: target="_blank" } 를 통해 재귀함수의 기초를 학습하자

- [1, 2, 3 더하기](https://www.acmicpc.net/problem/9095){: target="_blank" } 문제를 통해 재귀함수에 대해 알아보자.
- 문제설명 : N (<= 10) 을 1,2,3의 합으로 나타내는 방법의 수를 구하는 것 
  
- 간단한 재귀함수 설계 : go (count, sum, goal) : 숫자 count 개로 합 sum을 만드는 경우의 수를 리턴하는 함수
- 고려해야 할 사항 1. 불가능한 경우? sum > goal (이 때 goal 은 N 이다.)
- 고려해야 할 사항 2. 정답인 경우? sum = goal
- 고려해야 할 사항 3. 다음 경우를 호출? 
  * 1을 선택한 경우, go (count + 1, sum + 1, goal)
  * 2를 선택한 경우, go (count + 1, sum + 2, goal)
  * 3을 선택한 경우, go (count + 1, sum + 3, goal)

```cpp
// 시간복잡도 : O(3^N)
int go(int count, int sum, int goal){
  if (sum > goal) return 0;
  if (sum == goal) return 1;

  int now = 0;
  for(int i = 1; i <= 3; i++){
      now += go (count + 1, sum + i, goal);
  }

  return now;
}
```

---

## 비트마스크 이용하기

우선 기본적인 비트 연산에 대해 복습해보자
<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/ps/bitmask1.jpg" width = "100%">
</center>
<br>
<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/ps/bitmask2.jpg" width = "100%">
</center>
<br>

* 추가로 unsigned, signed 자료형에 따라 보여지는 값이 다르다!

- 중요한 연산 중 하나가 Shift 연산이다.
- A << B 는 A 를 B 만큼의 비트를 왼쪽으로 이동시킨다.
- A >> B 는 A 를 B 만큼의 비트를 오른쪽으로 이동시킨다.

- A << B 는 A * 2^B, A >> B 는 A / 2^B 와 같다.
- (A + B) / 2 = (A + B) >> 1 로 쓸 수 있다.

- 비트마스크로 무엇을 할 수 있는가?
  - 정수로 집합을 나타낼 수 있다.
  - {1, 3, 4, 5, 9} = 570 = 2^1 + 2^3 + 2^4 + 2^5 + 2^9
  - 굳이 비트마스크를 쓰는 이유는? __공간적인 이유__ + 정수 하나로 배열을 대체할 수 있기 때문에

<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/ps/bitmask3.jpg" width = "100%">
</center>

- 추가 연산들
  - (1 << N) - 1 = 전체 집합
  - 0 = 공집합

- 현재 집합이 S 라고 할 때,
  - <p>i를 추가 : S | (1 << i)</p>
  - <p>i를 검사 : S & (1 << i)</p>
  - <p>i를 제거 : S & ~(1 << i)</p>
  - <p>i를 토글 (0을 1로, 1을 0으로) : S ^ (1 << i)</p>
  
* 비트연산 우선순위
  * 1 << N - 1은 (1 << N) - 1 ? 1 << (N - 1)?
    * 정답은 1 << (N - 1)

---

## 예제 문제
- 아래에 완전탐색 문제와 풀이들이 있다.
  * [일곱 난쟁이](https://hyunjae-lee.github.io/boj/2309sol/){: target="_blank" } (난이도 : 하)
  * [날짜 계산](https://hyunjae-lee.github.io/boj/1476sol/){: target="_blank" } (난이도 : 하)
  * [테트로미노](https://hyunjae-lee.github.io/boj/14500sol/){: target="_blank" } (난이도 : __중__)
  * [모든 순열](https://hyunjae-lee.github.io/boj/10974sol/){: target="_blank" } (난이도 : 하)
  * [차이를 최대로](https://hyunjae-lee.github.io/boj/10819sol/){: target="_blank" } (난이도 : 하)
  * [외판원 순회2](https://hyunjae-lee.github.io/boj/10971sol/){: target="_blank" } (난이도 : 하)
  * [로또](https://hyunjae-lee.github.io/boj/6603sol/){: target="_blank" } (난이도 : 하)
  * [연산자 우선순위](https://hyunjae-lee.github.io/boj/14888sol/){: target="_blank" } (난이도 : 하)
  * [암호 만들기](https://hyunjae-lee.github.io/boj/1759sol/){: target="_blank" } (난이도 : __중__)
  * [부분집합의 합](https://hyunjae-lee.github.io/boj/1182sol/){: target="_blank" } (난이도 : 하)
  * [퇴사](https://hyunjae-lee.github.io/boj/14501sol/){: target="_blank" } (난이도 : __중__)
  * [연산자 우선순위 (2)](https://hyunjae-lee.github.io/boj/15658sol/){: target="_blank" } (난이도 : 하)

## 예제 문제 ( N과 M 시리즈 )
- N과 M 시리즈 (순열)
  * [N 과 M](https://hyunjae-lee.github.io/boj/15649sol/){: target="_blank" } (난이도 : 하)
  * [N 과 M (2)](https://hyunjae-lee.github.io/boj/15650sol/){: target="_blank" } (난이도 : 하)
  * [N 과 M (3)](https://hyunjae-lee.github.io/boj/15651sol/){: target="_blank" } (난이도 : 하)
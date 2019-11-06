---
title:  "Programmers - 순열 검사 풀이"
excerpt: "Problem solving"
<!-- header:
  teaser: /assets/img/algorithm/recursive/recursive_cover.png -->

categories:
  - Algorithm
tags:
  - Algorithm
  - Programmers
---
<br><br>

> <subtitle> 순열 검사 </subtitle>
<p> 아주 간단한 문제이지만, C++ STL 에서 Vector 내의 중복된 원소 제거 및 정렬을 복습 및 정리할 겸 포스팅한다. 간단하게 unique, erase, sort 정도만 알아두면 복잡한 문제가 아주 간단하게 풀릴때도 있다.</p>

```cpp
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

bool solution(vector<int> arr)
{
    bool answer = true;
    int len = arr.size();

    // arr 배열 내의 중복된 원소를 제거한다.
    arr.erase(unique(arr.begin(), arr.end()), arr.end());
    // 중복된 원소가 제거된 arr 배열을 오름차순으로 정렬한다.
    sort(arr.begin(), arr.end());

    // 전체 배열을 다 살펴볼 필요없이, 정렬된 arr의 마지막 원소가 그 배열의 길이값과 같지 않으면 오답이다.
    if(arr.back() != len){
        answer = false;
    }
    
    return answer;
}
```
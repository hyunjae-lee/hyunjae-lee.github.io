---
title:  "Interview Ready - How Many ways to decode this message?"
excerpt: "Described in English"
header:
  teaser: /assets/img/algorithm/ps/ps_cover.png

categories:
  - Interview Ready
tags:
  - Problem Solving
  - Dynamic Programming
  - Algorithm
  - Interview Ready
  - English
---

## Interview Ready - How Many ways to decode this message?

### 1. How Many ways to decode this message?

<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/interview/interview-1.jpg" width = "100%">
</center>


### 2. Implement the Idea

```python
def helper_dp(data, k, memo): # k : we look at only last 'k' letters in 'data' string
    
    # num_ways("")
    if k == 0 :
        return 1
    
    start = data.length - k
    # num_ways("011")
    if data[start] == 0 :
        return 0

    # check if we have the value in our memo
    if memo[k] != null :
        return memo[k]

    '''
    helper("12345", k) = helper("12345", k-1) + helper("12345", k-2)
    helper("27345", k) = helper("27345", k-1) 
    '''
    result = helper_dp(data, k - 1, memo)
    if k >= 2 and int(data[start:start+2]) <= 26 :
        result += helper_dp(data, k - 2, memo)
    memo[k] = result
    return result

def num_ways_dp(data):
    memo = new int[data.length+1] # initialize to null's
    return helper_dp(data, data.length, memo)
```

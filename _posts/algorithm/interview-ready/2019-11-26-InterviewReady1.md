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
  - Leetcode
---

## Interview Ready - How Many ways to decode this message?

### 1. How Many ways to decode this message?

* [Problem URL](https://leetcode.com/problems/decode-ways/){: target="_blank" }

<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/interview/interview-1.jpg" width = "100%">
</center>


### 2. Implement the Idea as a pseudocode

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

### 3. Solution

```cpp
class Solution {
public:
    int decode(string& s, int N, int* memo)
        {
            if (N == 0) {
                return 1;
            }

            int start = s.size() - N;

            if(s[start] == '0'){
                return 0;
            }

            if (memo[N] > 0) {
                return memo[N];
            }

            int result = decode(s, N-1, memo);
            
            if(N >= 2 && (s[start]-'0' == 1 || (s[start]-'0' == 2 && s[start+1]-'0' <= 6))){
                result += decode(s, N-2, memo);
            }
            
            memo[N] = result;
            return memo[N];
        }

        int numDecodings(string s) {
            if (s.size() == 0) {
                return 0;
            }

            // Memoization
            int memo[s.size()+1];

            // Initialize to -1's
            for (int i = 0; i <= s.size(); i++) {
                memo[i] = -1;
            }

            return decode(s, s.size(), memo);
        }
};

```

<center>
<img src = "https://hyunjae-lee.github.io/assets/img/algorithm/interview/interview-1-sol.png" width = "100%">
</center>

---
title: "HighlightU"
excerpt: "- a web service automatically extracting highlights from Twitch videos "
header:
  image: /assets/img/portfolio/highlightu/highlightu-main.png
  teaser: assets/img/portfolio/highlightu/highlightu-serviceflow.jpg
sidebar:
  - title: "Role"
    image: /assets/img/profile.jpg
    image_alt: "logo"
    text: "System Designer, Back-End Developer"
  - title: "Responsibilities"
    text: "Implementing an effective algorithm that takes interesting parts of Twitch videos using Natural Language Processing and Face expression analysis."
  - title: "Project Duration"
    text: "4 months, Mar 2019 - Jun 2019"
  - title: "Development Keywords"
    text: "Python, Django, Algorithm, Natural Language Processing, Face Recognition, Deep Learning"
gallery:
  - url: /assets/img/portfolio/highlightu/highlightu-serviceflow.jpg
    image_path: assets/img/portfolio/highlightu/highlightu-serviceflow.jpg
    alt: "placeholder image 1"
  - url: /assets/img/portfolio/highlightu/highlightu-devops.jpg
    image_path: assets/img/portfolio/highlightu/highlightu-devops.jpg
    alt: "placeholder image 2"
  - url: /assets/img/portfolio/highlightu/highlightu-techstack.jpg
    image_path: assets/img/portfolio/highlightu/highlightu-techstack.jpg
    alt: "placeholder image 3"
---

> Project Overview.

This is __a web development project with Django__ which helps Twitch streamers get __highlight videos__ just by uploading their broadcasting videos. Basically, this website allows users to login by __Google OAuth.__ The way we consider to get __common highlight parts from all video__ is that we score every second of the original video based on two major facts; __Chatlog Analysis and Face expression Anaylsis__. 

The first one, **Chatlog of Twitch** is a way to communicate between the streammer and the people watching, which is reasonable and generally acceptable to evaluate __how much the streamer and the people do communicate each other__. 

The second one, **Face expression Anaylsis** is the fact that also makes sense to be evaluted how interesting the moment of the video is. For example, If smiling or angry face expression is detected at a certain moment, That means __The streamer feels more intersting!__ and this fact has higher percentage to be selected as __a highlight of the video__ than other normal moments. 

If you would like to know [more detail about this project](https://github.com/highlightu/documentation/blob/master/Documents/final_report.pdf){: target="_blank" }, you can check our report that describes all detail. 

Here is the [repository](https://github.com/highlightu/server){: target="_blank" } storing codes and descriptions for this project.


{% include gallery caption="This is a gallary to go along with this case project." %}

> Project Features.

- Chatlog Anaysis : TF-IDF model built by NLTK for English, KoNLPy for Korean. 
- Face expression Anaylsis : Self-trained Resnet model to get 5 different face expression percentage of each given image.
- Google OAuth : Social login for easy accessibility.
- Payment by Toss : Easy-to-use and trustful third-party payment system.
- Safe and secured website : Implemented as a HTTPS website.

> Team.
  
[Team name : LAJI](https://hyunjae-lee.github.io/assets/img/portfolio/highlightu/highlightu-team.jpeg){: target="_blank" }
- [Hyunjae Lee](https://github.com/hyunjae-lee){: target="_blank" }
- [Jisu An](https://github.com/ajs7270){: target="_blank" }
- [Zinu Zeon](https://github.com/zinuzian){: target="_blank" }

> Awards.

- [Excellence prize at 2019 DaVinci SW TECH-FAIR](https://hyunjae-lee.github.io/assets/img/portfolio/highlightu/award1.jpeg){: target="_blank" }
  - Held by Chung-Ang University 
  - With $900 reward on Nov 22 2019
- The bronze prize at SW challenge competition
  - Held by Korean Software Industry Association
  - With $1000 reward on Dec 19 2019

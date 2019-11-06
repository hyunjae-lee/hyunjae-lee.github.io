---
title:  "(1) MongoDB Basics"
excerpt: "MongoDB, NoSQL"
header:
  teaser: /assets/img/mongodb/mongodb_cover.png

categories:
  - Database
tags:
  - Database
  - NoSQL
  - MongoDB
---
<br><br>

> <subtitle> 1. MongoDB (Nosql) Basics </subtitle>
<p> M001 : MongoDB Basics
:: Posts that are going to be uploaded for MongoDB are based on the materials and lectures given by <strong>MongoDB University</strong>. </p>

<p><strong>MongoDB eliminates a number of technical challenges that slow the pace of application development.</strong></p>
<p>
<li> <strong>MongoDB Compass</strong> is a visual interface to MongoDB. It allows us to configure a database and explore the data it contains. (Talk about the import design features such as support for flexible schema and the range of benefits that it provides to application developers.</li>
<li> <strong>MongoDB Query Language</strong>, to give you plenty of preparation as you begin to think about building your own MongoDB applications. </li>
<li> <strong>MongoDB Atlas</strong> is MongoDB’s database as a service offering.
</p>
<center>
<img src = "https://hyunjae-lee.github.io/assets/img/mongodb/mongodb1.png" width = "80%">
</center>
<p>In MongoDB, a <strong>database</strong> serves as a namespace for <strong>collections</strong>. <strong>collections</strong> store indivisual records called <strong>documents</strong>. </p>

<p>This hierarchy allows us to group together records of similar items within collections, and group collections required for the same application within the same database.
We can also establish security policies that authorize users with different roles and different levels of access at the database, or collection, level. </p>
<p>
Each database and collection combination define a namespace.
We typically reference a specific collection by expressing the name of the database, followed by a dot, followed by the name of the collection.</p>

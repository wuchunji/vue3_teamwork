const express = require('express')
const {db} = require('./db')

const app = express()

// 发送get请求
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// -----------业务逻辑--------------

// 判断用户信息是否已经存在
// app.get('/user/getUserSave', async (req, resp) => {
//   const sql = 'select * from userTable where userid = ?';
//   const information = await db(sql, req.query.userid);
//   console.log(information)
// })

// 查看用户数据
app.get('/getAllUser', (res, resp) => {
  const sql = 'select * from userTable';
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 登录时查看用户输入用户名的用户数据
app.get('/getUser', (res, resp) => {
  const sql = `select * from userTable where userid = ${res.query.id}`;
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 注册添加用户数据
app.get('/addUser', (res, resp) => {
  const sql = 'insert into userTable set ?';
  const sqlParams = res.query;
  db(sql, sqlParams).then(res => {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.send(res);
  })
})

// 根据用户id查看参与的公文数据
app.get('/getUserPaperids', (res, resp) => {
  const sql = `select paperids from userTable where userid = ${res.query.id}`;
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 根据公文id获取公文全部信息
app.get('/getPaper', (res, resp) => {
  const sql = `select * from paperTable where paperid = ${res.query.id}`;
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 查找公文的所有id信息
app.get('/getPaperAllId', (res, resp) => {
  const sql = `select paperid from paperTable`;
  db(sql).then(res => {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.send(res);
  })
})

// 新建公文内容
app.get('/addPaper', (res, resp) => {
  const sql = 'insert into paperTable set ?';
  const sqlParams = res.query;
  db(sql, sqlParams).then(res => {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.send(res);
  })
})

// 更改用户参与的公文信息
app.get('/updateUserPaperids', (res, resp) => {
  const sql = 'update userTable set paperids = ? where userid = ?'
  const sqlParams = [res.query.paperids, res.query.userid];
  db(sql, sqlParams).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 根据公文id获取公文成员信息
app.get('/getPaperMembers', (res, resp) => {
  const sql = `select members from paperTable where paperid = ${res.query.id}`;
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 根据userId获取userName
app.get('/getUsername', (res, resp) => {
  const sql = `select username from userTable where userid = ${res.query.id}`;
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 新增公文成员
app.get('/updatePaperMember', (res, resp) => {
  const sql = 'update paperTable set members = ? where paperid = ?'
  const sqlParams = [res.query.members, res.query.paperid];
  db(sql, sqlParams).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 根据公文id获取公文里程碑信息
app.get('/getPaperMilepost', (res, resp) => {
  const sql = `select milepost from paperTable where paperid = ${res.query.id}`;
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 新增里程碑
app.get('/updatePaperMilepost', (res, resp) => {
  const sql = 'update paperTable set milepost = ? where paperid = ?'
  const sqlParams = [res.query.milepost, res.query.paperid];
  db(sql, sqlParams).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 根据公文id获取公文历史信息
app.get('/getPaperHistroy', (res, resp) => {
  const sql = `select histroy from paperTable where paperid = ${res.query.id}`;
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 根据公文id更新公文历史信息
app.get('/updatePaperHistroy', (res, resp) => {
  const sql = 'update paperTable set histroy = ? where paperid = ?'
  const sqlParams = [res.query.histroy, res.query.paperid];
  db(sql, sqlParams).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 根据历史版本id获取历史版本信息
app.get('/getHistroy', (res, resp) => {
  const sql = `select * from histroyTable where id = ${res.query.id}`;
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 添加历史版本
app.get('/addHistroy', (res, resp) => {
  const sql = 'insert into histroyTable set ?';
  const sqlParams = res.query;
  db(sql, sqlParams).then(res => {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.send(res);
  })
})

// 根据公文id获取公文内容
app.get('/getPaperContainer', (res, resp) => {
  const sql = `select container from paperTable where paperid = ${res.query.id}`;
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 修改公文内容
app.post('/updatePaperContainer', (res, resp) => {
  const sql = 'update paperTable set container = ? where paperid = ?'
  const sqlParams = [res.query.container, res.query.id];
  db(sql, sqlParams).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 根据公文id获取公文关键词
app.get('/getKeyword', (res, resp) => {
  const sql = `select keywords from PaperTable where paperid = ${res.query.id}`;
  db(sql).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 新增关键词
app.get('/updatePaperKeyword', (res, resp) => {
  const sql = 'update paperTable set keywords = ? where paperid = ?'
  const sqlParams = [res.query.keywords, res.query.paperid];
  db(sql, sqlParams).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 根据公文id修改公文字数
app.get('/updatePaperWords', (res, resp) => {
  const sql = 'update paperTable set words = ? where paperid = ?'
  const sqlParams = [res.query.words, res.query.paperid];
  db(sql, sqlParams).then(res => {
      resp.setHeader("Access-Control-Allow-Origin", "*");
      resp.send(res);
  })
})

// 监听8080端口
app.listen(8080, ()=>{
  console.log('8080 server is start')
})
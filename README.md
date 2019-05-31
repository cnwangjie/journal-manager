 对征订清单操作：

 - GET /subscription 查看所有征订
 - PUT /subscription 修改征订信息
 - PUT /subscription/:id/stock 加入库存
 - DELETE /subscription/:id 删除征订信息

对期刊信息操作：

 - GET /journal 获取所有期刊信息
 - PUT /journal 新增期刊或修改期刊信息
 - DELETE /journal/:id

对库存清单操作：

 - GET /inventory 查询库存
 - DELETE /inventory/:id 删除一个库存
 - PUT /inventory/:id/borrow 借阅
 - PUT /inventory/:id/return 归还

对论文信息操作：

 - PUT /paper 新增或修改一个期刊的论文
 - GET /paper 获取论文
 - DELETE /paper/:id 删除一个论文

对关键字操作：

 - GET /keyword 获取所有关键字

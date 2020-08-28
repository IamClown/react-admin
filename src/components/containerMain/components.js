// 项目工程化
const routerList = []
// 建立上下文关系
const files = require.context('../../views', true, /\.jsx$/);
// 循环文件
files.keys().map(item => {
  // 过滤
  if (item.includes('./index/') || item.includes('./login')) return false
  // 分割字符串
  const pathName = item.split('.')[1].toLowerCase()
  // 获取组件
  const components = files(item).default
  // 写入对象
  const routerObj = {
    path: `/index${pathName}`,
    component: components
  }
  return routerList.push(routerObj)
})

export default routerList

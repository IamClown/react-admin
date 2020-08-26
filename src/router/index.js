const router = [
  {
    title: '控制台',
    path: '/index',
    icon: 'index'
  },
  {
    title: '用户管理',
    path: '/index/user',
    icon: 'laptop',
    children: [
      {
        title: '用户列表',
        path: '/index/user/list',
        icon: ''
      }, {
        title: '添加用户',
        path: '/index/user/add',
        icon: ''
      }
    ]
  }, {
    title: '部门管理',
    path: '/home/navigation',
    icon: 'bars',
    children: [
      {
        title: '部门列表',
        path: '/home/navigation/dropdown',
        icon: ''
      }, {
        title: '添加部门',
        path: '/home/navigation/menu',
        icon: ''
      }
    ]
  },{
    title: '职位管理',
    path: '/home/entry',
    icon: 'edit',
    children: [
      {
        title: '职位列表',
        path: '/home/entry/form/basic-form',
        icon: ''
      }, {
        title: '添加职位',
        path: '/home/entry/form/step-form',
        icon: ''
      }
    ]
  },
  {
    title: '请假',
    path: '/home/about',
    icon: 'info-circle-o'
  },{
    title: '加班',
    path: '/info-circle-o',
    icon: '/home/about'
  }
]
export default router

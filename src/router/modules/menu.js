import Layout from '@/layout'
import { menuTree } from '@/api/menu'

const menuRouter = [{
  path: '/sys',
  component: Layout,
  redirect: 'noRedirect',
  name: '系统管理',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: '用户管理',
      meta: { title: '用户管理' }
    }

  ]
}
]

export default menuRouter

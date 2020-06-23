import Layout from '@/layout'
import { menuTree } from '@/api/menu'

function convert(menus) {
  const convertedMenus = []
  for (const menu of menus) {
    const convertedMenu = {
      path: menu.id.url,
      component: () => import('@/views' + menu.id.url),
      name: menu.id.name,
      meta: {
        title: menu.id.name,
        icon: menu.id.icon
      }
    }
    if (menu.children && menu.children.length > 0) {
      convertedMenu.children = convert(menu.children)
    }
    convertedMenus.push(convertedMenu)
  }
  return convertedMenus
}

export default async function getMenuTree() {
  const res = await menuTree()
  const tree = res.data
  const menuRouter = []
  for (const menu of tree) {
    const menuRouterElement = {
      path: menu.id.url,
      component: Layout,
      redirect: 'noRedirect',
      name: menu.id.name,
      alwaysShow: true,
      meta: {
        title: menu.id.name,
        icon: menu.id.icon
      },
      children: convert(menu.children)
    }
    menuRouter.push(menuRouterElement)
  }
  console.log(menuRouter)
  return menuRouter
}


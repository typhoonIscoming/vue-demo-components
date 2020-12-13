import types from './dictionary';

export const menuItemAuthority = (menuItem, dashBoradComponents) => {
    const { authority = [], componentName } = menuItem
    if (authority.length) {
        if (authority.includes(types.once)) { // 如果当前组件定义了只能使用一次的权限
            const num = dashBoradComponents.filter(item => item.componentName === componentName);
            return { authType: types.once, authResult: !num.length }
        }
    }
    return { authResult: true }
}

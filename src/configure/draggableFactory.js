import { generateUUID } from '@/utils/getUUId'
import { componentAttribute } from './componentsAttribute'

export const componentFactory = (item) => {
    const { componentName } = item;
    const uuid = generateUUID();
    const attr = componentAttribute[componentName] || {}
    return { ...item, id: uuid, ...attr }
}

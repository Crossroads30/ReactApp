export const updateObjectInArray = (items: any, itemId: any, objectPropName: any, newObjProps: any) => {
	return items.map((item: any) => {
		if (item[objectPropName] === itemId) {
			//обращаемся к свойству не через точку, а через квадратные скобки[]
			return { ...item, ...newObjProps }
		}
		return item
	})
}

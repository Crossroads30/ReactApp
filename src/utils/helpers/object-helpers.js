export const updateObjectInArray = (
	items,
	itemId,
	objectPropName,
	newObjProps
) => {
	return items.map(item => {
		if (item[objectPropName] === itemId) {
			//обращаемся к свойству не через точку, а через квадратные скобки[]
			return { ...item, ...newObjProps }
		}
		return item
	})
}

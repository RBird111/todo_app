export const formatDate = (date: Date) => {
	const dStr = new Date(date).toISOString();

	// [[%Y], [%M], [%D]]
	const dArr: string[] = dStr.split('T')[0].split('-');

	// "%M/%D/%Y"
	return [dArr[1], dArr[2], dArr[0]].join('/');
};

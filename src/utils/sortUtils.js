export const sortEmployees = (list = [], sortBy, direction) => {
	const sortedList = [...list];
	const dir = direction === 'asc' ? 1 : -1;

	return sortedList.sort((a, b) => {
		if (sortBy === 'name') return a.name.localeCompare(b.name) * dir;
		if (sortBy === 'birthday') {
			const dateA = a.birthday ? parseDate(a.birthday) : new Date(0);
			const dateB = b.birthday ? parseDate(b.birthday) : new Date(0);
			return (dateA - dateB) * dir;
		}
		return 0;
	});
}

export const parseDate = (dateString) => {
	const [day, month, year] = dateString.split('.');
	return new Date(`${year}-${month}-${day}`)
}

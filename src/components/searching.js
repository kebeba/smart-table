export function initSearching(searchField) {
    return (query, state, action) => {
        return state[searchField] ? Object.assign({}, query, {      // проверяем, что в поле поиска было что-то введено
            search: state[searchField]                              // устанавливаем в запросе параметр поиска
        }) : query;                                                 // если поле с поиском пустое, возвращаем запрос без изменений
    } 
}
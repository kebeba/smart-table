import {sortMap} from "../lib/sort.js";


export function initSorting(columns) {
    return (query, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            // Запомнить выбранный режим сортировки
            action.dataset.value = sortMap[action.dataset.value];
            field = action.dataset.field;
            order = action.dataset.value;

            // Сброс сортировки для остальных колонок
            columns.forEach(column => {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none';
                }
            }); 
        } else {
            // Получение выбранного режима сортировки
            columns.forEach(column => {
                if (column.dataset.value !== 'none') {
                    field = column.dataset.field;
                    order = column.dataset.value;
                }
            });
        }

        // сохраним в переменную параметр сортировки в виде field:direction
        const sort = (field && order !== 'none') ? `${field}:${order}` : null;

        // добавляем параметры сортировки к запросу, если есть
        return sort ? Object.assign({}, query, { sort }) : query;
    }
}
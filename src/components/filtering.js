export function initFiltering(elements) {
    // заполнение выпадающих списков опциями
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // обработка очистки поля
        if (action && action.name == 'clear') {
            const inputElement = action.parentElement.querySelector('input');
            inputElement.value = '';
            state[action.dataset.field] = '';
        }

        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                // поля ввода в фильтре с непустыми данными
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    // формирование вложенного объекта фильтра
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        })
        // если в фильтре что-то добавилось, применим к запросу
        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }
    
    return {
        updateIndexes,
        applyFiltering,
    }
}

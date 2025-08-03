import {getPages} from "../lib/utils.js";


export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    // подготовить шаблон кнопки для страницы и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    let pageCount;
    
    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;

        // обработка действия в секции пагинации
        if (action) switch(action.name) {
            case 'prev': page = Math.max(1, page - 1); break;
            case 'next': page = Math.min(pageCount, page + 1); break;
            case 'first': page = 1; break;
            case 'last': page = pageCount; break;
        }

        // добавим параметры к запросу без изменения остальных параметров
        return Object.assign({}, query, {
            limit,
            page,
        });
    }

    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit);

        // отображение списка видимых страниц
        const visiblePages = getPages(page, pageCount, 5);
        pages.replaceChildren(...visiblePages.map(pageNumber => {
            const el = pageTemplate.cloneNode(true);
            return createPage(el, pageNumber, pageNumber === page);
        }));

        // обновление статуса пагинации
        fromRow.textContent = (page - 1) * limit + 1;
        toRow.textContent = Math.min((page * limit), total);
        totalRows.textContent = total;
    }

    return {
        updatePagination,
        applyPagination,
    };
}

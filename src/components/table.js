import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    before.reverse().forEach(id => {
        root[id] = cloneTemplate(id);
        root.container.prepend(root[id].container);
    });
    after.forEach(id => {
        root[id] = cloneTemplate(id);
        root.container.append(root[id].container);
    });

    // Обработка события и вызов onAction()
    root.container.addEventListener('change', () => {
        onAction();
    });
    root.container.addEventListener('reset', () => {
        setTimeout(onAction, 100);
    });
    root.container.addEventListener('submit', e => {
        e.preventDefault();
        onAction(e.submitter);
    });

    const render = (data) => {
        const nextRows = data.map(item => {
            const row = cloneTemplate(rowTemplate);
            Object.keys(item).forEach(key => {
                if (key in row.elements) {
                    row.elements[key].textContent = item[key];
                }
            });
            return row.container;
        });
        root.elements.rows.replaceChildren(...nextRows);
    }

    return {...root, render};
}
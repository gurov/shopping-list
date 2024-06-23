document.addEventListener('DOMContentLoaded', () => {
    const items = [
        { name: 'брокколи', emoji: '🥦' },
        { name: 'бумага для выпечки', emoji: '📜' },
        { name: 'говядина', emoji: '🥩' },
        { name: 'горох', emoji: '🌱' },
        { name: 'детская еда', emoji: '🍼' },
        { name: 'для посудомойки', emoji: '🧽' },
        { name: 'к чаю', emoji: '🍪' },
        { name: 'картошка', emoji: '🥔' },
        { name: 'каша', emoji: '🥣' },
        { name: 'кефир', emoji: '🥛' },
        { name: 'корм животным', emoji: '🐾' },
        { name: 'крупа', emoji: '🌾' },
        { name: 'кукуруза в банке', emoji: '🌽' },
        { name: 'курица', emoji: '🍗' },
        { name: 'лапша', emoji: '🍜' },
        { name: 'лук', emoji: '🧅' },
        { name: 'майонез', emoji: '🥫' },
        { name: 'молоко', emoji: '🥛' },
        { name: 'морковь', emoji: '🥕' },
        { name: 'моющие средства', emoji: '🧴' },
        { name: 'мука', emoji: '🌾' },
        { name: 'мыло', emoji: '🧼' },
        { name: 'мюсли', emoji: '🥣' },
        { name: 'мёд', emoji: '🍯' },
        { name: 'наполнитель для кошек', emoji: '🐱' },
        { name: 'огурцы', emoji: '🥒' },
        { name: 'пельмени', emoji: '🥟' },
        { name: 'перец сладкий', emoji: '🫑' },
        { name: 'перец сухой', emoji: '🌶️' },
        { name: 'пицца', emoji: '🍕' },
        { name: 'подгузник', emoji: '🍼' },
        { name: 'помидоры', emoji: '🍅' },
        { name: 'приправы', emoji: '🌿' },
        { name: 'растительное масло', emoji: '🛢️' },
        { name: 'рис', emoji: '🍚' },
        { name: 'рыба', emoji: '🐟' },
        { name: 'салат', emoji: '🥗' },
        { name: 'салфетки', emoji: '🧻' },
        { name: 'сахар', emoji: '🍚' },
        { name: 'свинина', emoji: '🥩' },
        { name: 'сливочное масло', emoji: '🧈' },
        { name: 'сметана', emoji: '🥣' },
        { name: 'сок', emoji: '🍹' },
        { name: 'соль', emoji: '🧂' },
        { name: 'сосиски', emoji: '🌭' },
        { name: 'стиральный порошок', emoji: '🧺' },
        { name: 'сыр', emoji: '🧀' },
        { name: 'уксус', emoji: '🧴' },
        { name: 'фольга', emoji: '📜' },
        { name: 'фрукты', emoji: '🍎' },
        { name: 'хлеб', emoji: '🍞' },
        { name: 'чипсы', emoji: '🍟' },
        { name: 'шунька', emoji: '🍖' },
        { name: 'яйца', emoji: '🥚' }
    ];

    const shoppingList = document.getElementById('shopping-list');
    const toggleAll = document.getElementById('toggle-all');
    const notes = document.getElementById('notes');

    // Sort items alphabetically by name
    items.sort((a, b) => a.name.localeCompare(b.name));

    // Load saved state
    const savedState = JSON.parse(localStorage.getItem('shoppingListState')) || {};
    const savedNotes = localStorage.getItem('notes') || '';

    notes.value = savedNotes;

    // Create list items
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        const itemLabel = document.createElement('label');
        const itemCheckbox = document.createElement('input');
        const itemEmoji = document.createElement('span');
        const itemName = document.createElement('span');

        itemCheckbox.type = 'checkbox';
        itemCheckbox.checked = savedState[item.name] || false;
        itemCheckbox.addEventListener('change', () => {
            savedState[item.name] = itemCheckbox.checked;
            localStorage.setItem('shoppingListState', JSON.stringify(savedState));
        });

        itemEmoji.textContent = item.emoji;
        itemName.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1);

        itemLabel.appendChild(itemCheckbox);
        itemLabel.appendChild(itemEmoji);
        itemLabel.appendChild(itemName);
        itemDiv.appendChild(itemLabel);
        shoppingList.appendChild(itemDiv);
    });

    notes.addEventListener('input', () => {
        localStorage.setItem('notes', notes.value);
    });

    toggleAll.addEventListener('change', () => {
        if (confirm('Вы уверены, что хотите переключить все элементы?')) {
            const checked = toggleAll.checked;
            items.forEach((item, index) => {
                savedState[item.name] = checked;
                const checkbox = shoppingList.querySelectorAll('input[type="checkbox"]')[index];
                checkbox.checked = checked;
            });
            localStorage.setItem('shoppingListState', JSON.stringify(savedState));
        } else {
            toggleAll.checked = !toggleAll.checked;
        }
    });
});

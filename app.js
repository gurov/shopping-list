const items = [
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
    { name: 'кукуруза в банке', emoji: '🌽' },
    { name: 'курица', emoji: '🍗' },
    { name: 'лапша', emoji: '🍜' },
    { name: 'лук', emoji: '🧅' },
    { name: 'майонез', emoji: '🥫' },
    { name: 'молоко', emoji: '🥛' },
    { name: 'морковь', emoji: '🥕' },
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
    { name: 'фольга', emoji: '📜' },
    { name: 'фрукты', emoji: '🍎' },
    { name: 'хлеб', emoji: '🍞' },
    { name: 'чипсы', emoji: '🍟' },
    { name: 'шунька', emoji: '🍖' },
    { name: 'яйца', emoji: '🥚' },
    { name: 'бананы', emoji: '🍌' },
    { name: 'бумажные полотенца', emoji: '🧻' },
    { name: 'вино', emoji: '🍷' },
    { name: 'грибы', emoji: '🍄' },
    { name: 'губки', emoji: '🧽' },
    { name: 'дезодорант', emoji: '🧴' },
    { name: 'дрожжи', emoji: '🍞' },
    { name: 'зелень', emoji: '🌿' },
    { name: 'зубная паста', emoji: '🪥' },
    { name: 'зубная щётка', emoji: '🪥' },
    { name: 'йогурт', emoji: '🥣' },
    { name: 'капуста', emoji: '🥬' },
    { name: 'колбаса', emoji: '🥓' },
    { name: 'консервы', emoji: '🥫' },
    { name: 'кофе', emoji: '☕' },
    { name: 'креветки', emoji: '🦐' },
    { name: 'лампы (лампочки)', emoji: '💡' },
    { name: 'мороженое', emoji: '🍨' },
    { name: 'мусорные пакеты', emoji: '🗑️' },
    { name: 'орехи', emoji: '🥜' },
    { name: 'пиво', emoji: '🍺' },
    { name: 'помазанка', emoji: '🥪' },
    { name: 'прокладки (гигиенические)', emoji: '🩸' },
    { name: 'скотч', emoji: '📦' },
    { name: 'сливки', emoji: '🥛' },
    { name: 'сухофрукты', emoji: '🍇' },
    { name: 'туалетная бумага', emoji: '🧻' },
    { name: 'фарш', emoji: '🥩' },
    { name: 'чай', emoji: '🍵' },
    { name: 'чистящие средства', emoji: '🧼' },
    { name: 'шампунь, кондиционер', emoji: '🧴' },
    { name: 'шоколад', emoji: '🍫' },
    { name: 'ягоды', emoji: '🍓' }
];


document.addEventListener('DOMContentLoaded', () => {
    const shoppingListContainer = document.getElementById('shopping-list');
    const notesField = document.getElementById('notes');
    const toggleAllCheckbox = document.getElementById('toggle-all');
    const shareButton = document.getElementById('share-button');

    // Initialize shopping list
    function initializeShoppingList() {
        shoppingListContainer.innerHTML = '';
        items.sort((a, b) => a.name.localeCompare(b.name));
        items.forEach(item => {
            const itemElement = document.createElement('label');
            itemElement.innerHTML = `
                <input type="checkbox" class="shopping-item" data-name="${item.name}">
                ${item.emoji} ${item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            `;
            shoppingListContainer.appendChild(itemElement);
        });
        loadFromLocalStorage();
    }

    // Load saved state from localStorage
    function loadFromLocalStorage() {
        const savedItems = JSON.parse(localStorage.getItem('shoppingItems') || '{}');
        document.querySelectorAll('.shopping-item').forEach(checkbox => {
            checkbox.checked = !!savedItems[checkbox.dataset.name];
        });
        notesField.value = localStorage.getItem('shoppingNotes') || '';
    }

    // Save state to localStorage
    function saveToLocalStorage() {
        const itemsState = {};
        document.querySelectorAll('.shopping-item').forEach(checkbox => {
            itemsState[checkbox.dataset.name] = checkbox.checked;
        });
        localStorage.setItem('shoppingItems', JSON.stringify(itemsState));
        localStorage.setItem('shoppingNotes', notesField.value);
    }

    // Toggle all items
    toggleAllCheckbox.addEventListener('change', () => {
        if (confirm('Вы уверены, что хотите переключить все элементы?')) {
            const isChecked = toggleAllCheckbox.checked;
            document.querySelectorAll('.shopping-item').forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            saveToLocalStorage();
        } else {
            toggleAllCheckbox.checked = !toggleAllCheckbox.checked;
        }
    });

    // Share selected items
    shareButton.addEventListener('click', () => {
        const selectedItems = Array.from(document.querySelectorAll('.shopping-item:checked'))
            .map(checkbox => `${checkbox.nextSibling.textContent.trim()}`)
            .join('\n');
        const notes = notesField.value.trim();
        const shareData = {
            title: 'Список покупок',
            text: `Список покупок:\n${selectedItems}\n\nЗаметки:\n${notes}`
        };

        if (navigator.share) {
            navigator.share(shareData).catch(err => console.error('Ошибка при расшаривании:', err));
        } else {
            alert('Ваш браузер не поддерживает Web Share API.');
        }
    });

    // Event listeners for changes
    shoppingListContainer.addEventListener('change', saveToLocalStorage);
    notesField.addEventListener('input', saveToLocalStorage);

    // Initialize the app
    initializeShoppingList();
});
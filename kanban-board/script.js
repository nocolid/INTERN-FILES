// Kanban Board Application
class KanbanBoard {
    constructor() {
        this.cards = [];
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.loadFromLocalStorage();
        this.renderAllCards();
        this.attachEventListeners();
        this.updateCardCounts();
        this.loadSampleData();
    }

    // Load sample data if no data exists
    loadSampleData() {
        if (this.cards.length === 0) {
            this.cards = [
                {
                    id: this.generateId(),
                    title: 'Design Homepage',
                    description: 'Create wireframes and mockups for the new homepage design',
                    column: 'todo'
                },
                {
                    id: this.generateId(),
                    title: 'Setup Database',
                    description: 'Configure PostgreSQL database and create initial schema',
                    column: 'todo'
                },
                {
                    id: this.generateId(),
                    title: 'API Development',
                    description: 'Build REST API endpoints for user authentication',
                    column: 'in-progress'
                },
                {
                    id: this.generateId(),
                    title: 'Code Review',
                    description: 'Review pull requests from team members',
                    column: 'in-progress'
                },
                {
                    id: this.generateId(),
                    title: 'Setup CI/CD',
                    description: 'Configure GitHub Actions for automated testing and deployment',
                    column: 'done'
                }
            ];
            this.saveToLocalStorage();
            this.renderAllCards();
            this.updateCardCounts();
        }
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // LocalStorage operations
    saveToLocalStorage() {
        try {
            localStorage.setItem('kanbanCards', JSON.stringify(this.cards));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('kanbanCards');
            if (data) {
                this.cards = JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            this.cards = [];
        }
    }

    // Card CRUD Operations
    addCard(title, description, column) {
        const card = {
            id: this.generateId(),
            title,
            description,
            column
        };
        this.cards.push(card);
        this.saveToLocalStorage();
        this.renderCard(card);
        this.updateCardCounts();
        return card;
    }

    updateCard(id, title, description, column) {
        const cardIndex = this.cards.findIndex(c => c.id === id);
        if (cardIndex !== -1) {
            this.cards[cardIndex] = { id, title, description, column };
            this.saveToLocalStorage();
            this.renderAllCards();
            this.updateCardCounts();
            return true;
        }
        return false;
    }

    deleteCard(id) {
        const cardIndex = this.cards.findIndex(c => c.id === id);
        if (cardIndex !== -1) {
            this.cards.splice(cardIndex, 1);
            this.saveToLocalStorage();
            this.renderAllCards();
            this.updateCardCounts();
            return true;
        }
        return false;
    }

    moveCard(id, newColumn) {
        const card = this.cards.find(c => c.id === id);
        if (card) {
            card.column = newColumn;
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    // Rendering
    renderCard(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.draggable = true;
        cardElement.dataset.cardId = card.id;

        cardElement.innerHTML = `
            <div class="card-header">
                <div class="card-title">${this.escapeHtml(card.title)}</div>
                <div class="card-actions">
                    <button class="card-btn edit-btn" data-id="${card.id}" title="Edit">✏️</button>
                    <button class="card-btn delete-btn" data-id="${card.id}" title="Delete">🗑️</button>
                </div>
            </div>
            <div class="card-description">${this.escapeHtml(card.description)}</div>
        `;

        // Add drag event listeners
        cardElement.addEventListener('dragstart', this.handleDragStart.bind(this));
        cardElement.addEventListener('dragend', this.handleDragEnd.bind(this));

        // Add edit/delete listeners
        const editBtn = cardElement.querySelector('.edit-btn');
        const deleteBtn = cardElement.querySelector('.delete-btn');

        editBtn.addEventListener('click', () => this.openEditModal(card.id));
        deleteBtn.addEventListener('click', () => this.handleDeleteCard(card.id));

        const container = document.querySelector(`[data-column-id="${card.column}"]`);
        if (container) {
            container.appendChild(cardElement);
        }
    }

    renderAllCards() {
        // Clear all containers
        document.querySelectorAll('.cards-container').forEach(container => {
            container.innerHTML = '';
        });

        // Render all cards
        this.cards.forEach(card => this.renderCard(card));
    }

    updateCardCounts() {
        const columns = ['todo', 'in-progress', 'done'];
        columns.forEach(columnId => {
            const count = this.cards.filter(card => card.column === columnId).length;
            const column = document.querySelector(`[data-column="${columnId}"]`);
            if (column) {
                const countElement = column.querySelector('.card-count');
                if (countElement) {
                    countElement.textContent = count;
                }
            }
        });
    }

    // Drag and Drop
    handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);
        e.dataTransfer.setData('cardId', e.target.dataset.cardId);
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    handleDragEnter(e) {
        if (e.target.classList.contains('cards-container')) {
            e.target.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        if (e.target.classList.contains('cards-container')) {
            e.target.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        e.preventDefault();

        const cardId = e.dataTransfer.getData('cardId');
        const dropTarget = e.target.closest('.cards-container');

        if (dropTarget) {
            dropTarget.classList.remove('drag-over');
            const newColumn = dropTarget.dataset.columnId;

            if (cardId && newColumn) {
                this.moveCard(cardId, newColumn);
                this.renderAllCards();
                this.updateCardCounts();
            }
        }

        return false;
    }

    // Modal Operations
    openAddModal() {
        this.currentEditId = null;
        document.getElementById('modalTitle').textContent = 'Add New Card';
        document.getElementById('cardTitle').value = '';
        document.getElementById('cardDescription').value = '';
        document.getElementById('cardColumn').value = 'todo';
        document.getElementById('cardModal').classList.add('active');
    }

    openEditModal(cardId) {
        const card = this.cards.find(c => c.id === cardId);
        if (card) {
            this.currentEditId = cardId;
            document.getElementById('modalTitle').textContent = 'Edit Card';
            document.getElementById('cardTitle').value = card.title;
            document.getElementById('cardDescription').value = card.description;
            document.getElementById('cardColumn').value = card.column;
            document.getElementById('cardModal').classList.add('active');
        }
    }

    closeModal() {
        document.getElementById('cardModal').classList.remove('active');
        this.currentEditId = null;
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const title = document.getElementById('cardTitle').value.trim();
        const description = document.getElementById('cardDescription').value.trim();
        const column = document.getElementById('cardColumn').value;

        if (!title) {
            alert('Please enter a title');
            return;
        }

        if (this.currentEditId) {
            this.updateCard(this.currentEditId, title, description, column);
        } else {
            this.addCard(title, description, column);
        }

        this.closeModal();
    }

    handleDeleteCard(cardId) {
        if (confirm('Are you sure you want to delete this card?')) {
            this.deleteCard(cardId);
        }
    }

    // Event Listeners
    attachEventListeners() {
        // Add card button
        document.getElementById('addCardBtn').addEventListener('click', () => this.openAddModal());

        // Modal close
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());

        // Form submit
        document.getElementById('cardForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Close modal on outside click
        document.getElementById('cardModal').addEventListener('click', (e) => {
            if (e.target.id === 'cardModal') {
                this.closeModal();
            }
        });

        // Drag and drop for all containers
        document.querySelectorAll('.cards-container').forEach(container => {
            container.addEventListener('dragover', (e) => this.handleDragOver(e));
            container.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            container.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            container.addEventListener('drop', (e) => this.handleDrop(e));
        });
    }

    // Utility
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application
let kanbanApp;
document.addEventListener('DOMContentLoaded', () => {
    kanbanApp = new KanbanBoard();
});

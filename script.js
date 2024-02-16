const listContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')

const LOCAL_STORAGE_LIST_KEY =  'task.lists'
let selectedListId = localStorage.getItem()
const LOCAL_STORAGE_Selected_LIST_ID_KEY =  'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];


newListForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const listName = newListInput.value
    if (listName == null || listName === '') {
        return        
    }
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender();
})

// to cache the data in the browser
function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))  // stringify converts array or obj to JSON
}

function createList(name) {
    return{id: Date.now().toString(), name: name, tasks: [] }
}
function clearElement (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)        
    }
}

function render() {
    clearElement(listContainer)
    lists.forEach(list => {
        const li_item = document.createElement('li')
        li_item.dataset.listId = list.id
        li_item.classList.add('list-name')
        li_item.innerText = list.name
        listContainer.appendChild(li_item)
    })
}
function saveAndRender() {
    save();
    render();
}

render()



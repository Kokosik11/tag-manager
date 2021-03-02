class TagList {
    tags = [];
    state = { readonly: false };
    localData = JSON.parse(localStorage.getItem("data"));
    tagListDOM = document.querySelector('.tag-list');
    readonlyEvent = new Event("readonly", { bubbles: true });

    constructor(tags = []) {
        this.tags = this.localData.tags || tags;
        
        if(this.tags > 15) this.readOnly = true;

        this.render();
    }

    get tags() {
        return this.tags;
    }

    set tags(value) {
        this.tags = value;
    }

    addTag = value => {
        if(this.tags.length > 15) this.readOnly = true;
        else {
            this.tags.push(value);
            console.log(this.tags);
            this.render();
            this.toLocalStorage();
        }
    }

    removeTag = index => {
        this.tags.splice(index, 1);
        this.render();
        this.toLocalStorage();
        this.readOnly = false;
    }

    toLocalStorage = () => {
        let data = {
            tags: this.tags,
        }
        localStorage.setItem("data", JSON.stringify(data));
    }

    get readOnly() {
        return this.state.readonly;
    }

    set readOnly(value) {
        this.state.readonly = value;
        document.dispatchEvent(this.readonlyEvent)
    }

    render = () => {
        this.tagListDOM.innerHTML = "";
        this.tags.forEach((tag, index) => {
            let elem = `<div class="tag">#${tag}\t<span onclick="deleteTag(${index})" data-id="${index}" class="delete">x</span></div>`
            this.tagListDOM.innerHTML += elem;
        })
    }
}

const tagInput = document.querySelector('.tag-input');
const addBtn = document.querySelector('.tag-btn');
let deleteBtn = document.querySelectorAll('.delete');

let tagList = new TagList();

addBtn.onclick = event => {
    deleteBtn = document.querySelectorAll('.delete');
    if(tagInput.value != "") tagList.addTag(tagInput.value)
    tagInput.value = "";
} 

const deleteTag = index => tagList.removeTag(index);

document.body.onload = () => {
    if(tagList.tags.length > 15) readOnly = true; 
    document.dispatchEvent(tagList.readonlyEvent);
}

document.addEventListener("readonly", event => {
    if(tagList.tags.length > 15) {
        tagInput.readOnly = true;
        addBtn.classList.add("unactive");
    } else {
        tagInput.readOnly = false;
        addBtn.classList.remove("unactive");
    }
})
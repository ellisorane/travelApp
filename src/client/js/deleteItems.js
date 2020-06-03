export const deleteItems = () => {
    const deleteBtn = document.getElementsByClassName('delete-btn')
    
    for(let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', (e) => {
            const target = e.target.parentElement.parentElement.parentElement
            target.remove()
            localStorage.removeItem(target.id);
        })
    }
}
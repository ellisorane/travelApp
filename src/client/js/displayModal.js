export const displayModal= () => {
    const backdrop = document.getElementById('backdrop')
    
    backdrop.classList.remove('display-none')

    document.getElementById('close-modal').addEventListener('click', () => {
        
        backdrop.classList.add('display-none')

    })
}
// const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

// update.addEventListener('click', _ => {
//     fetch('/api/persons', {
//         method: 'put',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Darth Vadar',
//             homeNumber: 'I find your lack of faith disturbing.'
//         })
//     })
//     .then(res => {
//         if (res.ok) return res.json()
//     })
//     .then(response => {
//         // console.log(response)
//         window.location.reload(true)
//     })
// })

deleteButton.addEventListener('click', _ => {
    fetch('/api/persons/:_id', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        _id: '62affcf01cf6657bca5c74c3'
        })
    })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(res => {
        if (res === 'Deleted document') {
            messageDiv.textContent = 'Deleted document'
        } else {
            window.location.reload(true)
        }
    })
})
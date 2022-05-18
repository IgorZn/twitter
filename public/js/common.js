$("#postTextarea").keyup( event => {
    let textbox = $(event.target);
    let value = textbox.val().trim()
    console.log(value);
})
$("#postTextarea").on("keyup",event => {
    let textbox = $(event.target);
    let value = textbox.val().trim()

    let submitButton = $("#submitPostButton");

    if (submitButton.length == 0) return alert("No POST button");

    if (!value) return submitButton.prop("disabled", true);

    submitButton.prop("disabled", false)
})
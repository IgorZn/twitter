$("#postTextarea").on("keyup",event => {
    let textbox = $(event.target);
    let value = textbox.val().trim()

    let submitButton = $("#submitPostButton");

    if (submitButton.length == 0) return alert("No POST button");

    if (!value) return submitButton.prop("disabled", true);

    submitButton.prop("disabled", false)
});

$("#submitPostButton").on("click", event => {
    let button = $(event.target);
    let textbox = $("#postTextarea");

    let data = {
        content: textbox.val(),
    };

    $.post("/api/posts", data, (postData, status, xhr) => {
        let html = createPostHtml(postData);
        $(".postConteiner").prepend(html); // add element at the beginning NOT at the end
        textbox.val("");
        button.prop("disable", true);


    });
});

function createPostHtml(postDate) {
    return postDate.content;
}
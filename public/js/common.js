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
        let html = createPostHtml(postData); // get html content (values)
        $(".postConteiner").prepend(html); // add element at the beginning NOT at the end
        textbox.val(""); // Clean up recent value of textarea
        button.prop("disable", true); // turn off button "Post"


    });
});

function createPostHtml(postData) {
    // return html value of textarea
    let postedBy = postData.postedBy;

    return `<div class='post'>
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                        </div>
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                        </div>
                    </div>
                </div>
            </div>`;
}
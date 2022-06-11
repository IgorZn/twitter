$(window).on( "load", () => {
    $.get("/api/posts", results => {
        outputPost(results, $(".postContainer"))
    });
});

function outputPost(results, container) {
    container.html("");

    results.forEach( result => {
        let html = createPostHtml(result);
        container.append(html)
    });

    if (!results){
        container.append("<span class='noResults'>Nothing to show.</span>")
    }
}
$(window).on( "load", () => {
    $.get("/api/posts", results => {
        console.log(results)

    });
});
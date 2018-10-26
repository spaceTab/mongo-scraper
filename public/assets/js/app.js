$(function () {

    const get_scrapes = () => {
        $.get('/api/scrape').done(data => {
            console.log(data)
            window.location = '/';
        });
    }

    const save_article = function () {
        let articleID = $(this).data("id");
        $(this).parents(".articlebox").remove();
        M.toast({ "html": 'Saved article' });
        console.log(articleID);
        console.log('here')
        $.post(`/saved/${articleID}`, (error, resp) => {
            if (error) {
                console.log(`error`, error)
            } else {
                console.log('saved')
                window.location.href = '/';
            }
        });
    }

    const remove_saved = function () {
        const articleID = $(this).data("id");
        console.log()
        $(this).parents(".removeArt").remove();
        $.post(`/remove/${articleID}`);
    }

    const save_note = function () {
        const id = $(this).attr('data-id');
        const noteObj = {};
        const noteTitleVal = $('.noteTitle').val().trim();
        const noteVal = $('.notes').val().trim();
      
            noteObj.title = noteTitleVal;
            noteObj.note = noteVal;
            $.post(`/notes/${id}`, noteObj);
        
    };

    const get_note = function(id) {
        $(".noteArea").empty();

        $.get(`/notes/${id}`).then( element => {
            const notes = elemente.note;
            console.log( notes )
            note.forEach( note => {
              $('.noteTitle').append(notes.title)
              $('.notes').append(notes.note)
            })
        })
    }
    get_note();

    $(".saveMe").on("click", save_article);
    $(".removeArt").on("click", remove_saved);
    $(".scrapeAgain").on("click", get_scrapes);
    $(".saveNote").on("click", save_note);


    M.AutoInit();
})
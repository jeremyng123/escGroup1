jQuery(document).ready(function() {

    $('.table.table-hover tr').click(function() {
        href = $(this).attr('href');
        // alert(window.location.host + href);

        window.location.replace(href);
    });
});
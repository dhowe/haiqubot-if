$(document).ready(function () {
    var editor = ace.edit('json');
    editor.setTheme('ace/theme/github');
    editor.session.setMode('ace/mode/json');
    editor.setFontSize(14);
    editor.getSession().setUseWorker(false);
    editor.$blockScrolling = Infinity;
    setTimeout(function (e) {
        //editor.resize(true);
        editor.scrollToLine(1000, true, true, function () { });
        editor.gotoLine(1000, 0, true);
    }, 5000);

    $(document).on('click', '#submit_json_skip', function () {
        try {
            // convert BSON string to EJSON
            var ejson = toEJSON.serializeString(editor.getValue());

            $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: $('#app_context').val() + '/document/' + $('#conn_name').val() + '/' + $('#db_name').val() + '/'   + $('#coll_name').val() + '/edit_doc_skip',
                //+ $('#coll_name').val() + '/' + $('#edit_request_type').val(),
                data: JSON.stringify({ 'objectData': ejson })
            })
                .done(function (data) {
                    show_notification(data.msg, 'success', true, 100);
                    if (0 && data.doc_id) {
                        setInterval(function () {
                            // remove "new" and replace with "edit" and redirect to edit the doc
                            window.location = window.location.href.substring(0, window.location.href.length - 3) + 'edit/' + data.doc_id;
                        }, 2500);
                    }
                })
                .fail(function (data) {
                    show_notification(data.responseJSON.msg, 'danger');
                });
        } catch (err) {
            show_notification(err, 'danger');
        }
    });

    $(document).on('click', '#submit_json_select', function () {
        try {
            // convert BSON string to EJSON
            var ejson = toEJSON.serializeString(editor.getValue());

            $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: $('#app_context').val() + '/document/' + $('#conn_name').val() + '/' + $('#db_name').val() + '/'
                    + $('#coll_name').val() + '/edit_doc_select',
                //+ $('#coll_name').val() + '/' + $('#edit_request_type').val(),
                data: JSON.stringify({ 'objectData': ejson })
            })
                .done(function (data) {
                    show_notification(data.msg, 'success', true, 100);
                    if (0 && data.doc_id) {
                        setInterval(function () {
                            // remove "new" and replace with "edit" and redirect to edit the doc
                            window.location = window.location.href.substring(0, window.location.href.length - 3) + 'edit/' + data.doc_id;
                        }, 2500);
                    }
                })
                .fail(function (data) {
                    show_notification(data.responseJSON.msg, 'danger');
                });
        } catch (err) {
            show_notification(err, 'danger');
        }
    });

    $(document).on('click', '#submit_json', function () {
        try {
            // convert BSON string to EJSON
            var ejson = toEJSON.serializeString(editor.getValue());

            $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: $('#app_context').val() + '/document/' + $('#conn_name').val() + '/' + $('#db_name').val() + '/' + $('#coll_name').val() + '/' + $('#edit_request_type').val(),
                data: JSON.stringify({ 'objectData': ejson })
            })
                .done(function (data) {
                    show_notification(data.msg, 'success');
                    if (data.doc_id) {
                        setInterval(function () {
                            // remove "new" and replace with "edit" and redirect to edit the doc
                            window.location = window.location.href.substring(0, window.location.href.length - 3) + 'edit/' + data.doc_id;
                        }, 2500);
                    }
                })
                .fail(function (data) {
                    show_notification(data.responseJSON.msg, 'danger');
                });
        } catch (err) {
            show_notification(err, 'danger');
        }
    });
});

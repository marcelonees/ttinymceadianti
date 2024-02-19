   
    /**
     * Variáveis globais de configuração
     */
    var card_items = [];

    var image_list = [];

    const image_prepend_url = 'https://sistemas.jaraguadosul.sc.gov.br/';

    const menubar = '';

    const plugins = ['autoresize', 'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor',
        'pagebreak', 'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
        'media', 'table', 'emoticons'
    ];

    const toolbar = [
        'styles | fontfamily fontsize | lineheight| forecolor backcolor | bold italic underline | alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | link image media | table | removeformat | fullscreen preview | pagebreak'
    ];



    /**
     * Funções
     */


    function ttinymceeditor_enable_field(form_name, field) {
        console.log('ttinymceeditor_enable_field');
        setTimeout(function () { $('form[name=' + form_name + '] [name=' + field + ']').next().find('.note-editable').attr('contenteditable', true); }, 1);
    }

    function ttinymceeditor_disable_field(form_name, field) {
        console.log('ttinymceeditor_disable_field');
        setTimeout(function () { $('form[name=' + form_name + '] [name=' + field + ']').next().find('.note-editable').attr('contenteditable', false); }, 1);
    }

    function ttinymceeditor_clear_field(form_name, field) {
        console.log('ttinymceeditor_clear_field');
        setTimeout(function () { $('form[name=' + form_name + '] [name=' + field + ']').code(''); }, 1);
    }

    function ttinymceeditor_get_length(content) {
        console.log('ttinymceeditor_get_length');
        content = content.replace(/(<p><br><\/p>)/ig, ' ');
        content = content.replace(/(<([^>]+)>)/ig, "");
        content = content.replace(/(&nbsp;)/ig, ' ');

        return content.length;
    }

    function ttinymceeditor_insert_text(form_name, field, content) {
        console.log('ttinymceeditor_insert_text');

        $('form[name=' + form_name + '] [name=' + field + ']').summernote('editor.saveRange');
        $('form[name=' + form_name + '] [name=' + field + ']').summernote('editor.restoreRange');
        $('form[name=' + form_name + '] [name=' + field + ']').summernote('editor.focus');
        $('form[name=' + form_name + '] [name=' + field + ']').summernote('editor.insertText', content);
    }


    function ttinymceeditor_set_image_list(objects) {
        console.log('ttinymceeditor_editor_set_image_list');
        image_list = objects;
    }


    function ttinymceeditor_set_card_items(objects) {
        console.log('ttinymceeditor_editor_set_card_items');
        card_items = objects;
    }


    function ttinymceeditor_start(objectId, width = 800, height = 600, lang, options, buttons) {
        console.log('ttinymceeditor_start: ' + objectId + ' lang: ' + lang);

        tinymce.init({
            selector: 'textarea#' + objectId,
            skin: 'oxide',
            content_css: 'document',
            language: lang,
            menubar: menubar,
            branding: false,
            promotion: false,
            force_br_newlines: true,
            plugins: plugins,
            toolbar: toolbar,
            min_height: 200,
            max_height: 600,
            min_width: 400,
            height: height,
            width: width,
            image_list: image_list,
            content_style: 'td p { margin: 5px; line-height: 1};',
            autoresize_overflow_padding: 50,
            autoresize_bottom_margin: 50,
            table_default_attributes: {
                border: '1'
            },
            image_prepend_url: image_prepend_url,
            init_instance_callback: function () {
                $('head').append('<style> .mce-tooltip{ display: none; } </style>');
            },
            setup: (editor) => {
                const onAction = (autocompleteApi, rng, value) => {
                    editor.selection.setRng(rng);
                    editor.insertContent('{{' + value + '}}');
                    autocompleteApi.hide();
                };

                const getMatchedChars = (pattern) => {
                    return card_items.filter(char => char.text.indexOf(pattern) !== -1);
                };

                /**
                 * An autocompleter that allows you to insert special characters.
                 * Items are built using the CardMenuItem.
                 */
                editor.ui.registry.addAutocompleter("TinyMCEAutocompleter", {
                    ch: '{{',
                    minChars: 0,
                    columns: 1,
                    highlightOn: ['char_name'],
                    onAction: onAction,
                    fetch: (pattern) => {
                        return new Promise((resolve) => {
                            const results = getMatchedChars(pattern).map(char => ({
                                type: 'cardmenuitem',
                                value: char.value,
                                label: char.text,
                                items: [{
                                    type: 'cardcontainer',
                                    direction: 'vertical',
                                    items: [
                                        {
                                            type: 'cardtext',
                                            text: char.text,
                                            name: 'char_name'
                                        },
                                        {
                                            type: 'cardtext',
                                            text: char.name
                                        }
                                    ]
                                }]
                            }));
                            resolve(results);
                        });
                    }
                }),

                    /**
                     * Atualiza o valor do campo no Formulário Adianti
                     */
                    editor.on('change', (e) => {
                        content = tinymce.get(objectId).getContent();
                        $('#' + objectId).val(content);
                    })
            },
        });

    }

    function ttinymceeditor_start2(objectId, width, height, lang, options, buttons) {

        var attributes = {
            dialogsInBody: true,
            fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36', '48', '64', '82', '150'],
            width: width,
            height: height,
            lang: lang,
            toolbar: [
                ['undoredo', ['undo', 'redo']],
                ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
                ['font', ['fontname', 'fontsize', 'color']],
                ['para', ['ul', 'ol', 'paragraph', 'height']],
                ['insert', ['table', 'link', 'picture', 'hr']],
                ["view", ["fullscreen", "codeview", "help"]],
            ]
        };
        
        options = Object.assign(attributes, JSON.parse(options));
        
        if (buttons) {
            const buttonsArray = JSON.parse(buttons);
            options.buttons = {};
            const buttonsOptions = [];

            for (const button of buttonsArray) {
                buttonsOptions.push(['mybutton_' + button.name, [button.name]]);

                options.buttons[button.name] = function (context) {
                    var ui = $.summernote.ui;

                    var uibutton = ui.button({
                        contents: base64_decode(button.icon) + (button.showLabel ? base64_decode(button.title) : ''),
                        tooltip: (button.showLabel ? null : base64_decode(button.title)),
                        click: function () {
                            eval("((param) => (" + base64_decode(button.function) + ")(param))(context)");
                        }
                    });

                    return uibutton.render();
                }
            }

            options.toolbar.push(...buttonsOptions);
        }

        if (typeof options.completion !== 'undefined') {
            if (typeof summernote_wordlist == 'undefined') {
                summernote_wordlist = {};
            }
            summernote_wordlist[objectId] = options.completion;
            
            options.hint = {
                match: /\b(\w{1,})$/,
                search: function (keyword, callback) {
                    callback($.grep(summernote_wordlist[objectId], function (item) {
                        return item.indexOf(keyword) === 0;
                    }));
                }
            };
        }
        
        if (options.airMode == true) {
            setTimeout(function () {
                $('#' + objectId).parent().find('.note-editable').height(height + 'px').css('overflow', 'auto');
            }, 1);
        }

        if (!!options.maxlength && options.maxlength > 0) {
            options.callbacks = {
                onKeydown: function (e) {
                    var l = ttinymceeditor_get_length($(e.currentTarget).html()) + 1;

                    if (l > options.maxlength) {
                        var allowedKeys = [8, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];
                        if (!allowedKeys.includes(e.keyCode))
                            e.preventDefault();
                    }
                },
                onKeyup: function (e) {
                    var l = ttinymceeditor_get_length($(e.currentTarget).html());
                    $('#' + objectId).next('.note-editor').find('.counter').html(l + '/' + options.maxlength);
                },
                onPaste: function (e) {
                    e.preventDefault();
                }
            }
        }
        
        $('#' + objectId).summernote(options);
        
        if (!!options.maxlength && options.maxlength > 0) {
            var content = $('#' + objectId).parent().find('.note-editable').html();
            var length = ttinymceeditor_get_length(content);
            $('#' + objectId).next('.note-editor').append(
                '<small style="position:absolute;bottom:10px;right:4px;" class="counter">' + length + '/' + options.maxlength + '</small>'
            );
        }

        if (typeof $('#' + objectId).next('.note-editor')[0] !== 'undefined') {
            var container = $('#' + objectId).next('.note-editor')[0];
            $(container).css('margin', $('#' + objectId).css('margin'));
        }
    }

    function ttinymceeditor_editor_reload_completion(field, options) {
        console.log('ttinymceeditor_editor_reload_completion');

        objectId = $('[name=' + field + ']').attr('id');
        setTimeout(function () {
            summernote_wordlist[objectId] = options;
        }, 1);
    }


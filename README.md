# ttinymceadianti

Use um editor WYSIWYG com mais recursos que o THtmlEditor

Segundo o fabricante:

> Install TinyMCE to add a fully-featured, sleek and intuitive
> rich text editor to your app – in just a few lines of code.

Site do fabricante [Tiny](https://www.tiny.cloud/).

Instalação:

```bash
composer config repositories.ttinymceadianti vcs https://github.com/marcelonees/ttinymceadianti
composer require marcelonees/ttinymceadianti @dev
composer require marcelonees/ttinymceadianti dev-main
```

Uso:

```php
use MarceloNees\TTinyMceAdianti\TTinyMceEditor;
$editor = new TTinyMceEditor('editor');
```

# Este projeto está em estágio "embrionário".

## !!!!Não recomendado para produção!!!!

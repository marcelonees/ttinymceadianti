<?php

namespace MarceloNees\TTinyMceAdianti\TTinyMceEditor;

use Adianti\Control\TPage;
use Adianti\Core\AdiantiApplicationConfig;
use Adianti\Database\TTransaction;
use Adianti\Widget\Form\AdiantiWidgetInterface;
use Adianti\Widget\Base\TElement;
use Adianti\Widget\Base\TScript;
use Adianti\Widget\Base\TStyle;
use Adianti\Widget\Form\TField;
use Adianti\Widget\Util\TImage;

/**
 * TinyMceEditor
 *
 * @package    widget
 * @subpackage form
 * @author     Marcelo Barreto Nees <marcelo.linux@gmail.com>
 */
class TTinyMceEditor extends TField implements AdiantiWidgetInterface
// class TTinyMceEditor extends TField
{
    protected $id;
    protected $size;
    protected $formName;
    protected $toolbar;
    protected $customButtons;
    protected $completion;
    protected $options;
    protected $height;

    protected $card_items;
    protected $image_list;
    protected $template_list;


    /**
     * Class Constructor
     * @param $name Widget's name
     */
    public function __construct($name)
    {
        parent::__construct($name);

        TPage::include_js('vendor/marcelonees/ttinymceadianti/src/TTinyMceEditor/tinymce.min.js');
        TPage::include_js('vendor/marcelonees/ttinymceadianti/src/TTinyMceEditor/ttinymceeditor.js');
        TPage::include_css('vendor/marcelonees/ttinymceadianti/src/TTinyMceEditor/ttinymceeditor.css');

        $this->id               = 'TTinyMceEditor_' . mt_rand(1000000000, 1999999999);
        $this->toolbar          = true;
        $this->options          = [];
        $this->customButtons    = [];
        $this->card_items       = '';
        $this->image_list       = '';
        $this->template_list    = '';

        // creates a tag
        $this->tag = new TElement('textarea');
        $this->tag->{'widget'} = 'ttinymceeditor';
    }

    // /**
    //  * Define max length
    //  * @param  $length Max length
    //  */
    // public function setMaxLength($length)
    // {
    //     if ($length > 0) {
    //         $this->options['maxlength'] = $length;
    //     }
    // }

    // /**
    //  * Set extra calendar options
    //  * @link https://summernote.org/deep-dive/
    //  */
    // public function setOption($option, $value)
    // {
    //     $this->options[$option] = $value;
    // }

    // /**
    //  * Add custom button
    //  *
    //  * @link https://summernote.org/deep-dive/#custom-button
    //  * @param $name     String  name action
    //  * @param $function String  function(context){  }
    //  * @param $title    String  title icon
    //  * @param $icon     TImage  toolbar icon
    //  */
    // public function addCustomButton($name, $function, $title, TImage $icon, $showLabel = false)
    // {
    //     $this->customButtons[] = [
    //         'name'      => $name,
    //         'function'  => base64_encode($function),
    //         'title'     => base64_encode($title),
    //         'showLabel' => $showLabel,
    //         'icon'      => base64_encode($icon->getContents()),
    //     ];
    // }


    // /**
    //  * Disable toolbar
    //  */
    // public function disableToolbar()
    // {
    //     $this->toolbar = false;
    // }

    // /**
    //  * Define options for completion
    //  * @param $options array of options for completion
    //  */
    // function setCompletion($options)
    // {
    //     $this->completion = $options;
    // }

    // /**
    //  * Enable the field
    //  * @param $form_name Form name
    //  * @param $field Field name
    //  */
    // public static function enableField($form_name, $field)
    // {
    //     TScript::create(" ttinymceeditor_enable_field('{$form_name}', '{$field}'); ");
    // }

    // /**
    //  * Disable the field
    //  * @param $form_name Form name
    //  * @param $field Field name
    //  */
    // public static function disableField($form_name, $field)
    // {
    //     TScript::create(" ttinymceeditor_disable_field('{$form_name}', '{$field}'); ");
    // }

    // /**
    //  * Clear the field
    //  * @param $form_name Form name
    //  * @param $field Field name
    //  */
    // public static function clearField($form_name, $field)
    // {
    //     TScript::create(" ttinymceeditor_clear_field('{$form_name}', '{$field}'); ");
    // }

    // /**
    //  * Reload completion
    //  * 
    //  * @param $field Field name or id
    //  * @param $options array of options for autocomplete
    //  */
    // public static function reloadCompletion($field, $options)
    // {
    //     $options = json_encode($options);
    //     TScript::create(" ttinymceeditor_insert_text_editor_reload_completion( '{$field}', $options); ");
    // }


    /**
     * Set card_items
     * @param $card_items Json Object
     */
    public function setCardItems($card_items)
    {
        $this->card_items = $card_items;
        TScript::create(" ttinymceeditor_set_card_items($card_items)");
    }


    /**
     * Set image_list
     * @param $image_list Json Object
     */
    public function setImageList($image_list)
    {
        $this->image_list = $image_list;
        TScript::create(" ttinymceeditor_set_image_list($image_list)");
    }

    /**
     * Set template_list
     * @param $template_list Json Object
     */
    public function setTemplateList($template_list)
    {
        $this->template_list = $template_list;
        TScript::create(" ttinymceeditor_set_template_list($template_list)");
    }

    /**
     * Insert text
     * @param $form_name Form name
     * @param $field Field name
     * @param $content Text content
     */
    public static function insertText($form_name, $field, $content)
    {
        TScript::create(" ttinymceeditor_insert_text('{$form_name}', '{$field}', '{$content}'); ");
    }


    /**
     * Define the widget's size
     * @param  $width   Widget's width
     * @param  $height  Widget's height
     */
    public function setSize($width, $height = NULL)
    {
        $this->size = $width;
        if ($height) {
            $this->height = $height;
            TScript::create(" ttinymceeditor_set_height($height); ");
        }
    }

    /**
     * Returns the size
     * @return array(width, height)
     */
    public function getSize()
    {
        return array($this->size, $this->height);
    }


    /**
     * Show the widget
     */
    public function show()
    {
        $style = new TElement('style');
        // $style->add('#' . $this->id . '{ height:' . $this->height . ';  width: ' . $this->width . '; }');
        $style->add("
            #$this->id { 
                height: $this->height;
                width: $this->width; 
            }
        ");

        $this->tag->{'id'}    = $this->id;
        $this->tag->{'class'} = 'ttinymceeditor';    // CSS
        $this->tag->{'name'}  = $this->name;         // tag name

        // add the content to the textarea
        $this->tag->add(htmlspecialchars((string) $this->value));

        // show the tag
        $div = new TElement('div');
        $div->style = 'display: none';
        $div->add($this->tag);
        $div->show();

        $options = $this->options;
        if (!$this->toolbar) {
            $options['airMode'] = true;
        }

        if (!empty($this->completion)) {
            $options['completion'] = $this->completion;
        }

        $options_json = json_encode($options);
        $buttons_json = json_encode($this->customButtons);

        // TinyMCE usa pt_BR ao invés de pt-BR
        $ini    = AdiantiApplicationConfig::get();
        $locale = !empty($ini['general']['locale']) ? $ini['general']['locale'] : 'pt-BR';
        $locale = str_replace('-', '_', $locale);

        // Inicia o TinyMCE
        TScript::create(" 
            ttinymceeditor_start( 
                '{$this->tag->{'id'}}',
                '{$this->size}',
                '{$this->height}',
                '{$locale}',
                '{$options_json}', 
                '{$buttons_json}'
            );
        ");

        // Sugestões de autocomplete
        TScript::create(" ttinymceeditor_set_card_items({$this->card_items})");

        // Lista de imagens disponíveis em Inserir/Editar imagem
        TScript::create(" ttinymceeditor_set_image_list({$this->image_list})");

        // Lista de templates disponíveis
        TScript::create(" ttinymceeditor_set_template_list({$this->template_list})");

        // Mostra o editor na tela
        TScript::create(" $('#{$this->tag->id}').parent().show();");
    }
}

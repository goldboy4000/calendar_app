/**
 * Created by LaBestia on 02.06.2017.
 */

define(function ()
{
    /**
     *
     * @constructor
     */
    function Utils()
    {}

    /**
     * Creates column for element columns (bulma)
     * @param child
     * @param size
     * @returns {Element}
     */
    Utils.prototype.getColumn = function (child, size)
    {
        var column = document.createElement('div');
        column.className = 'column';
        if (size)
        {
            column.classList.add(size);
        }
        column.appendChild(child);

        return column;
    };

    /**
     * Creates tag (bulma)
     * @param id
     * @param classAtrr
     * @param color
     * @param size
     * @param text
     * @param hasButton
     * @returns {Element}
     */
    Utils.prototype.getTag = function (id, classAtrr, color, size, text, hasButton)
    {
        var tag = document.createElement('span');
        tag.className = 'tag';
        tag.classList.add(classAtrr);
        tag.classList.add(color);
        tag.classList.add(size);
        tag.setAttribute('id', id);
        var task = document.createTextNode(text);
        tag.appendChild(task);
        if (hasButton)
        {
            var button = document.createElement('button');
            button.className = 'delete is-small';
            button.setAttribute('id', 'delete');
            tag.appendChild(button);
        }

        return tag;
    };

    /**
     * Creates button (bulma)
     * @param id
     * @param name
     * @param icon
     * @returns {Element}
     */
    Utils.prototype.getButton = function(id, name, icon)
    {
        var button = document.createElement('a');

        var span = document.createElement('span');
        span.className = 'icon is-large';
        span.setAttribute('id', id);
        button.appendChild(span);

        var el = document.createElement('i');
        el.className = icon;
        el.innerHTML = name;
        span.appendChild(el);

        return button;
    };

    /**
     * Creates simple button (bulma)
     * @param id
     * @param name
     * @param color
     * @returns {Element}
     */
    Utils.prototype.getSimpleButton = function(id, name, color)
    {
        var button = document.createElement('a');
        button.className = 'button';
        button.classList.add(color);
        button.setAttribute('id', id);

        var value = document.createTextNode(name);
        button.appendChild(value);

        return button;
    };

    /**
     *
     * @param id
     * @returns {Element}
     */
    Utils.prototype.getSelector = function(id)
    {
        var selector = document.createElement('select');
        selector.setAttribute('id', id);

        return selector;
    };

    /**
     * Finds child element for parent node
     * @param parentNode
     * @param tagName
     * @returns {*}
     */
    Utils.prototype.findChild = function(parentNode, tagName)
    {
        for (var i = 0; i < parentNode.children.length; i++)
        {
            if (parentNode.children[i].tagName === tagName.toUpperCase())
            {
                return parentNode.children[i];
            }
        }
        return null;
    };

    /**
     *
     * @param value
     * @param text
     * @returns {Element}
     */
    Utils.prototype.getOption = function(value, text)
    {
        var option = document.createElement('option');
        option.value = value;
        option.innerHTML = text;

        return option;
    };

    return new Utils();

});
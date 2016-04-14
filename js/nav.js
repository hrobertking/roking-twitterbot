/*
 * Uses a menu marked up as an unordered list
 * using the class 'menu' with each list item
 * using the class 'item'. Within each list
 * item is an anchor tag as the first child
 * and a span with the class 'indicator' as the
 * last child. An unordered list with the class
 * 'submenu' may optionally be included between
 * the anchor tag and the indicator span.
 */
function initMenu(menu) {
  var contained
    , count
    , index
    , items
    , mnu_item
  ;

  items = menu.getElementsByTagName('li');
  count = items.length - 1;

  while (count > -1) {
    mnu_item = items.item(count);
    contained = mnu_item.childNodes;
    index = contained.length - 1;
    while (index > -1) {
      if ((/\bsubmenu\b/).test(contained.item(index).className)) {
        contained.item(index).style.left = mnu_item.offsetLeft + 'px';
        contained.item(index).style.margin = '0';
        contained.item(index).style.right = 'auto';
        break;
      }
      index -= 1;
    }
    count -= 1;
  }
}

initMenu(document.getElementById('main-menu'));

$('.menu.button.open.close').on('click', function() {
    var check = /\bopened\b/
      , mnu = this.parentNode
      , isopen = check.test(mnu.className)
      , css = mnu.className.replace(/\bopened\b/, '').split(' ')
      , index
    ;

    if (!isopen) { css.push('opened'); }
    for (index = 0; index < css.length; index += 1) {
      css[index] = css[index].replace(/\s/g, '');
    }
    mnu.className = css.join(' ').replace(/^\s*|\s*$/g, '');
  });

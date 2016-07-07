function generateBC(url, separator) {
  var arr = url.replace(/((\/index)?\.(html?|(ph|as)p))|(\?.+|#.+|https?:\/\/|\/$)/g, '').split('/'), link='';
  return arr.map(function(v, i, a) {
    if(a.length === 1) {
      return '<span class="active">HOME</span>'
    } else if(i === a.length -1) {
      return '<span class="active">'+ acronymize(v) +'</span>';   
    } else if(i===0) {
      return '<a href="/">HOME</a>';      
    } else {
      link = link ? link + '/' + v : v; 
      return '<a href="/'+ link +'/">'+ acronymize(v) +'</a>';
    }
  }).join(separator);
}

function acronymize(str) {
  var removeList = ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"],
      re = new RegExp("^(" + removeList.join('|') + ")$"), newStr = '';
  if(str.length > 30) {
    str.split('-').forEach(v => !re.test(v) ? newStr += v[0] : undefined);
    return newStr.toUpperCase();
  } else {
    return str.replace(/-/g, ' ').toUpperCase();;
  }
}
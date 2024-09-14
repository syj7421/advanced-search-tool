document.getElementById('submit-btn').addEventListener('click', function(){
  const query =  document.getElementById('search-box').value;
  const result = searchText(query);
  console.log(result);
})


function searchText(target) {

  if (target.length === 0) {
    return;
  }

  removeSpanInsertedFromLastSearch();

  const textPoolElement = document.getElementById('text-pool');
  const textPoolHTML = textPoolElement.innerHTML;
  let highlightedHTML = '';
  let lastIdx = 0;
  let cnt = 0;

  const regex = new RegExp(target, 'g');
  let match;

  while ((match = regex.exec(textPoolHTML)) !== null) {
    highlightedHTML += textPoolHTML.substring(lastIdx, match.index);

    highlightedHTML += `<span class="highlight span-inserted-from-searching">${match[0]}</span>`;

    lastIdx = match.index + match[0].length;

    cnt++;
  }

  highlightedHTML += textPoolHTML.substring(lastIdx);
  textPoolElement.innerHTML = highlightedHTML;

  return cnt;
}


// remove the span tags inserted from previous search attempts to prevent unnecessary span tag nesting 
function clearSearchHighlights(){
  const spansToRemove = document.getElementsByClassName('span-inserted-from-searching');
  const spansArray = Array.from(spansToRemove);
  spansArray.forEach(span => {
    const parent = span.parentNode;
    while (span.firstChild){
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
  });

}

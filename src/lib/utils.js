export function focusMessageForm() { 
  const element = document.querySelector('.qcw-comment-form textarea'); 
  if(element) element.focus(); 
} 

export function maintainScroll() {
  const element = document.querySelector(".qcw-comments");
  const comment = document.querySelector(".qcw-comments ul li:last-child .qcw-comment-container");
  const top = element.scrollTop;
  const height = element.scrollHeight;
  const commentHeight = parseInt(window.getComputedStyle(element).height);

  if (Math.ceil(element.scrollTop+parseInt(window.getComputedStyle(element).height)) >= element.scrollHeight) {
    scrollIntoElement(comment.id)
    element.scrollTop = element.scrollHeight;
  }
}

export function scrollIntoLastElement(core) {
  if(core.selected.comments.length > 0) {
    const latestCommentId = core
      .selected.comments[core.selected.comments.length - 1].id;
    const element = document.getElementById(latestCommentId);
    if (element) element.scrollIntoView({ block: 'end', behaviour: 'smooth' });
  }
}
export function scrollIntoElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) element.scrollIntoView({ block: 'end', behaviour: 'smooth' });
}
export function scrollIntoElement(core) {
  const latestCommentId = core
    .selected.comments[core.selected.comments.length - 1].id;
  const element = document.getElementById(latestCommentId);
  if (element) element.scrollIntoView({ block: 'end', behaviour: 'smooth' });
}
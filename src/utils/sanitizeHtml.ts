import sanitizeHtml from 'sanitize-html';


export const sanitize = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'form', 'img', 'label', 'button', 'input' ]),
    allowedAttributes: false,
  });
} 

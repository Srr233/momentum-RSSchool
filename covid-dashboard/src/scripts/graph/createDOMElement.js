export default function createDOMElement(elem, className, child, parent, ...dataAttributes) {
  let element = null;
  try {
    element = document.createElement(elem);
  } catch (error) {
    throw new Error('Unable to create HTMLElement! Give a proper tag name');
  }

  if (className) {
    element.classList.add(...className.split(' '));
  }

  if (child && Array.isArray(child)) {
    child.forEach((childElement) => childElement && element.appendChild(childElement));
  } else if (child && typeof child === 'object') {
    element.appendChild(child);
  } else if (child && typeof child === 'string') {
    element.innerHTML = child;
  }

  if (parent) {
    parent.appendChild(element);
  }

  if (dataAttributes.length) {
    dataAttributes.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        element.setAttribute(attrName, '');
      }
      if (attrName.match(/value|id|type|for|src|name|tabindex|href/)) {
        element.setAttribute(attrName, attrValue);
      }
    });
  }
  return element;
}

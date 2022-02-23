export  function checkElementById<T extends HTMLElement>(elementId: string): T {
    let element: T = document.getElementById(elementId) as T;
    if(!element) throw new Error([
        'Could not initialize the view. ',
        `The [${ elementId }]' was not found. `,
        'Was the template changed?'
    ].join(''));

    return element;
}

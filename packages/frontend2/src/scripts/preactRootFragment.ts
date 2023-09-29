// See: https://gist.github.com/developit/f4c67a2ede71dc2fab7f357f39cff28c#preact-root-fragment-partial-root-rendering-for-preact
/**
 * A Preact 11+ implementation of the `replaceNode` parameter from Preact 10.
 *
 * This creates a "Persistent Fragment" (a fake DOM element) containing one or more
 * DOM nodes, which can then be passed as the `parent` argument to Preact's `render()` method.
 */
export function createRootFragment(parent: any, replaceNode: any): any {
  replaceNode = [].concat(replaceNode)
  var s = replaceNode[replaceNode.length - 1].nextSibling
  function insert(c: any, r: any) {
    parent.insertBefore(c, r || s)
  }
  return (parent.__k = {
    nodeType: 1,
    parentNode: parent,
    firstChild: replaceNode[0],
    childNodes: replaceNode,
    insertBefore: insert,
    appendChild: insert,
    removeChild: function (c: any) {
      parent.removeChild(c)
    },
  })
}

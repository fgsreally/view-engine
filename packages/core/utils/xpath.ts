export function getSameLevelName(node: Node) {
  if (node.previousSibling) {
    let name = "",
      count = 1,
      nodeName = node.nodeName,
      sibling = node.previousSibling;
    while (sibling) {
      if (
        sibling.nodeType == 1 &&
        sibling.nodeType === node.nodeType &&
        sibling.nodeName
      ) {
        if (nodeName == sibling.nodeName) {
          name += `[${++count}]`;
        } else {
          count = 1;

          name += "/" + sibling.nodeName.toLowerCase();
        }
      }
      sibling = sibling.previousSibling as ChildNode;
    }
    return `[${count}]`;
  } else {
    return "";
  }
}

// XPath解释器
export let Interpreter = (function () {
  return function traverse(node: Node, rwrap: Node): string[] {
    // 路径数组
    let path: string[] = [],
      // 如果不存在容器节点，默认为document
      wrap = rwrap || document;
    // 如果当前节点等于容器节点
    if (node === wrap) {
      if (wrap.nodeType == 1) {
        path.push(wrap.nodeName.toLowerCase());
      }
      return path;
    }
    // 如果当前节点的父节点不等于容器节点
    if (node.parentNode !== wrap) {
      // 对当前节点的父节点执行遍历操作
      path = traverse(node.parentNode as Node, wrap);
    }

    let siblingsNames = getSameLevelName(node);
    if (node.nodeType == 1) {
      path.push(node.nodeName.toLowerCase() + siblingsNames);
    }
    // 返回最终的路径数组结果
    return path;
  };
})();

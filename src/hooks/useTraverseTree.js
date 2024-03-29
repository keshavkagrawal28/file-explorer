const useTraverseTree = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, itemId) => {
    if (tree.id === itemId) {
      return {};
    }

    let latestNode = [];
    latestNode = tree.items
      .map((obj) => {
        return deleteNode(obj, itemId);
      })
      .filter((obj) => obj.id);
    return { ...tree, items: latestNode };
  };

  const renameNode = (tree, name, itemId) => {
    if (tree.id === itemId) {
      tree.name = name;
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return renameNode(obj, name, itemId);
    });
    return { ...tree, items: latestNode };
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;

import { useState } from 'react';
import explorer from './data/folderData';
import './App.css';
import Folder from './components/Folder';
import useTraverseTree from './hooks/useTraverseTree';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (itemId) => {
    const finalTree = deleteNode(explorerData, itemId);
    setExplorerData(finalTree);
  };

  const handleRenameNode = (name, itemId) => {
    const finalTree = renameNode(explorerData, name, itemId);
    setExplorerData(finalTree);
  };

  return (
    <div className='App'>
      <Folder
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
      ></Folder>
    </div>
  );
}

export default App;

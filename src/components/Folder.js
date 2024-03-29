import { useState } from 'react';

function Folder({
  explorer,
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
}) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [renameInput, setRenameInput] = useState(false);

  const handleNewFolder = (e, isFolder) => {
    setExpand(true);
    e.stopPropagation();

    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onDelete = (e) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${
          explorer.isFolder ? 'folder' : 'file'
        }`
      )
    ) {
      handleDeleteNode(explorer.id);
    }
    e.stopPropagation();
  };

  const handleRename = (e) => {
    setRenameInput(true);
    e.stopPropagation();
  };

  const onRename = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleRenameNode(e.target.value, explorer.id);
      setRenameInput(false);
    }
  };

  if (explorer.id && explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className='folder' onClick={() => setExpand(!expand)}>
          <div className={renameInput ? 'inputContainer' : ''}>
            <span>🗂️</span>
            {!renameInput && <span>{explorer.name}</span>}
            {renameInput && (
              <input
                type='text'
                onKeyDown={onRename}
                onBlur={() => setRenameInput(false)}
                className='inputContainer__input'
                autoFocus
              ></input>
            )}
          </div>
          {!renameInput && (
            <div>
              <button onClick={(e) => handleNewFolder(e, true)}>
                Folder +
              </button>
              <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
              <button onClick={(e) => handleRename(e)}>Rename</button>
              <button onClick={(e) => onDelete(e)}>Delete</button>
            </div>
          )}
        </div>
        <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
          {showInput.visible && (
            <div className='inputContainer'>
              <span>{showInput.isFolder ? '🗂️' : '📄'}</span>
              <input
                type='text'
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className='inputContainer__input'
                autoFocus
              ></input>
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                key={exp.id}
                explorer={exp}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else if (explorer.id) {
    return (
      <div className='file'>
        <div>
          <span>📄</span>
          {!renameInput && <span>{explorer.name}</span>}
        </div>
        {!renameInput && (
          <div>
            <button onClick={(e) => handleRename(e)}>Rename</button>
            <button onClick={(e) => onDelete(e)}>Delete</button>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}

export default Folder;

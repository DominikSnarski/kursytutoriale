import React from 'react';

function Tags(props) {
  const { tag, handleCloseClick } = props;

  return (
    <div>
      <div
        style={{
          backgroundColor: '#348DA6',
          position: 'relative',
          padding: '0.25rem',
          marginTop: '1rem',
        }}
      >
        <span>{tag}</span>
        <button
          className="Close"
          style={{
            position: 'absolute',
            right: '0',
            marginRight: '1rem',
            marginBottom: '1rem',
            fontSize: '0.75rem',
          }}
          onClick={() => handleCloseClick(tag)}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Tags;

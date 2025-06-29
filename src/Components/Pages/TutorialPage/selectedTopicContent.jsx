import React from 'react';
import './selectedTopicContent.css'; // Optional: if you want to isolate styles

export default function SelectedTopicContent({ contentBlocks }) {
    
  const renderBlock = (block) => {
    switch (block.type) {
      case 'heading':
        return <h2 className='content-heading' key={block.id}>{block.value}</h2>;
      case 'paragraph':
        return <p className='content-para' key={block.id}>{block.value}</p>;
      case 'image':
        return <img key={block.id} src={block.value} alt={block.extra?.alt || 'Image'} className='content-image' />;
      case 'code':
        return (
          <pre key={block.id} style={{ background: '#f4f4f4', padding: '1rem' }}>
            <code>{block.value}</code>
          </pre>
        );
      case 'video':
        return (
          <iframe
            key={block.id}
            src={block.value}
            title="Video"
            className='content-video'
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="content-container">
      {contentBlocks && contentBlocks.length > 0 ? (
        contentBlocks.map(renderBlock)
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
}

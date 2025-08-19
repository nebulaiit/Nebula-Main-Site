import React from 'react';
import './selectedTopicContent.css';
import { useSelector } from 'react-redux';

export default function SelectedTopicContent({ contentBlocks }) {
  const darkMode = useSelector((state) => state.darkMode.enabled);

  console.log(contentBlocks);

  return (
    <div className={`content-container ${darkMode ? 'dark' : ''}`}>
      {contentBlocks && contentBlocks.length > 0 ? (
        contentBlocks.map((block) => (
          <div key={block.id} className="content-block">
            {/* Title */}
            {/* {<h2 className="content-heading">{block.title}</h2>} */}

            {/* Render contentHtml safely */}
            {block.contentHtml && (
              <div
                className="content-html"
                dangerouslySetInnerHTML={{ __html: block.contentHtml }}
              />
            )}

            {/* Render images if available */}
            {block.imageUrls && block.imageUrls.length > 0 && (
              <div className="content-images">
                {block.imageUrls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`content-img-${i}`}
                    className="content-image"
                  />
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
}

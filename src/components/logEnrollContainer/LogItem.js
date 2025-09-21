import React from 'react';

// log 데이터와 onDelete 함수를 props로 받아옵니다.
function LogItem({ log, onDelete }) {

  let date = log.date.split("/");
  date = date[2] + "년 " + date[1] + "월 " + date[0] + "일 ";
  
  return (
    <div className="log-item">
      <div className="log-details">
        <h3 className="log-subject">{log.subject}</h3>
        <p className="log-content">{log.content}</p>
        {/* 👇 태그 표시를 위한 UI를 여기에 추가합니다. 👇 */}
        {log.tags && log.tags.length > 0 && (
          <div className="log-tags-container">
            {log.tags.map(tag => (
              <span key={tag} className="tag-pill-display">#{tag}</span>
            ))}
          </div>
        )}
        <div className="log-meta">
          <span className="log-time">{log.time}분</span>
          <span className="log-date">{date}</span>
        </div>
      </div>
      <button onClick={() => onDelete(log.id)} className="delete-button">
        삭제
      </button>
    </div>
  );
}

export default LogItem;
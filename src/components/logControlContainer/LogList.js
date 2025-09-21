import React from 'react';
import LogItem from '../logEnrollContainer/LogItem'; // LogItem 컴포넌트를 불러옵니다.

// logs 배열과 onDelete 함수를 props로 받아옵니다.
function LogList({ logs, onDelete }) {
  if (logs.length === 0) {
    return <p className="empty-message">첫 공부 기록을 남겨보세요!</p>;
  }

  return (
    <div className="log-list">
      {logs.map(log => (
        <LogItem key={log.id} log={log} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default LogList;
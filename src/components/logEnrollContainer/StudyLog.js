import LogForm from './LogForm'; // LogForm 컴포넌트 import
import '../../static/StudyLog.css';

// 부모로부터 태그 관련 props를 받아 LogForm으로 전달
function StudyLog({ onAddLog, selectedTags, onTagDeselect }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <h3>새 학습 기록</h3>
      </header>
      <main>
        <LogForm 
          onAddLog={onAddLog} 
          selectedTags={selectedTags} 
          onTagDeselect={onTagDeselect} 
        />
      </main>
    </div>
  );
}

export default StudyLog;
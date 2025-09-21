import React, { useState } from 'react';
import ReactDatePicker from '../../util/ReactDatePicker';

// 오늘 날짜를 YYYY-MM-DD 형식으로 가져오는 함수
const getTodayDate = () => {
  const today = new Date();
  // toISOString()은 'YYYY-MM-DDTHH:mm:ss.sssZ' 형식이므로 앞 10자리만 잘라냅니다.
  return today.toISOString().slice(0, 10);
};

function LogForm({ onAddLog, selectedTags, onTagDeselect }) {
  const [logInput, setLogInput] = useState({
    subject: '',
    content: '',
    time: '',
    date: getTodayDate(),
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInput({
      ...logInput,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사에 date 필드 추가
    if (!logInput.subject || !logInput.content || !logInput.time || !logInput.date) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    // 부모 컴포넌트로 날짜 데이터까지 포함하여 전달
    onAddLog(logInput);

    // 입력 필드 초기화 시 date는 다시 오늘 날짜로 설정
    setLogInput({
      subject: '',
      content: '',
      time: '',
      date: getTodayDate()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="log-form">
      {/* 날짜 입력 필드 */}
      <div className="form-group">
        <ReactDatePicker />
      </div>
      <input
        name="subject"
        type="text"
        placeholder="학습 주제"
        value={logInput.subject}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="학습 내용"
        value={logInput.content}
        onChange={handleChange}
      />
      <input
        name="time"
        type="number"
        placeholder="공부 시간 (분 단위)"
        value={logInput.time}
        onChange={handleChange}
      />

      {/* 선택된 태그를 표시하는 부분만 남깁니다. */}
      <div className="tag-section">
        <label>선택된 태그</label>
        <div className="selected-tags-container">
          {selectedTags.map(tag => (
            <span key={tag} className="tag-pill">
              {tag}
              <button type="button" onClick={() => onTagDeselect(tag)}>×</button>
            </span>
          ))}
        </div>
      </div>

      <button type="submit">기록하기</button>
    </form>
  );
}

export default LogForm;
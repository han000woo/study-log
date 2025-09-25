import { React, useState, useEffect } from "react";
import StudyLog from "../components/logEnrollContainer/StudyLog";
import DisplayLog from "../components/logControlContainer/DisplayLog";
import StudyTimeLog from "../components/logTimeContainer/StudyTimeLog";
import TagManager from "../components/logEnrollContainer/TagManager";
import { getTodayLogs, createLog, deleteLog } from "../api/logs";
import { getTags, createTag } from "../api/tags";
import "../static/StudyLogPage.css";

function StudyLogPage() {
  const [logs, setLogs] = useState([]);
  const [allUserTags, setAllUserTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // const [logData, tagData] = await Promise.all([
        //   getTodayLogs(),
        //   getTags(),
        // ]);
        const [tagData] = await Promise.all([getTags()]);
        // setLogs(logData);

        console.log(tagData);

        setAllUserTags(tagData.data);
      } catch (err) {
        setError("학습 기록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  const handleTagSelect = (tag) => {
    if (!selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagDeselect = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagToRemove.id));
  };

  // 3. 새 태그 추가: API 호출 후 상태 업데이트
  const handleAddNewTag = async (newTagName) => {
    if (newTagName && !allUserTags.find((t) => t.name === newTagName)) {
      try {
        // API를 호출하여 서버에 새 태그를 생성합니다.
        const { success, data } = await createTag({ tagName: newTagName });
        // 서버로부터 받은 새 태그 객체(id 포함)로 상태를 업데이트합니다.
        setAllUserTags([...allUserTags, data]);
        handleTagSelect(data); // 새로 만든 태그는 바로 선택되도록 함
      } catch (err) {
        alert("태그 생성에 실패했습니다.");
      }
    }
  };

  // 4. 로그 추가: API 호출 후 상태 업데이트
  const handleAddLog = async (logData) => {
    try {
      const tagIds = selectedTags.map((tag) => tag.id);
      const newLogPayload = {
        subject: logData.subject,
        content: logData.content,
        studyTime: parseInt(logData.time, 10), // 숫자로 변환
        studyDate: logData.date,
        tagIds: tagIds,
      };

      // API를 호출하여 서버에 새 로그를 생성합니다.
      const newLogFromServer = await createLog(newLogPayload);

      // 서버로부터 받은 새 로그 객체로 상태를 업데이트합니다.
      setLogs([newLogFromServer, ...logs]);
      setSelectedTags([]); // 선택된 태그 초기화
    } catch (err) {
      alert("로그 기록에 실패했습니다.");
    }
  };

  // 5. 로그 삭제: API 호출 후 상태 업데이트
  const handleDeleteLog = async (idToDelete) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        // API를 호출하여 서버에서 로그를 삭제합니다.
        await deleteLog(idToDelete);
        // 성공 시 화면(상태)에서도 해당 로그를 제거합니다.
        setLogs(logs.filter((log) => log.id !== idToDelete));
      } catch (err) {
        alert("로그 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <div id="study-log-contents">
      <div id="log-enroll-container">
        {/* 자식 컴포넌트에 수정된 함수들을 전달합니다. */}
        <StudyLog
          onAddLog={handleAddLog}
          selectedTags={selectedTags}
          onTagDeselect={handleTagDeselect}
        />
        <TagManager
          allUserTags={allUserTags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onTagDeselect={handleTagDeselect}
          onAddNewTag={handleAddNewTag}
        />
      </div>
      <div>
        <StudyTimeLog logs={logs} />
        <DisplayLog logs={logs} onDelete={handleDeleteLog} />
      </div>
    </div>
  );
}

export default StudyLogPage;

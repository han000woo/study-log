import { React, useState } from "react";
import StudyLog from "../components/logEnrollContainer/StudyLog";
import DisplayLog from "../components/logControlContainer/DisplayLog";
import StudyTimeLog from "../components/logTimeContainer/StudyTimeLog";
import TagManager from "../components/logEnrollContainer/TagManager";
import '../static/StudyLogPage.css'

function StudyLogPage() {

    // 상태(logs)와 상태 변경 함수를 여기서 선언
    const [logs, setLogs] = useState([]);

    // --- 1. 태그 관련 상태를 StudyLogPage로 끌어올립니다. ---
    const [allUserTags, setAllUserTags] = useState(['React', 'Spring', 'JavaScript', '알고리즘']);
    const [selectedTags, setSelectedTags] = useState([]);

    // --- 2. 태그 관련 핸들러 함수들도 여기서 정의합니다. ---
    const handleTagSelect = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleTagDeselect = (tagToRemove) => {
        setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    };

    const handleAddNewTag = (newTag) => {
        if (newTag && !allUserTags.includes(newTag)) {
            setAllUserTags([...allUserTags, newTag]);
            handleTagSelect(newTag); // 새로 만든 태그는 바로 선택되도록 함
        }
    };


    // 2. 로그를 추가하는 함수
    const addLog = (logData) => {
        const newLog = {
            id: Date.now(),
            ...logData,
            date: new Date().toLocaleDateString(), // 이 로직은 이전과 동일
            tags: selectedTags,
        };
        setLogs([newLog, ...logs]);
        setSelectedTags([]);
    };

    // 3. 로그를 삭제하는 함수
    const deleteLog = (idToDelete) => {
        setLogs(logs.filter(log => log.id !== idToDelete));
    };

    return (
        <div id="study-log-contents">
            <div id="log-enroll-container">
                <StudyLog
                    onAddLog={addLog}
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
                <DisplayLog logs={logs} onDelete={deleteLog} />
            </div>
        </div>
    )
}

export default StudyLogPage;
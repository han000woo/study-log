import React from "react";
import LogList from "./LogList";

function DisplayLog({ logs, onDelete }) {
    // 여기에 있던 deleteLog 함수는 부모에게서 받아오므로 삭제합니다.

    return (
        <div className="app-container display-container">
            <header className="app-header">
                <h3>학습 기록 목록</h3>
            </header>

            <main>
                {/* 부모에게 받은 logs와 onDelete를 LogList에 그대로 전달합니다. */}
                <LogList logs={logs} onDelete={onDelete} />
            </main>
        </div>
    )
}

export default DisplayLog;
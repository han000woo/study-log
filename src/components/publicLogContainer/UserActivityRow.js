import React, { useMemo, useState } from 'react';
import '../../static/UserActivityRow.css'

// 학습 시간에 따라 색상 클래스를 반환하는 함수
const getColorClass = (time) => {
    if (time === 0) return 'level-0';
    if (time <= 30) return 'level-1';
    if (time <= 60) return 'level-2';
    if (time <= 120) return 'level-3';
    return 'level-4';
};

function UserActivityRow({ rank, user, year, month }) {
    // 1. GPT 요약 내용을 저장할 state (초기값은 null)
    const [summary, setSummary] = useState(null);
    // 2. 요약 생성 중 로딩 상태를 관리할 state
    const [isLoading, setIsLoading] = useState(false);

    // --- 요약 생성 핸들러 함수 추가 ---
    const handleGenerateSummary = () => {
        setIsLoading(true); // 로딩 시작

        // 실제로는 여기서 백엔드 API를 호출합니다.
        // 지금은 1.5초 뒤에 임시 데이터를 보여주는 것으로 대체합니다.
        setTimeout(() => {
            setSummary(user.info.gptSummary); // props로 받은 요약 데이터를 state에 저장
            setIsLoading(false); // 로딩 종료
        }, 1500);
    };

    // 해당 유저의 일별 학습 통계 계산
    const dailyStats = useMemo(() => {
        const stats = {};
        user.logs.forEach(log => {
            const time = parseInt(log.time, 10) || 0;
            const day = parseInt(log.date.split('/')[0], 10);
            stats[day] = (stats[day] || 0) + time;
        });
        return stats;
    }, [user.logs]);

    // 해당 월의 총 일수 계산
    const daysInMonth = new Date(year, month, 0).getDate();
    const daySquares = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // UserActivityRow.js의 return 부분을 아래 코드로 교체해주세요.
    return (
        <div className="user-activity-row">
            {/* --- 1. 프로필 섹션 --- */}
            <div className="user-profile-header">
                <img src={user.info.userImage} alt={user.info.userName} />

                <div className="user-info">
                    <span className="user-name">{user.info.userName}</span>
                </div>
            </div>

            {/* --- 2. 컨텐츠 섹션 (미니 달력 + GPT 요약) --- */}
            <div className="user-content-area">
                <div className='calendar-container'>
                    <div className="mini-calendar">
                        {daySquares.map(day => {
                            const totalTime = dailyStats[day] || 0;
                            return (
                                <div
                                    key={day}
                                    className={`day-square ${getColorClass(totalTime)}`}
                                    title={`${year}-${month}-${day}: ${totalTime}분 학습`}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="summary-section">
                    {summary ? (
                        <div className="gpt-summary">
                            <div className="summary-title">
                                GPT 월간 학습 요약
                            </div>
                            <p className="summary-text">{summary}</p>
                        </div>
                    ) : (
                        <button
                            onClick={handleGenerateSummary}
                            disabled={isLoading}
                            className="summary-button"
                        >
                            {/* <span className="material-symbols-outlined">smart_toy</span> */}
                            {isLoading ? '요약 생성 중...' : 'GPT 요약'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserActivityRow;
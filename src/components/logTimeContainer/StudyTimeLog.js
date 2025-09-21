import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import '../../static/StudyTimeLog.css'

// formatTime 함수는 변경사항 없습니다.
const formatTime = (totalMinutes) => {
    if (isNaN(totalMinutes) || totalMinutes === 0) {
        return '0분';
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let result = '';
    if (hours > 0) {
        result += `${hours}시간 `;
    }
    if (minutes > 0) {
        result += `${minutes}분`;
    }
    return result.trim();
};


function StudyTimeLog({ logs }) {

    // 1. 어제 학습 시간을 저장할 state를 추가합니다.
    const [yesterdayTime, setYesterdayTime] = useState(0);

    // 2. 컴포넌트가 마운트될 때 서버에 데이터를 요청하는 useEffect를 추가합니다.
    useEffect(() => {
        const fetchYesterdayTime = async () => {
            try {
                // 실제 백엔드 API 엔드포인트로 변경해야 합니다.
                // 어제의 총 학습 시간(분 단위)을 반환한다고 가정합니다.
                const response = await axios.get('/api/logs/stats/yesterday');
                setYesterdayTime(response.data.totalTime || 0);
            } catch (error) {
                console.error("Failed to fetch yesterday's study time:", error);
                // 에러가 발생해도 앱이 멈추지 않도록 기본값(0)을 유지합니다.
            }
        };

        fetchYesterdayTime();
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 합니다.

    const timeStats = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        let todayTime = 0;
        let weekTime = 0;
        let monthTime = 0;

        logs.forEach(log => {
            // 👇 여기가 수정된 부분입니다! 👇
            // "DD/MM/YYYY" 형식의 문자열을 분해합니다.
            const parts = log.date.split('/'); // ex: ["19", "09", "2025"]
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // JS의 Date 객체에서 월은 0부터 시작합니다 (0 = 1월).
            const year = parseInt(parts[2], 10);

            // 분해한 값으로 안전하게 Date 객체를 생성합니다.
            const logDate = new Date(year, month, day);
            logDate.setHours(0, 0, 0, 0);

            // Date 객체가 유효한지 확인합니다. (선택 사항이지만 좋은 습관입니다)
            if (isNaN(logDate.getTime())) {
                return; // 유효하지 않은 날짜는 건너뜁니다.
            }

            const logMinutes = parseInt(log.time, 10) || 0;

            // 아래 계산 로직은 이전과 동일합니다.
            if (logDate.getTime() === today.getTime()) {
                todayTime += logMinutes;
            }

            if (logDate >= startOfWeek) {
                weekTime += logMinutes;
            }

            if (logDate >= startOfMonth) {
                monthTime += logMinutes;
            }
        });

        return { today: todayTime, week: weekTime, month: monthTime };
    }, [logs]);

    return (
        <div className="app-container">
            <header className="time-log-header">
                <h3>학습 통계</h3>
            </header>
            <main className="time-stats-wrapper">
                {/* 3. 어제 학습 시간 UI를 추가하고, 특별한 className을 부여합니다. */}
                <div className="time-stat-item yesterday-stat">
                    <span className="label">어제</span>
                    <span className="time">{formatTime(yesterdayTime)}</span>
                </div>
                <div className="time-stat-item">
                    <span className="label">오늘</span>
                    <span className="time">{formatTime(timeStats.today)}</span>
                </div>
                <div className="time-stat-item">
                    <span className="label">이번 주</span>
                    <span className="time">{formatTime(timeStats.week)}</span>
                </div>
                <div className="time-stat-item">
                    <span className="label">이번 달</span>
                    <span className="time">{formatTime(timeStats.month)}</span>
                </div>
            </main>
        </div>
    );
}

export default StudyTimeLog;
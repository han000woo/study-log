import React, { useState, useMemo } from 'react';
import UserActivityRow from '../components/publicLogContainer/UserActivityRow';
import Ranking from '../components/publicLogContainer/Ranking';
import '../static/PublicLogsPage.css'

// ... (상단에 수정된 mockLogs 데이터 붙여넣기) ...
// ... (generateYearOptions, monthOptions 함수는 그대로) ...

// ... import 구문 ...

// 사용자 정보를 포함한 새로운 임시 데이터
const mockLogs = [
    // User 1: 김민준
    { id: 1, userId: 'user1', userName: '김민준', userImage: 'https://randomuser.me/api/portraits/men/75.jpg', subject: 'React 라우팅', content: '...', time: '90', date: '19/09/2025' },
    { id: 2, userId: 'user1', userName: '김민준', userImage: 'https://randomuser.me/api/portraits/men/75.jpg', subject: 'CSS', content: '...', time: '60', date: '18/09/2025' },
    { id: 7, userId: 'user1', userName: '김민준', userImage: 'https://randomuser.me/api/portraits/men/75.jpg', subject: 'React 최적화', content: '...', time: '80', date: '17/09/2025' },
    { id: 8, userId: 'user1', userName: '김민준', userImage: 'https://randomuser.me/api/portraits/men/75.jpg', subject: '알고리즘', content: '...', time: '120', date: '15/09/2025' },

    // User 2: 이수아
    { id: 3, userId: 'user2', userName: '이수아', userImage: 'https://randomuser.me/api/portraits/women/75.jpg', subject: 'Spring Boot', content: '...', time: '120', date: '18/09/2025' },
    { id: 4, userId: 'user2', userName: '이수아', userImage: 'https://randomuser.me/api/portraits/women/75.jpg', subject: 'Context API', content: '...', time: '75', date: '25/08/2025' },
    { id: 9, userId: 'user2', userName: '이수아', userImage: 'https://randomuser.me/api/portraits/women/75.jpg', subject: 'JPA', content: '...', time: '100', date: '16/09/2025' },

    // User 3: 박서준
    { id: 5, userId: 'user3', userName: '박서준', userImage: 'https://randomuser.me/api/portraits/men/76.jpg', subject: 'Axios', content: '...', time: '45', date: '22/08/2025' },
    { id: 6, userId: 'user3', userName: '박서준', userImage: 'https://randomuser.me/api/portraits/men/76.jpg', subject: '알고리즘', content: '...', time: '150', date: '19/09/2025' },
];

// 헬퍼 함수들
const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
        years.push(currentYear - i);
    }
    return years;
};
const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);


function PublicLogsPage() {
    const [logs] = useState(mockLogs); // 임시 데이터 사용
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    // 선택된 년/월에 따라 로그를 필터링하고, 사용자별로 그룹핑합니다.
    const { usersData, ranking } = useMemo(() => {
        const filteredLogs = logs.filter(log => {
            const parts = log.date.split('/'); // "DD/MM/YYYY"
            const logYear = parseInt(parts[2], 10);
            const logMonth = parseInt(parts[1], 10);
            return logYear === parseInt(selectedYear) && logMonth === parseInt(selectedMonth);
        });

        const groupedData = filteredLogs.reduce((acc, log) => {
            const { userId, userName, userImage } = log;
            if (!acc[userId]) {
                acc[userId] = {
                    info: { userId, userName, userImage },
                    logs: [],
                };
            }
            acc[userId].logs.push(log);
            return acc;
        }, {});
        // 👇 1. 각 유저의 총 학습 시간을 계산하고 순위를 매깁니다.
        const rankedUsers = Object.values(groupedData).map(user => {
            const totalTime = user.logs.reduce((sum, log) => sum + (parseInt(log.time, 10) || 0), 0);
            return { ...user, totalTime };
        }).sort((a, b) => b.totalTime - a.totalTime); // totalTime 기준으로 내림차순 정렬

        // GPT 요약 데이터 추가 (기존 로직)
        rankedUsers.forEach(user => {
            const userId = user.info.userId;
            if (userId === 'user1') {
                user.info.gptSummary = "이번 달에는 React의 라우팅과 최적화 등 심화 개념에 집중했으며...rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr";
            } else if (userId === 'user2') {
                user.info.gptSummary = "Spring Boot와 JPA를 중심으로 백엔드 개발 역량을 쌓는 데 주력했습니다...";
            } else if (userId === 'user3') {
                user.info.gptSummary = "알고리즘 문제 해결에 가장 많은 시간을 할애했으며...";
            } else {
                user.info.gptSummary = "다양한 주제를 꾸준히 학습하며 지식을 넓혀가고 있습니다.";
            }
        });

        return { usersData: groupedData, ranking: rankedUsers };

    }, [logs, selectedYear, selectedMonth]);

    const userIds = Object.keys(usersData);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>월간 학습 현황</h1>
            </header>

            <div className="filter-controls">
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    {generateYearOptions().map(year => <option key={year} value={year}>{year}년</option>)}
                </select>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    {monthOptions.map(month => <option key={month} value={month}>{month}월</option>)}
                </select>
            </div>

            {/* 👇 2. 랭킹 컴포넌트를 새로 추가합니다. */}
            {ranking.length > 0 && <Ranking topUsers={ranking.slice(0, 3)} />}
            <main className="user-activity-list">
                {ranking.length > 0 ? (
                    // 👇 3. 정렬된 ranking 배열을 기준으로 목록을 렌더링합니다.
                    ranking.map((user, index) => (
                        <UserActivityRow
                            key={user.info.userId}
                            rank={index + 1} // 순위 정보 전달
                            user={user}
                            year={selectedYear}
                            month={selectedMonth}
                        />
                    ))
                ) : (
                    <p className="empty-message">해당 기간의 학습 기록이 없습니다.</p>
                )}
            </main>
        </div>
    );
}

export default PublicLogsPage;
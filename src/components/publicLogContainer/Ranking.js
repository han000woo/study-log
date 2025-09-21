import React from 'react';
import '../../static/Ranking.css'

// 분(minutes)을 'X시간 Y분' 형식으로 변환하는 함수
const formatTime = (totalMinutes) => {
  if (totalMinutes === 0) return '0분';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours > 0 ? `${hours}시간 ` : ''}${minutes}분`;
};

function Ranking({ topUsers }) {
    return (
      <div className="ranking-container">
        <h2>🏆 월간 학습 랭킹</h2>
        <div className="ranking-list">
          {topUsers.map((user, index) => (
            // 각 아이템에 순위에 맞는 클래스를 추가합니다 (예: rank-order-1, rank-order-2)
            <div key={user.info.userId} className={`rank-item rank-order-${index + 1}`}>
              <span className="rank-medal">{['🥇', '🥈', '🥉'][index]}</span>
              <img src={user.info.userImage} alt={user.info.userName} className="rank-user-image" />
              <span className="rank-user-name">{user.info.userName}</span>
              <span className="rank-time">{formatTime(user.totalTime)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default Ranking;
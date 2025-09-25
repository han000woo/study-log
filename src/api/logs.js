import apiClient from "./index"; // 설정된 axios 인스턴스

/**
 * 모든 학습 기록을 조회합니다.
 */
export const getLogs = async () => {
  try {
    const response = await apiClient.get("/logs");
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

/**
 * 오늘의 내 학습 기록을 조회합니다.
 */
export const getTodayLogs = async () => {
  try {
    const response = await apiClient.get("/tdlogs");
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

/**
 * 새로운 학습 기록을 생성합니다.
 * @param {object} logData - { subject, content, studyTime, studyDate, tagIds }
 * tagIds는 태그 ID들의 배열입니다. 예: [1, 2, 5]
 */
export const createLog = async (logData) => {
  try {
    const response = await apiClient.post("/logs", logData);
    return response.data;
  } catch (error) {
    console.error("Error creating log:", error);
    throw error;
  }
};

/**
 * 특정 학습 기록을 수정합니다.
 * @param {number} logId - 수정할 로그의 ID
 * @param {object} updatedData - 수정할 데이터 { subject, content, studyTime, tagIds }
 */
export const updateLog = async (logId, updatedData) => {
  try {
    const response = await apiClient.put(`/logs/${logId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating log ${logId}:`, error);
    throw error;
  }
};

/**
 * 특정 학습 기록을 삭제합니다.
 * @param {number} logId - 삭제할 로그의 ID
 */
export const deleteLog = async (logId) => {
  try {
    await apiClient.delete(`/logs/${logId}`);
  } catch (error) {
    console.error(`Error deleting log ${logId}:`, error);
    throw error;
  }
};

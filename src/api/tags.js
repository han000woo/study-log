import apiClient from "./index"; // 설정된 axios 인스턴스

/**
 * 현재 로그인한 유저의 모든 태그를 조회합니다.
 */
export const getTags = async () => {
  try {
    const response = await apiClient.get("/tags");
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

/**
 * 새로운 태그를 생성합니다.
 * @param {object} tagData - { tagName }
 */
export const createTag = async (tagData) => {
  try {
    const response = await apiClient.post("/tags/create", tagData);
    return response.data;
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
};

/**
 * 특정 태그를 수정합니다.
 * @param {number} tagId - 수정할 태그의 ID
 * @param {object} updatedData - { tagName }
 */
export const updateTag = async (tagId, updatedData) => {
  try {
    const response = await apiClient.put(`/tags/${tagId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating tag ${tagId}:`, error);
    throw error;
  }
};

/**
 * 특정 태그를 삭제합니다.
 * @param {number} tagId - 삭제할 태그의 ID
 */
export const deleteTag = async (tagId) => {
  try {
    await apiClient.delete(`/tags/${tagId}`);
  } catch (error) {
    console.error(`Error deleting tag ${tagId}:`, error);
    throw error;
  }
};

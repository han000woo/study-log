import React, { useState } from 'react';
import '../../static/TagManager.css'

function TagManager({ allUserTags, selectedTags, onTagSelect, onTagDeselect, onAddNewTag }) {
    const [newTagInput, setNewTagInput] = useState('');

    const handleAddClick = () => {
        onAddNewTag(newTagInput);
        setNewTagInput('');
    };

    return (
        <div className='app-container'>
            <div className="tag-manager-container">
                <h4>태그 관리</h4>
                <div className="add-new-tag">
                    <input
                        type="text"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        placeholder="새 태그 입력"
                    />
                    <button type="button" onClick={handleAddClick}>추가</button>
                </div>
                <div className="existing-tags">
                    {allUserTags.map(tag => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                            <button
                                type="button"
                                key={tag}
                                className={`tag-option ${isSelected ? 'selected' : ''}`}
                                onClick={() => isSelected ? onTagDeselect(tag) : onTagSelect(tag)}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TagManager;
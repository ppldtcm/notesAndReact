import { useState } from 'react';

export default function TagCheckbox({ onTagChange }) {
    const tags = [
        { id: 1, label: 'no tag' },
        { id: 2, label: 'work' },
        { id: 3, label: 'homework' },
    ];

    const [selectedTags, setSelectedTags] = useState([]);

    const handleChange = (tagName) => {
        let updatedTags;
        if (selectedTags.includes(tagName)) {
            updatedTags = selectedTags.filter(name => name !== tagName);
        } else {
            updatedTags = [...selectedTags, tagName];
        }

        setSelectedTags(updatedTags);
        onTagChange(updatedTags.join(', ')); // Передаем строку с тегами через запятую
    };

    return (
        <div>
            {tags.map(tag => (
                <div key={tag.id}>
                    <input
                        type="checkbox"
                        id={`tag-${tag.id}`}
                        onChange={() => handleChange(tag.label)}
                        checked={selectedTags.includes(tag.label)}
                    />
                    <label htmlFor={`tag-${tag.id}`}>{tag.label}</label>
                </div>
            ))}
        </div>
    );
}

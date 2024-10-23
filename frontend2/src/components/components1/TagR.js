import { useEffect, useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown'

export default function TagR({ selectedTag, onTagChange }) {
    const handleTagChange = (event) => {
        onTagChange(event.target.value); // передаем выбранный тег обратно в родительский компонент
    };

    return (
        <select name="Note[tag]" value={selectedTag} onChange={handleTagChange}>
            <option value="no tag">no tag</option>
            <option value="work">work</option>
            <option value="homework">homework</option>
            <option value="shoppinglist">shoppinglist</option>
            <option value="school">school</option>
            <option value="etc">etc</option>
        </select>
    );
}
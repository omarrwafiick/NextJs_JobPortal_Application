'use client';
import { useState } from 'react';
import TagsSelector from '../tags-selector';

export default function JobPostForm({ tags }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/job', {
      method: 'POST',
      body: JSON.stringify({ title: 'Dev', tags: selectedTags }),
    });
    const data = await res.json();
    console.log('Job created:', data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TagsSelector
        name="Select Required Skills"
        data={tags}
        value={selectedTags}
        onChange={setSelectedTags}
      />
      <button type="submit">Post Job</button>
    </form>
  );
}


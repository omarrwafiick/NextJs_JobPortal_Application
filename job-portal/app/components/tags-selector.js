'use client';

export default function TagsSelector({ name, data, value, onChange }) {
  return (
    <div>
      <label>{name}</label>
      <select
        multiple
        value={value}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions, opt => opt.value);
          onChange(selected);
        }}
      >
        {data.map(([label, value]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}

// [DB: Tags] 
//    ↓ (Server-side fetch using Prisma)
// [Server Component] 
//    ↓ (Pass tags as props)
// [Client Component: TagsSelector] 
//    ↓ (User selects tags)
// [Client State: selectedTags] 
//    ↓ (Submit to API)
// [API Route: /api/job] 
//    ↓ (Server handles save with Prisma)
// [DB: Save Job with Tag IDs]

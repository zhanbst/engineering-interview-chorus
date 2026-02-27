import { useState } from 'react';
import { Profile } from '../api/pokemon-api';

interface ProfileSelectorProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  onSelect: (id: number) => void;
  onCreate: (name: string) => void;
}

export function ProfileSelector({
  profiles,
  selectedProfile,
  onSelect,
  onCreate,
}: ProfileSelectorProps) {
  const [newName, setNewName] = useState('');

  const handleCreate = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    onCreate(trimmed);
    setNewName('');
  };

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
      <select
        value={selectedProfile?.id ?? ''}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="" disabled>Select a profile</option>
        {profiles.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <input
        placeholder="New profile name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
      />
      <button onClick={handleCreate} disabled={!newName.trim()}>
        Create
      </button>
    </div>
  );
}

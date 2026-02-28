import { Pokemon } from '../api/pokemon-api';
import TeamDisplayCard from './TeamDisplayCard';

interface TeamDisplayProps {
  team: Pokemon[];
  onRemove: (id: number) => void;
  onSave: () => void;
  saving: boolean;
}

export function TeamDisplay({ team, onRemove, onSave, saving }: TeamDisplayProps) {
  return (
    <div style={{ marginBottom: 16, padding: 12, background: '#E1E9ED', borderRadius: 8 }}>
      <h3>Team ({team.length}/6)</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {team.map((pokemon) => (
          <TeamDisplayCard key={`team-pokemon-${pokemon.id}`} pokemon={pokemon} onRemove={onRemove} />
        ))}
      </div>
      <button onClick={onSave} disabled={saving} style={{ marginTop: 8 }}>
        {saving ? 'Saving...' : 'Save Team'}
      </button>
    </div>
  );
}

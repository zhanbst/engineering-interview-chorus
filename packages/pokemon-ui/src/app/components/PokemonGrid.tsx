import { Pokemon } from '../api/pokemon-api';
import { PokemonCard } from './PokemonCard';

interface PokemonGridProps {
  pokemon: Pokemon[];
  selectedIds: number[];
  onToggle: (id: number) => void;
}

const MAX_TEAM_SIZE = 6;

export function PokemonGrid({ pokemon, selectedIds, onToggle }: PokemonGridProps) {
  const teamFull = selectedIds.length >= MAX_TEAM_SIZE;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 6 }}>
      {pokemon.map((p) => (
        <PokemonCard
          key={`pokemon-${p.id}`}
          pokemon={p}
          selected={selectedIds.includes(p.id)}
          disabled={teamFull}
          onClick={() => onToggle(p.id)}
        />
      ))}
    </div>
  );
}

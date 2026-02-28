import styled from '@emotion/styled';
import { Pokemon } from '../api/pokemon-api';
import { PokemonCard } from './PokemonCard';

interface PokemonGridProps {
  pokemon: Pokemon[];
  selectedIds: number[];
  onToggle: (id: number) => void;
}

const MAX_TEAM_SIZE = 6;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 8px;
`;

export function PokemonGrid({ pokemon, selectedIds, onToggle }: PokemonGridProps) {
  const teamFull = selectedIds.length >= MAX_TEAM_SIZE;

  return (
    <Grid>
      {pokemon.map((p) => (
        <PokemonCard
          key={`pokemon-${p.id}`}
          pokemon={p}
          selected={selectedIds.includes(p.id)}
          disabled={teamFull}
          onClick={() => onToggle(p.id)}
        />
      ))}
    </Grid>
  );
}

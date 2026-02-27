import { Pokemon } from '../api/pokemon-api';

interface PokemonCardProps {
  pokemon: Pokemon;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function PokemonCard({ pokemon, selected, disabled, onClick }: PokemonCardProps) {
  return (
    <div
      onClick={() => (!disabled || selected) && onClick()}
      style={{
        textAlign: 'center',
        padding: 12,
        border: `2px solid ${selected ? 'red' : '#ddd'}`,
        borderRadius: 6,
        cursor: disabled && !selected ? 'not-allowed' : 'pointer',
        opacity: disabled && !selected ? 0.4 : 1,
      }}
    >
      <img src={pokemon.spriteUrl} alt={pokemon.name} width={48} height={48} />
      <div style={{ fontSize: 11, textTransform: 'capitalize' }}>{pokemon.name}</div>
    </div>
  );
}

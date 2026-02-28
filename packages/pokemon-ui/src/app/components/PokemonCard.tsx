import styled from '@emotion/styled';
import { Pokemon } from '../api/pokemon-api';
import { colors } from '../theme/colors';

interface PokemonCardProps {
  pokemon: Pokemon;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}

const Card = styled.div<{ selected: boolean; isDisabled: boolean }>`
  text-align: center;
  padding: 12px;
  border: 2px solid ${({ selected }) => (selected ? colors.accent : colors.border)};
  border-radius: 8px;
  background: ${({ selected }) => (selected ? colors.accentLight : colors.surface)};
  cursor: ${({ isDisabled, selected }) =>
    isDisabled && !selected ? 'not-allowed' : 'pointer'};
  opacity: ${({ isDisabled, selected }) => (isDisabled && !selected ? 0.4 : 1)};
  transition: border-color 0.15s, background 0.15s, transform 0.1s;
  &:hover {
    ${({ isDisabled, selected }) =>
      !(isDisabled && !selected) &&
      `
      border-color: ${colors.accent};
    `}
  }
`;

const Sprite = styled.img`
  width: 56px;
  height: 56px;
  image-rendering: pixelated;
`;

const Name = styled.div`
  font-size: 11px;
  text-transform: capitalize;
  margin-top: 4px;
  font-weight: 500;
`;

export function PokemonCard({ pokemon, selected, disabled, onClick }: PokemonCardProps) {
  return (
    <Card
      selected={selected}
      isDisabled={disabled}
      onClick={() => (!disabled || selected) && onClick()}
    >
      <Sprite src={pokemon.spriteUrl} alt={pokemon.name} />
      <Name>{pokemon.name}</Name>
    </Card>
  );
}

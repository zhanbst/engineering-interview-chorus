import styled from '@emotion/styled';
import { Pokemon } from '../api/pokemon-api';
import { colors } from '../theme/colors';

type Props = {
  onRemove: (id: number) => void;
  pokemon: Pokemon;
};

const Card = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 12px;
  border: 2px solid ${colors.accent};
  border-radius: 8px;
  background: ${colors.accentLight};
  transition: transform 0.1s;
  min-width: 90px;
  &:hover {
    transform: scale(1.05);
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

const TeamDisplayCard = ({ onRemove, pokemon }: Props) => {
  const { id, name, spriteUrl } = pokemon;

  return (
    <Card onClick={() => onRemove(id)}>
      <Sprite src={spriteUrl} alt={name} />
      <Name>{name}</Name>
    </Card>
  );
};

export default TeamDisplayCard;

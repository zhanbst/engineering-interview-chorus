import { Pokemon } from '../api/pokemon-api';

type Props = {
  onRemove: (id: number) => void;
  pokemon: Pokemon
};

const TeamDisplayCard = ({ onRemove, pokemon }: Props) => {
  const { id, name, spriteUrl } = pokemon;

  return (
    <div
      onClick={() => onRemove(id)}
      style={{ textAlign: 'center', cursor: 'pointer' }}
    >
      <img src={spriteUrl} alt={name} width={48} height={48} />
      <div style={{ fontSize: 11, textTransform: 'capitalize' }}>{name}</div>
    </div>
  );
};

export default TeamDisplayCard;

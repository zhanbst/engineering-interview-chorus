import styled from '@emotion/styled';
import { Pokemon } from '../api/pokemon-api';
import { colors } from '../theme/colors';
import TeamDisplayCard from './TeamDisplayCard';

interface TeamDisplayProps {
  team: Pokemon[];
  onRemove: (id: number) => void;
  onSave: () => void;
  saving: boolean;
}

const Container = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background: ${colors.background};
  border-radius: 10px;
  border: 1px solid ${colors.border};
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
`;

const Title = styled.h3`
  margin: 0 0 12px;
  color: ${colors.text};
`;

const Slots = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: stretch;
`;

const EmptySlot = styled.div`
  min-width: 90px;
  min-height: 100px;
  border: 2px dashed ${colors.borderLight};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.textMuted};
  font-size: 11px;
`;

const SaveButton = styled.button<{ isSaving: boolean }>`
  margin-top: 14px;
  padding: 8px 28px;
  background: ${({ isSaving }) => (isSaving ? colors.disabled : colors.accentDark)};
  color: ${colors.surface};
  border: none;
  border-radius: 6px;
  cursor: ${({ isSaving }) => (isSaving ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: ${colors.accentDarker};
  }
`;

export function TeamDisplay({ team, onRemove, onSave, saving }: TeamDisplayProps) {
  const emptySlots = Math.max(0, 6 - team.length);

  return (
    <Container>
      <Title>Team ({team.length}/6)</Title>
      <Slots>
        {team.map((pokemon) => (
          <TeamDisplayCard key={`team-pokemon-${pokemon.id}`} pokemon={pokemon} onRemove={onRemove} />
        ))}
        {Array.from({ length: emptySlots }, (_, i) => (
          <EmptySlot key={`empty-${i}`}>Empty</EmptySlot>
        ))}
      </Slots>
      <SaveButton onClick={onSave} disabled={saving} isSaving={saving}>
        {saving ? 'Saving...' : 'Save Team'}
      </SaveButton>
    </Container>
  );
}

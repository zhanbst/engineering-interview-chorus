import styled from '@emotion/styled';
import { useState } from 'react';
import { Profile } from '../api/pokemon-api';
import { colors } from '../theme/colors';

interface ProfileSelectorProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  onSelect: (id: number) => void;
  onUnselect: () => void;
  onCreate: (name: string) => void;
}

const Container = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const chevron = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`
);

const Select = styled.select<{ selected: boolean }>`
  padding: 8px 12px;
  padding-right: ${({ selected }) => (selected ? '52px' : '28px')};
  border: 1px solid ${colors.borderLight};
  border-radius: 6px;
  font-size: 14px;
  color: ${colors.text};
  background-color: ${colors.surface};
  background-image: url("data:image/svg+xml,${chevron}");
  background-repeat: no-repeat;
  background-position: ${({ selected }) => (selected ? 'calc(100% - 30px) center' : 'calc(100% - 8px) center')};
  appearance: none;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: ${colors.text};
  padding: 4px 6px;

  &:hover {
    color: ${colors.error};
  }
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${colors.borderLight};
  border-radius: 6px;
  font-size: 14px;
`;

const CreateButton = styled.button`
  padding: 8px 20px;
  background: ${colors.primary};
  color: ${colors.surface};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: ${colors.primaryHover};
  }

  &:disabled {
    background: ${colors.disabledBg};
    cursor: not-allowed;
  }
`;

export function ProfileSelector({
  profiles,
  selectedProfile,
  onSelect,
  onUnselect,
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
    <Container>
      <SelectWrapper>
        <Select
          value={selectedProfile?.id ?? ''}
          onChange={(e) => onSelect(Number(e.target.value))}
          selected={!!selectedProfile}
        >
          <option value="" disabled>Select a profile</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </Select>
        {selectedProfile && (
          <ClearButton onClick={onUnselect} aria-label="Clear selection">
            &times;
          </ClearButton>
        )}
      </SelectWrapper>

      <Input
        placeholder="New profile name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
      />
      <CreateButton onClick={handleCreate} disabled={!newName.trim()}>
        Create
      </CreateButton>
    </Container>
  );
}

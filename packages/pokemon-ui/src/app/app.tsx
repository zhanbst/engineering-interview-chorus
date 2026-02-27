import styled from '@emotion/styled';
import { useState } from 'react';
import { usePokemon } from './hooks/usePokemon';
import { useProfiles } from './hooks/useProfiles';
import { ProfileSelector } from './components/ProfileSelector';
import { TeamDisplay } from './components/TeamDisplay';
import { PokemonGrid } from './components/PokemonGrid';

const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  margin: 0 0 24px;
`;

const ErrorText = styled.p`
  color: #e63946;
`;

export function App() {
  const { pokemon, loading: pokemonLoading, error: pokemonError } = usePokemon();
  const {
    profiles,
    selectedProfile,
    loading: profilesLoading,
    error: profilesError,
    createProfile,
    updatePokemon,
    selectProfile,
  } = useProfiles();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  const handleSelectProfile = (id: number) => {
    selectProfile(id);
    const profile = profiles.find((p) => p.id === id);
    setSelectedIds(profile?.pokemon.map((p) => p.id) ?? []);
  };

  const handleCreateProfile = async (name: string) => {
    await createProfile(name);
    setSelectedIds([]);
  };

  const handleTogglePokemon = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleRemovePokemon = (id: number) => {
    setSelectedIds((prev) => prev.filter((pid) => pid !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePokemon(selectedIds);
    } finally {
      setSaving(false);
    }
  };

  const teamPokemon = pokemon.filter((p) => selectedIds.includes(p.id));
  const error = pokemonError || profilesError;

  if (pokemonLoading || profilesLoading) return <Page>Loading...</Page>;

  return (
    <Page>
      <Title>Pokemon Team Builder</Title>

      {error && <ErrorText>{error}</ErrorText>}

      <ProfileSelector
        profiles={profiles}
        selectedProfile={selectedProfile}
        onSelect={handleSelectProfile}
        onCreate={handleCreateProfile}
      />

      {selectedProfile && (
        <>
          <TeamDisplay
            team={teamPokemon}
            onRemove={handleRemovePokemon}
            onSave={handleSave}
            saving={saving}
          />
          <PokemonGrid
            pokemon={pokemon}
            selectedIds={selectedIds}
            onToggle={handleTogglePokemon}
          />
        </>
      )}
    </Page>
  );
}

export default App;

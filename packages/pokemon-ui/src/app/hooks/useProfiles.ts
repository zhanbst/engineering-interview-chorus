import { useCallback, useEffect, useState } from 'react';
import { Profile, apiClient } from '../api/pokemon-api';

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = useCallback(async () => {
    try {
      const data = await apiClient.getProfiles();
      setProfiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profiles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const createProfile = async (name: string) => {
    try {
      const profile = await apiClient.createProfile(name);
      setProfiles((prev) => [...prev, profile]);
      setSelectedProfile(profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
    }
  };

  const updatePokemon = async (pokemonIds: number[]) => {
    if (!selectedProfile) return;
    try {
      const updated = await apiClient.updateProfilePokemon(
        selectedProfile.id,
        pokemonIds
      );
      setProfiles((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setSelectedProfile(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update team');
    }
  };

  const selectProfile = (id: number) => {
    const profile = profiles.find((p) => p.id === id);
    setSelectedProfile(profile ?? null);
  };

  return {
    profiles,
    selectedProfile,
    loading,
    error,
    createProfile,
    updatePokemon,
    selectProfile,
  };
}

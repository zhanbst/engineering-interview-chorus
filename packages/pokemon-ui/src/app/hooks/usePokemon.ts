import { useEffect, useState } from 'react';
import { Pokemon, apiClient } from '../api/pokemon-api';

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await apiClient.getPokemon();
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pokemon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { pokemon, loading, error };
}

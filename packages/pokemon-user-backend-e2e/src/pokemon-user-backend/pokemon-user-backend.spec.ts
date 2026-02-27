import axios, { AxiosError } from 'axios';

describe('Pokemon API', () => {
  describe('GET /api/pokemon', () => {
    it('should return 150 pokemon', async () => {
      const res = await axios.get('/api/pokemon');

      expect(res.status).toBe(200);
      expect(res.data).toHaveLength(150);
      expect(res.data[0]).toHaveProperty('id');
      expect(res.data[0]).toHaveProperty('name');
      expect(res.data[0]).toHaveProperty('spriteUrl');
    });
  });

  describe('Profiles API', () => {
    let profileId: number;

    it('POST /api/profiles should create a profile', async () => {
      const res = await axios.post('/api/profiles', { name: 'Ash' });

      expect(res.status).toBe(201);
      expect(res.data.name).toBe('Ash');
      expect(res.data.pokemon).toEqual([]);
      profileId = res.data.id;
    });

    it('GET /api/profiles should return profiles', async () => {
      const res = await axios.get('/api/profiles');

      expect(res.status).toBe(200);
      expect(res.data.length).toBeGreaterThanOrEqual(1);
    });

    it('PUT /api/profiles/:id/pokemon should assign pokemon', async () => {
      const res = await axios.put(`/api/profiles/${profileId}/pokemon`, {
        pokemonIds: [25, 6, 150],
      });

      expect(res.status).toBe(200);
      expect(res.data.pokemon).toHaveLength(3);
    });

    it('should reject more than 6 pokemon', async () => {
      try {
        await axios.put(`/api/profiles/${profileId}/pokemon`, {
          pokemonIds: [1, 2, 3, 4, 5, 6, 7],
        });
        fail('Should have thrown');
      } catch (err: unknown) {
        expect((err as AxiosError)?.response?.status).toBe(400);
      }
    });
  });
});

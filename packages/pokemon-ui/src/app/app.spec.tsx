import { render } from '@testing-library/react';
import App from './app';

vi.mock('./api/pokemon-api', () => ({
  apiClient: {
    getPokemon: vi.fn().mockResolvedValue([]),
    getProfiles: vi.fn().mockResolvedValue([]),
  },
}));

describe('App', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have the title', async () => {
    const { findByText } = render(<App />);
    expect(await findByText('Pokemon Team Builder')).toBeTruthy();
  });
});

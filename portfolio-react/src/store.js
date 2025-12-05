import { create } from 'zustand';

/**
 * ZUSTAND STORE - Portfolio Navigation State
 * 
 * This store manages which hexagon cell is currently "active" (zoomed into).
 * activeCell = null → Viewing the full hive (default state)
 * activeCell = 0-5 → Zoomed into specific hexagon (discipline room)
 */

export const usePortfolioStore = create((set) => ({
  // Current active cell (null = viewing hive, 0-5 = inside specific hexagon)
  activeCell: null,

  // Action: Set which cell is active
  setActiveCell: (cellIndex) => set({ activeCell: cellIndex }),

  // Action: Close current cell (return to hive view)
  closeCell: () => set({ activeCell: null }),

  // Metadata about each cell/discipline
  cells: [
    {
      id: 0,
      name: 'Code',
      description: 'Software Engineering',
      color: '#00d9ff', // Cyan
      rimLight: '#0099ff', // Deeper blue rim
      icon: '💻',
    },
    {
      id: 1,
      name: 'Ecology',
      description: 'Conservation & Systems',
      color: '#22c55e', // Green
      rimLight: '#15a34a', // Darker green rim
      icon: '🌲',
    },
    {
      id: 2,
      name: 'Engineering',
      description: 'Making & Fabrication',
      color: '#f97316', // Orange
      rimLight: '#d97706', // Darker orange rim
      icon: '⚙️',
    },
    {
      id: 3,
      name: 'Science',
      description: 'Physics & Simulation',
      color: '#8b5cf6', // Purple
      rimLight: '#7c3aed', // Darker purple rim
      icon: '🔬',
    },
    {
      id: 4,
      name: 'Gaming',
      description: 'Interactive Design',
      color: '#ec4899', // Pink
      rimLight: '#db2777', // Darker pink rim
      icon: '🎮',
    },
    {
      id: 5,
      name: 'Film & VFX',
      description: 'Creative Vision',
      color: '#f59e0b', // Amber
      rimLight: '#d97706', // Darker amber rim
      icon: '🎬',
    },
  ],

  // Helper: Get current cell data
  getCurrentCell: (state) => {
    if (state.activeCell === null) return null;
    return state.cells[state.activeCell];
  },
}));

import { emptySteel } from './calculations';

export interface ProjectStore {
  columns: { concrete: number; steel: Record<number, { bars: number; ton: number }> };
    tank: { capacityM3: number; capacityLiter: number; concrete: number; wallArea: number; wallBlocks: number; steel: Record<number, { bars: number; ton: number }> };
      columnConcrete: number;
        columnSteel: number;
          tankConcrete: number;
            tankSteel: number;
              foundations?: { concrete: number; leveling: number; steel: Record<number, { bars: number; ton: number }> };
                necks?: { concrete: number; steel: Record<number, { bars: number; ton: number }> };
                  middat?: { concrete: number; steel: Record<number, { bars: number; ton: number }> };
                    slabs?: { concrete: number; blocks: number; area: number; grossVolume: number; steel: Record<number, { bars: number; ton: number }> };
                      structural?: { totalBuildingLoad: number; approxColumnLoad: number; totalFootingArea: number; avgFootingArea: number };
                        preliminary?: { area: number; excVolume: number; backVolume: number; chairArea: number };
                        }

                        export const projectStore: ProjectStore = {
                          columns: { concrete: 0, steel: emptySteel() },
                            tank: { capacityM3: 0, capacityLiter: 0, concrete: 0, wallArea: 0, wallBlocks: 0, steel: emptySteel() },
                              columnConcrete: 0,
                                columnSteel: 0,
                                  tankConcrete: 0,
                                    tankSteel: 0,
                                    };

                                    export const saveStore = () => {
                                      localStorage.setItem('projectStore', JSON.stringify(projectStore));
                                      };
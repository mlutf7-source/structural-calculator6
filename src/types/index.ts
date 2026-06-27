export interface ProjectInfo {
    projectName: string;
      ownerName: string;
        floors: number;
          landLength: number;
            landWidth: number;
              buildingArea: number;
              }

              export interface FoundationItem {
                id: string;
                  count: number;
                    length: number;
                      width: number;
                        height: number;
                          longBarsPerMeter: number;
                            transBarsPerMeter: number;
                              mainBarDiameter: number;
                                stirrupDiameter: number;
                                  buildingLength: number;
                                    buildingWidth: number;
                                      stoneChairHeight: number;
                                      }

                                      export interface NecksInFoundation {
                                        enabled: boolean;
                                        }

                                        export interface NeckItem {
                                          id: string;
                                            count: number;
                                              length: number;
                                                width: number;
                                                  height: number;
                                                    barCount: number;
                                                      barDiameter: number;
                                                        stirrupsPerMeter: number;
                                                          stirrupDiameter: number;
                                                            baseThickness: number;
                                                              middaHeight: number;
                                                              }

                                                              export interface ColumnItem {
                                                                id: string;
                                                                  count: number;
                                                                    length: number;
                                                                      width: number;
                                                                        height: number;
                                                                          mainBarCount: number;
                                                                            mainBarDiameter: number;
                                                                              stirrupsPerMeter: number;
                                                                                stirrupDiameter: number;
                                          floors: number;                                      }

                                                                                export interface MiddaItem {
                                                                                  id: string;
                                                                                    buildingLength: number;
                                                                                      buildingWidth: number;
                                                                                        lengthAxes: number;
                                                                                          widthAxes: number;
                                                                                            middaHeight: number;
                                                                                              topBarsCount: number;
                                                                                                topBarDiameter: number;
                                                                                                  bottomBarsCount: number;
                                                                                                    bottomBarDiameter: number;
                                                                                                      stirrupDiameter: number;
                                                                                                      }

                                                                                                      export interface SlabItem {
                                                                                                        id: string;
                                                                                                          length: number;
                                                                                                            width: number;
                                                                                                              lengthBeams: number;
                                                                                                                widthBeams: number;
                                                                                                                  lengthBeamWidth: number;
                                                                                                                    widthBeamWidth: number;
                                                                                                                      slabThickness: number;
                                                                                                                        beamThickness: number;
                                                                                  topBarsCount: number;
                                                                                                                            topBarDiameter: number;
                                                                                                                              bottomBarsCount: number;
                                                                                                                                bottomBarDiameter: number;
                                                                                                                                  lengthTopBars: number;
                                                                                                                                    lengthTopDiameter: number;
                                                                                                                                      lengthBottomBars: number;
                                                                                                                                        lengthBottomDiameter: number;
                                                                                                                                          widthTopBars: number;
                                                                                                                                            widthTopDiameter: number;
                                                                                                                                              widthBottomBars: number;
                                                                                                                                                widthBottomDiameter: number;
                                                                                 floors: number;                                                               }

                                                                                                                                                // خزان - واجهة جديدة مع تفصيل التسليح
                                                                                                                                                export interface TankReinforcement {
                                                                                                                                                  longBars: number;
                                                                                                                                                    longDiameter: number;
                                                                                                                                                      transBars: number;
                                                                                                                                                        transDiameter: number;
                                                                                                                                                          layers: number;
                                                                                                                                                          }

                                                                                                                                                          export interface TankData {
                                                                                                                                                            length: number;
                                                                                                                                                              width: number;
                                                                                                                                                                height: number;
                                                                                                                                                                  wallThickness: number;
                                                                                                                                                                    floorThickness: number;
                                                                                                                                                                      roofThickness: number;
                                                                                                                                                                        wallReinf: TankReinforcement;
                                                                                                                                                                          floorReinf: TankReinforcement;
                                                                                                                                                                            roofReinf: TankReinforcement;
                                                                                                                                                                            }

                                                                                                                                                                            export interface PreliminaryData {
                                                                                                                                                                              length: number;
                                                                                                                                                                                width: number;
                                                                                                                                                                                  excavationDepth: number;
                                                                                                                                                                                    backfillDepth: number;
                                                                                                                                                                                    }

                                                                                                                                                                                    export interface StructuralData {
                                                                                                                                                                                      buildingArea: number;
                                                                                                                                                                                        floors: number;
                                                                                                                                                                                          soilCapacity: number;
                                                                                                                                                                                            length1: number;
                                                                                                                                                                                              length2: number;
                                                                                                                                                                                                width1: number;
                                                                                                                                                                                                  width2: number;
                                                                                                                                                                                                    columnLength: number;
                                                                                                                                                                                                      columnWidth: number;
                                                                                                                                                                                                        requiredLoad: number;
                                                                                                                                                                                                          fc: number;
                                                                                                                                                                                                            fy: number;
                                                                                                                                                                                                              barCount: number;
                                                                                                                                                                                                                barDiameter: number;
                                                                                                                                                                                                                  actualFootingArea: number;
                                                                                                                                                                                                                  }

                                                                                                                                                                                                                  export interface PricesData {
                                                                                                                                                                                                                    price8: number;
                                                                                                                                                                                                                      price10: number;
                                                                                                                                                                                                                        price12: number;
                                                                                                                                                                                                                          price14: number;
                                                                                                                                                                                                                            price16: number;
                                                                                                                                                                                                                              price18: number;
                                                                                                                                                                                                                                price20: number;
                                                                                                                                                                                                                                  concretePrice: number;
                                                                                                                                                                                                                                    levelingConcretePrice: number;
                                                                                                                                                                                                                                      blockPrice: number;
                                                                                                                                                                                                                                        excavationPrice: number;
                                                                                                                                                                                                                                          backfillPrice: number;
                                                                                                                                                                                                                                            stoneChairPrice: number;
                                                                                                                                                                                                                                              structureLaborPrice: number;
                                                                                                                                                                                                                                                tankLaborPrice: number;
                                                                                                                                                                                                                                                  supervisionCost: number;
                                                                                                                                                                                                                                                    licenseCost: number;
                                                                                                                                                                                                                                                      guardCost: number;
                                                                                                                                                                                                                                                        transportCost: number;
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                        export const BARS_PER_TON: Record<number, number> = {
                                                                                                                                                                                                                                                          8: 200,
                                                                                                                                                                                                                                                            10: 135,
                                                                                                                                                                                                                                                              12: 90,
                                                                                                                                                                                                                                                                14: 68,
                                                                                                                                                                                                                                                                  16: 52,
                                                                                                                                                                                                                                                                    18: 41,
                                                                                                                                                                                                                                                                      20: 33,
                                                                                                                                                                                                                                                                      };

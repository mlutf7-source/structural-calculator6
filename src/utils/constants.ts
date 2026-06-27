export const APP_NAME = "حاسبة الهيكل الخرساني";
export const ENGINEER_NAME = "المهندس محمد لطف السميعي";

export const COLORS = {
  primary: '#0f2b46',
    secondary: '#1a4a7a',
      accent: '#2563eb',
        success: '#059669',
          warning: '#d97706',
            danger: '#dc2626',
              background: '#f1f5f9',
                surface: '#ffffff',
                  text: '#0f172a',
                    textLight: '#64748b',
                      border: '#e2e8f0',
                      };

                      // دوال مساعدة
                      export const n = (v: any): number => {
                        const num = parseFloat(v);
                          return isNaN(num) ? 0 : num;
                          };

                          export const cm = (v: any): number => {
                            const num = parseFloat(v);
                              return isNaN(num) ? 0 : num / 100;
                              };

                              export const clean = (v: number, decimals = 2): string => {
                                return v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
                                };

                                export const fmtNum = (v: number): string => {
                                  if (Number.isInteger(v)) return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
                                    const rounded = parseFloat(v.toFixed(2));
                                      return rounded.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                                      };

                                      export const goNext = (id?: string) => {
                                        if (!id) return;
                                          setTimeout(() => {
                                              const el = document.getElementById(id) as HTMLInputElement | null;
                                                  el?.focus();
                                                      el?.select();
                                                        }, 50);
                                                        };
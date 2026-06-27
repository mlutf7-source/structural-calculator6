import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import html2pdf from 'html2pdf.js';

const safeName = (name: string) =>
  name.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, '_');

  export const createPdfFromElement = async (
    elementId: string,
      title = 'تقرير المشروع'
      ) => {
        const element = document.getElementById(elementId);

          if (!element) {
              alert('لم يتم العثور على منطقة التقرير');
                  return;
                    }

                      const clone = element.cloneNode(true) as HTMLElement;

                        clone.style.width = '760px';
                          clone.style.maxWidth = '760px';
                            clone.style.height = 'auto';
                              clone.style.overflow = 'visible';
                                clone.style.background = '#ffffff';
                                  clone.style.padding = '20px';
                                    clone.style.direction = 'rtl';
                                      clone.style.fontFamily = 'Cairo, Arial, sans-serif';

                                        const wrapper = document.createElement('div');
                                          wrapper.style.position = 'fixed';
                                            wrapper.style.left = '-99999px';
                                              wrapper.style.top = '0';
                                                wrapper.style.background = '#fff';
                                                  wrapper.appendChild(clone);
                                                    document.body.appendChild(wrapper);

                                                      const opt = {
                                                          margin: 12,
                                                              filename: `${safeName(title)}.pdf`,
                                                                  image: { type: 'jpeg', quality: 0.98 },
                                                                      html2canvas: {
                                                                            scale: 2,
                                                                                  useCORS: true,
                                                                                        backgroundColor: '#ffffff',
                                                                                              scrollY: 0,
                                                                                                    windowWidth: 794,
                                                                                                        },
                                                                                                            jsPDF: {
                                                                                                                  unit: 'mm',
                                                                                                                        format: 'a4',
                                                                                                                              orientation: 'portrait',
                                                                                                                                  },
                                                                                                                                      pagebreak: {
                                                                                                                                            mode: ['avoid-all', 'css', 'legacy'],
                                                                                                                                                  avoid: ['tr', 'table', '.avoid-break'],
                                                                                                                                                      },
                                                                                                                                                        };

                                                                                                                                                          try {
                                                                                                                                                              const pdf = await html2pdf().set(opt).from(clone).outputPdf('datauristring');
                                                                                                                                                                  const base64 = String(pdf).split(',')[1];

                                                                                                                                                                      const saved = await Filesystem.writeFile({
                                                                                                                                                                            path: `${safeName(title)}.pdf`,
                                                                                                                                                                                  data: base64,
                                                                                                                                                                                        directory: Directory.Cache,
                                                                                                                                                                                            });

                                                                                                                                                                                                await Share.share({
                                                                                                                                                                                                      title,
                                                                                                                                                                                                            text: title,
                                                                                                                                                                                                                  url: saved.uri,
                                                                                                                                                                                                                        dialogTitle: 'مشاركة التقرير',
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                              } finally {
                                                                                                                                                                                                                                  document.body.removeChild(wrapper);
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    };
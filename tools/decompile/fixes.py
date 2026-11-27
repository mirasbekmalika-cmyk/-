"""Manual fixes applied on top of the extracted source."""
import sys, re
root = sys.argv[1]
def sub(path, old, new, count=1):
    p = f"{root}/{path}"; s = open(p).read()
    assert old in s, (path, old[:60])
    s = s.replace(old, new, count); open(p, 'w').write(s)
# PDF manuals: load from /public/manuals instead of inline base64, use bundled worker
sub('features/manuals/ManualViewer.tsx', '''    setupPdfWorker();
    const ae = Uint8Array.from(atob(e.base64), G => G.charCodeAt(0));
    const ye = URL.createObjectURL(new Blob([ae], {
      type: "application/pdf"
    }));
    setR(ye);
    const O = getDocument({
      data: ae,''', '''    setupPdfWorker();
    const ye = e.url;
    setR(ye);
    const O = getDocument({
      url: e.url,''')
sub('features/manuals/ManualViewer.tsx', "      O.destroy();\n      URL.revokeObjectURL(ye);\n", "      O.destroy();\n")
sub('data/manuals.tsx', '''let x2;
function setupPdfWorker() {
  x2 ??= URL.createObjectURL(new Blob([pdfWorkerUrl], {
    type: "text/javascript"
  }));
  GlobalWorkerOptions.workerSrc = x2;
}''', '''function setupPdfWorker() {
  GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
}''')
sub('data/manuals.tsx', 'export { getManual, manuals, respiratoryComparisonRows, setupPdfWorker, x2 };', 'export { getManual, manuals, respiratoryComparisonRows, setupPdfWorker };')

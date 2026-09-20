import fitz
from pathlib import Path
src=Path('attached_assets/New_National_Advertising_Replit_Prompt_1789892538128.pdf')
out=Path('.agents/outputs/new-national-preview')
out.mkdir(parents=True, exist_ok=True)
doc=fitz.open(src)
print('pages', doc.page_count, 'metadata', doc.metadata)
for i in range(doc.page_count):
    pix=doc[i].get_pixmap(matrix=fitz.Matrix(1.5,1.5), alpha=False)
    path=out/f'page-{i+1}.png'
    pix.save(path)
print('rendered', doc.page_count, 'pages to', out)

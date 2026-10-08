from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
HERE = Path(__file__).resolve().parent
SOURCE = HERE.parent.parent / 'node_modules' / '@fontsource-variable' / 'sora' / 'files'
WEIGHTS = (400, 600, 700)
SUBSETS = ('latin', 'latin-ext')
for subset in SUBSETS:
    for weight in WEIGHTS:
        variable = TTFont(SOURCE / f'sora-{subset}-wght-normal.woff2', recalcTimestamp=False)
        static = instancer.instantiateVariableFont(variable, {'wght': weight}, inplace=False, updateFontNames=True)
        static.flavor = 'woff2'
        target = HERE / f'sora-{subset}-{weight}.woff2'
        static.save(target)
        print(f'{target.name}: {target.stat().st_size} bytes')

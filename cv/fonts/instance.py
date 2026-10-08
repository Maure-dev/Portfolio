"""Regenerates the static Sora instances in this folder from the variable font in node_modules.

Why static instances: Chrome prints a *variable* font as Type3 glyph outlines, which makes the
CV PDFs ~160 KB and harder for ATS parsers; static TrueType instances are embedded as compact
font subsets (~35-50 KB PDFs). The outlines and advances are identical, so the layout does not
change.

Usage (one-off, only when the Sora package is upgraded):
    python3 -m pip install --target /tmp/pylib fonttools brotli
    PYTHONPATH=/tmp/pylib python3 cv/fonts/instance.py

Sora is licensed under the SIL Open Font License 1.1 (see LICENSE next to this file).
"""

from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

HERE = Path(__file__).resolve().parent
SOURCE = HERE.parent.parent / "node_modules" / "@fontsource-variable" / "sora" / "files"
WEIGHTS = (400, 600, 700)
SUBSETS = ("latin", "latin-ext")

for subset in SUBSETS:
    for weight in WEIGHTS:
        # recalcTimestamp=False keeps head.modified from the source so the output is reproducible.
        variable = TTFont(SOURCE / f"sora-{subset}-wght-normal.woff2", recalcTimestamp=False)
        static = instancer.instantiateVariableFont(
            variable, {"wght": weight}, inplace=False, updateFontNames=True
        )
        static.flavor = "woff2"
        target = HERE / f"sora-{subset}-{weight}.woff2"
        static.save(target)
        print(f"{target.name}: {target.stat().st_size} bytes")

const fs = require('fs');
const xmlParser = require('xml-js');

function mapGlyphToIcon(glyph) {
  const attr = glyph._attributes;
  return `\t${[attr['glyph-name']]}: ${escape(attr['unicode']).replace('%u', '\\')}`;
}

function generateIcons() {
  const encoding = 'utf8';
  const SRC_RESOURCES_FONTS = `./src/theme/resources/fonts`;
  const MATERIAL_ICONS_FILE = 'MaterialIcons-Regular.svg';
  const PRIMAVERA_ICON_MIXIN = `./src/theme/sass/abstract/_icon-unicodes.scss`;
  const MaterialIcons = fs.readFileSync(`${SRC_RESOURCES_FONTS}/${MATERIAL_ICONS_FILE}`, encoding);
  let iconMixin = fs.readFileSync(PRIMAVERA_ICON_MIXIN, encoding);
  let glyphs = JSON.parse(xmlParser.xml2json(MaterialIcons, {compact: true, spaces: 4})).svg.defs.font.glyph || [];
  glyphs = glyphs.map(mapGlyphToIcon).join(',\n');
  const replacement = `$mat-font-icon-class-and-unicode-map: (\n${glyphs}\n);`;
  iconMixin = iconMixin.replace(/\$mat-font-icon-class-and-unicode-map: \([\w|\s|_|:|\\|,|-]+\);/gm, replacement);

  fs.writeFileSync(PRIMAVERA_ICON_MIXIN, iconMixin, encoding);
}

generateIcons();
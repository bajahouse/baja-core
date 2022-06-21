// ============================================================================
//
// - Markdown -
//
//   Experimental markdown rendering frame. Currently incomplete.
//
// ============================================================================

declare interface ILMD {
  ToHTML: (markdown: string) => string
}
declare const LibMarkdown: ILMD

export function Markdown () {
  const frame = CreateFrame('Frame', 'demo-frame', UIParent)
  const html: WoWAPI.Frame = CreateFrame('SimpleHTML', 'demo-frame-html', frame) as any
  frame.SetSize(640, 600)
  frame.SetPoint('CENTER', UIParent, 'CENTER', 30, 30)
  html.SetSize(600, 540)
  html.SetPoint('TOPLEFT', frame, 'TOPLEFT', 0, -30)
  ;(html as any).SetFontObject('h1', 'SubzoneTextFont')
  ;(html as any).SetTextColor('h1', 0, 0.6, 1, 1)
  ;(html as any).SetFontObject('h2', 'NumberFontNormalLarge')
  ;(html as any).SetTextColor('h2', 0, 1, 0, 1)
  ;(html as any).SetFontObject('h3', 'NumberFontNormalLarge')
  ;(html as any).SetTextColor('h3', 0, 0.8, 0.4, 1)
  ;(html as any).SetFontObject('p', 'GameFontNormal')
  ;(html as any).SetTextColor('p', 1, 1, 1, 1)
  ;(html as any).SetHyperlinkFormat('[|cff3399ff|H%s|h%s|h|r]')
  ;(html as any).SetText(LibMarkdown.ToHTML(text))
}

const text = `
# hello world

- one
- two
- three

## foo

another line
`

// frame:SetScript("OnShow",
//   function(self)
//     self.html:SetText(LMD:ToHTML(text));
//     -- print(LMD:ToHTML(text));
//   end);
//
// print("[|cff00ddddLibMarkdown|r] demo loaded. Type |cff00dddd/script LMDDemoFrame:Show()|r to see it.");
//


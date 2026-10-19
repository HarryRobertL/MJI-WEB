# Design System: Crownox

## 1. Visual Theme & Atmosphere

- Overall feeling: Modern, security-focused, corporate, and high-trust, with a bright white foundation and vivid yellow-green accents.
- Visual density: Medium; content-heavy service pages balanced by strong spacing and clear sectioning.
- Brand posture: Professional, operational, and reassuring, aimed at business professionals and high-net-worth clients.
- Signature motifs: High-contrast black and neon-lime brand accents, bold service modules, stat blocks, and structured informational layouts.

### Key Characteristics

- Bright, minimal base with strong contrast
- Security/operations tone rather than luxury polish
- Bold accent color used for action and emphasis
- Bootstrap-based layout behavior with modular sections

## 2. Color Palette & Roles

| Role | Semantic Name | Value | Usage |
| --- | --- | --- | --- |
| Primary action | Signal Lime | #C9DD0A | Primary brand action, emphasis, CTA highlights |
| Accent | Electric Lime | #C4DE00 | Links, secondary emphasis, button accents |
| Secondary accent | Chartreuse Green | #C8CD27 | Supporting brand tint and related highlights |
| Surface | Pure White | #FFFFFF | Main page background and card surfaces |
| Text | Core Black | #000000 | Primary text, strong contrast on light surfaces |
| Border | Lime Border | #C9DD0A | Button borders and accent outlines |

### Primary

- #C9DD0A as the main brand signal color for primary CTA and emphasis
- #C4DE00 as the active link/accent color

### Interactive

- Links use the lime accent color rather than a conventional blue
- Primary button interaction relies on black fill with lime text/border
- Secondary actions appear transparent with lime text
- Hover/focus states are not explicitly documented in the evidence; likely restrained and contrast-driven

### Neutral Scale

- Pure white (#FFFFFF) is the dominant neutral surface
- Core black (#000000) is the dominant text neutral
- No explicit gray scale was provided in branding evidence

### Surface & Overlay

- Surface token: Pure White (#FFFFFF)
- Overlay token: Not explicitly evidenced; likely minimal or absent in favor of flat surfaces

### Theme Modes

The brand evidence indicates a light color scheme only.

#### Light Mode

- Background: #FFFFFF
- Surface: #FFFFFF
- Text: #000000
- Accent: #C4DE00 / #C9DD0A
- Notes: High-contrast light theme with vivid lime accenting and dark CTA treatment

#### Dark Mode

- Background: Not evidenced
- Surface: Not evidenced
- Text: Not evidenced
- Accent: Not evidenced
- Notes: No dark mode evidence provided

### Shadows & Depth

- Border/ring treatment: Very light, brand-colored borders; buttons may use lime outlines
- Card shadow stack: None indicated for buttons; general shadow usage is not clearly evidenced
- Focus treatment: Not explicitly documented; likely minimal and contrast-based

## 3. Typography Rules

### Font Family

- Primary: IBM Plex Sans
- Monospace: Not evidenced
- OpenType Features: Not evidenced

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Hero headline | IBM Plex Sans | 60px | Not evidenced | Not evidenced | Not evidenced | Large landing-page headlines; assertive but corporate |
| Section heading | IBM Plex Sans | 60px | Not evidenced | Not evidenced | Not evidenced | H2 matches H1 size in branding data, suggesting strong visual parity |
| Body | IBM Plex Sans | 15px | Not evidenced | Not evidenced | Not evidenced | Compact, readable body copy for dense service explanations |
| Label / Eyebrow | IBM Plex Sans | Not evidenced | Not evidenced | Not evidenced | Not evidenced | Used for stat labels and section markers |
| Caption / Meta | IBM Plex Sans | Not evidenced | Not evidenced | Not evidenced | Not evidenced | Small update metadata such as “Latest update” text |

### Principles

- Use a single sans-serif family across all content for consistency and speed
- Headings are large and confident, supporting a high-authority feel
- Body text is compact and information-dense, suitable for operational detail

## 4. Component Stylings

### Buttons and Links

- Primary CTA: Black background with lime text and lime border, rounded corners, no shadow
- Secondary CTA: Transparent background with lime text, subtle rounded corners
- Text links: Lime-colored links matching the accent palette
- Hover and active feel: Not explicitly evidenced; should remain sharp, high-contrast, and low-decorative

### Cards and Containers

- Surface style: Flat white sections with minimal ornamental treatment
- Radius: Small to medium; brand data shows 4px default radius and 10px on primary buttons
- Border: Light, brand-colored borders used for emphasis and button framing
- Shadow or elevation: None on buttons; overall shadow language appears minimal
- Internal spacing: Comfortable but efficient, likely driven by Bootstrap section spacing and grid gaps

### Inputs and Interactive Controls

- Input treatment: Not directly evidenced
- Focus behavior: Not directly evidenced
- Selection states: Not directly evidenced
- Inference: Controls should match the broader system—simple, high-contrast, and low-shadow

### Navigation

- Structure: Bootstrap-style responsive navigation
- Background treatment: Not explicitly evidenced; likely white or transparent over white surfaces
- Link style: Clean text links with lime accenting for active states
- Sticky or scroll behavior: Not evidenced

### Image Treatment

- Screenshot treatment: Not evidenced
- Photography or illustration style: Documentary / operational imagery with security and service context
- Border and radius treatment: Images appear integrated into layouts without heavy framing; no explicit radius evidence

### Distinctive Components

- Service carousel / service index with numbered navigation and repeated “Read more” links
- Country coverage and legality blocks with structured headings and explanatory text
- Operational metrics/stat blocks such as operators, active missions, and emergency responses

## 5. Layout Principles

### Spacing System

- Base unit: 4px
- Repeated spacing values: Multiples of 4px, consistent with Bootstrap-like spacing behavior

### Grid & Container

- Grid logic: Responsive, column-based layout consistent with Bootstrap
- Max content width: Not explicitly evidenced
- Section spacing: Generous vertical separation between service groups and informational blocks

### Whitespace Philosophy

- Whitespace philosophy: Clear, practical, and content-first rather than airy or editorial
- Alignment tendencies: Left-aligned content with structured stacking
- Content width behavior: Text blocks are controlled and readable, especially for service descriptions

### Border Radius Scale

- Micro: 4px
- Standard: 4px
- Large: 10px
- Pill: Not evidenced

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | White surfaces, minimal effects | Main sections, informational blocks |
| Ring | Lime border or outline | Buttons and emphasis states |
| Card | Light container with subtle separation, if used | Service modules and content groupings |
| Focus | Not evidenced; likely high-contrast outline | Keyboard accessibility and interactive emphasis |

### Depth Principles

- Surface hierarchy: Mostly flat, with emphasis created through color and spacing rather than shadow
- Shadow language: Explicitly minimal; primary buttons have no shadow
- Blur, glass, or overlay behavior: Not evidenced
- When depth is used versus avoided: Depth is largely avoided to preserve clarity and seriousness

## 7. Do's and Don'ts

### Do

- Use the lime brand colors sparingly but decisively for CTA and link emphasis
- Keep typography simple, consistent, and highly legible
- Maintain strong black-on-white contrast for a security-first professional tone

### Don't

- Don’t introduce playful gradients, neon effects, or decorative shadows
- Don’t use multiple font families or overly expressive type treatments
- Don’t soften the interface with glassmorphism or heavy translucency

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Mobile | Not explicitly evidenced; Bootstrap default assumed | Stack content vertically, preserve touch-friendly spacing |
| Tablet | Not explicitly evidenced; Bootstrap default assumed | Reflow columns and service cards into fewer columns |
| Desktop | Not explicitly evidenced; Bootstrap default assumed | Full multi-column layouts, broader service and stats presentation |

### Touch Targets

- Aim for at least 44px height for interactive elements
- Preserve clear spacing between links, carousel controls, and service actions

### Collapsing Strategy

- Desktop behavior: Multi-column service presentation, expansive country/operations content, and full navigation visibility
- Tablet behavior: Compress columns and reduce lateral density while preserving section order
- Mobile behavior: Stack content, prioritize readable text blocks, and simplify navigation and controls
- Breakpoint-driven component changes: Service lists, stats blocks, and country sections should collapse into vertical stacks
- Touch target and spacing adjustments: Increase vertical padding for buttons and nav items on smaller screens

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary CTA: #000000 background with #C9DD0A text and border
- Background: #FFFFFF
- Heading text: #000000
- Body text: #000000
- Border or ring: #C9DD0A
- Accent: #C4DE00

### Quick Summary

Crownox uses a light, corporate security aesthetic with a pure white background and vivid lime-green brand accents.  
Typography is entirely IBM Plex Sans, with oversized 60px headlines and compact 15px body text.  
The UI is mostly flat and highly structured, relying on spacing and contrast more than shadows.  
Primary buttons invert the brand: black fill, lime text, lime border, rounded corners.  
Secondary actions are transparent with lime text.  
Layouts are Bootstrap-like, modular, and information-dense, suited to service listings, stats, and country coverage content.  
The tone is modern, operational, and trustworthy for business and security audiences.

### Example Component Prompts

- Hero: “Build a high-trust hero on a white background using IBM Plex Sans, a 60px headline, and lime accent highlights. Keep composition bold, minimal, and corporate.”
- Card: “Create a flat white service card with concise body text, subtle spacing, and a lime-accented ‘Read more’ link.”
- Navigation: “Design a clean Bootstrap-style nav in a light theme with simple text links and lime active states.”
- Button or badge: “Use a black primary button with #C9DD0A text and border, 10px radius, and no shadow.”

### Ready-to-Use Prompt

Create a responsive security-services landing page for Crownox using a light theme, IBM Plex Sans throughout, white surfaces, black text, and lime-green accents (#C9DD0A / #C4DE00). Keep the interface flat, structured, and corporate, with large 60px headlines, compact 15px body text, black primary buttons with lime text, and Bootstrap-like responsive sections for services, stats, and country coverage.

### Iteration Guide

1. Preserve the white-and-lime brand contrast before adding any new visual treatment.
2. Keep typography and spacing simple; do not introduce a second font or decorative shadows.
3. Prefer structured content blocks and clear CTAs over ornamental UI.

## Optional Appendix: Interaction Patterns

- Scroll behavior: Not explicitly evidenced
- Hover behavior: Likely subtle, with emphasis driven by color rather than motion
- Click behavior: Straightforward and utilitarian
- Animation tone: Minimal or restrained; no strong motion language was evidenced

## Optional Appendix: Content & Messaging Patterns

- Headline pattern: Direct service-led headlines with stacked emphasis, often splitting phrases with bolded key terms
- CTA language: “Read more” is the recurring action label
- Trust signal pattern: Operational stats, country coverage, legality notes, and 24/7 response messaging
- Voice and tone: Formal, clear, and expertise-driven

## Optional Appendix: Observed Pages

- Home page: Brand colors, typography, buttons, spacing, service structure, stats, and global coverage content
- About section: Corporate positioning and high-net-worth / enterprise audience framing
- Solutions/service sections: Repeated service module structure and CTA pattern
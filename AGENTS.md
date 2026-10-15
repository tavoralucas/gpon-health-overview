# Architecture rules
- Use shared guided-flow primitives for request progress, navigation and review; keep each request form mounted during step navigation to preserve values and attachments.
- Keep request validation in the existing Zod schemas and outgoing payloads in the solicitation service so presentation changes do not change the webhook contract.
- Connectivity artwork is an inline decorative circuit SVG with CSS animation and reduced-motion support, avoiding external runtime media dependencies.- Backoffice screens reuse the shared connectivity effects (src/components/effects) and bo-* CSS classes so the internal UI matches Nova solicitação without duplicating artwork.

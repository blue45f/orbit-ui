---
'@heejun-com/core': patch
---

Remove the unused `framer-motion` dependency (no import sites). The standard animation library is `motion`; reintroduce it only when actually used.

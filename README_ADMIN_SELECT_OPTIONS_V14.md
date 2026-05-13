# V14 — Admin select options

This patch adds select-based admin fields with "Dodaj ręcznie" support.

Why:
- stable fields must feed catalog filters and search
- free text causes duplicates like "Murowana", "murowany", "cegła", "tradycyjna"
- select lists keep data clean
- custom option keeps flexibility

Implemented:
- SelectWithCustom admin component
- predefined field option sets
- badge, type, garage, roof, technology, style, floorsCount as selectable fields
- room floor as selectable value with manual/custom option
- project rules document for admin field options
- guard for required option component and docs

Not implemented yet:
- automatic related projects scoring.
That should be next stage.

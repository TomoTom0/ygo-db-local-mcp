# Work In Progress

## Currently Working On
🚧 Search enhancements: --max and --sort options

## Status
- Branch: dev
- Last Updated: 2025-11-19
- Current Task: Add --max and --sort to search-cards

## Progress
- [ ] Add --max option (default: 100)
  - [ ] Implement limit logic
  - [ ] Show warning when limit reached (except --raw mode)
- [ ] Add --sort option
  - [ ] Support fields: cardId, name, ruby, atk, def, levelValue
  - [ ] Support sort order: asc/desc
  - [ ] Default order: numeric→asc, text→dictionary order
- [ ] Update --help text
- [ ] Build and test

# FAQ Search Feature Implementation Tasks

## Phase 1: Core Infrastructure
- [x] Create feature branch `feature/faq-search`
- [x] Define FAQ types (types/faq.ts)
  - FAQ record structure
  - Card reference structure (extracted from {{name|id}})
  - Search result with embedded card info
- [x] Create FAQ loader utility (utils/faq-loader.ts)
  - Load faq-all.tsv
  - Parse card references from Q&A text
  - Build cardId → faqIds reverse index
  - Cache in memory
- [x] Extract card info from Q&A text
  - Parse {{name|id}} patterns
  - Lookup full card data from cards-all.tsv
  - Attach card specs to search results

## Phase 2: Search Tools Implementation
- [x] search_faq (unified search function)
  - Get FAQ by faqId
  - Search by cardId (using reverse index)
  - Search by question text (with wildcard support)
  - Search by answer text (with wildcard support)
  - Include extracted card info in all results

## Phase 3: Advanced Features
- [ ] search_faq_by_card_spec
  - Search cards by spec (level, type, etc.)
  - Find FAQs containing those cards
  - Cross-reference with cards-all.tsv
- [ ] bulk_search_faq
  - Multiple FAQ queries in one call
  - Optimize for batch processing

## Phase 4: Integration
- [x] Add FAQ tools to MCP server (ygo-search-card-server.ts)
- [x] Create CLI commands
  - ygo_faq_search CLI created
- [ ] Update README.md with FAQ search documentation

## Phase 5: Testing & Polish
- [ ] Test with sample queries
- [ ] Performance benchmarking
- [ ] Add examples to docs/
- [ ] Update USAGE.md

## Key Design Decision
**Card Info Attachment**: When returning Q&A text, always parse and include:
- Card names found in {{name|id}} patterns
- Full card data (name, type, atk, def, text, etc.)
- This enables rich context for AI understanding

## Performance Strategy
- In-memory cache: ~16MB for FAQ data
- Reverse index: O(1) lookup for cardId search
- Pre-normalized text for fast matching
- Lazy card data loading (only when FAQ is returned)

# Pending Reviews & Decisions

## Open Pull Requests

### PR #14 - FAQ Search Feature
- **Status**: AWAITING REVIEW FIXES
- **Reviewer**: gemini-code-assist[bot]
- **Issues**: 7 items (1 high, 6 medium)
- **Next Action**: Address review comments
- **Link**: https://github.com/TomoTom0/ygo-db-local-mcp/pull/14

### PR #13 - Documentation Updates
- **Status**: REVIEW FIXES COMPLETED
- **Reviewer**: gemini-code-assist[bot]
- **Issues**: Fixed (5 items)
- **Next Action**: Wait for re-review
- **Link**: https://github.com/TomoTom0/ygo-db-local-mcp/pull/13

## Decisions Needed

### 1. Library API Support
- **Question**: TypeScript利用者向けのライブラリAPIを正式サポートするか？
- **Context**: TYPESCRIPT_FROM_TS.mdを削除（package.jsonにexportsなし）
- **Options**:
  - A: 現状維持（CLIとMCPのみサポート）
  - B: package.jsonにexports追加してライブラリ化
- **Priority**: Low
- **Decision By**: Future milestone

### 2. Bulk FAQ Search
- **Question**: バルクFAQ検索機能を実装するか？
- **Context**: Phase 3 in TASKS_FAQ.md
- **Impact**: 複数検索を一度に実行できる
- **Priority**: Medium
- **Decision By**: After v1.1.0 release

### 3. Performance Optimization
- **Question**: さらなるパフォーマンス最適化が必要か？
- **Context**: 現状でも十分高速だが改善の余地あり
- **Options**:
  - A: SQLiteインメモリDB導入
  - B: 全文検索エンジン（MiniSearch/Lunr.js）
  - C: 現状維持
- **Priority**: Low
- **Decision By**: Based on user feedback

## Blocked Tasks

### ygo_searchのJSON配列フィールドの検索ロジック実装
- **Status**: ブロック中
- **Issue**: monsterTypes, linkMarkers, imgs などのJSON配列フィールドの検索に未対応
  - `--monsterTypes '["effect","fusion"]'` のパラメータは受け取れる
  - しかし、実際の検索ロジック側で JSON 配列を解析・マッチングする処理がない
- **Root Cause**: valueMatches関数がJSON配列フィールドに対応していない
  - データファイルではmonsterTypesが JSON文字列（"["effect","fusion"]"）として格納されている
  - 現在の検索ロジックではこの文字列と直接マッチングしようとしている
- **Impact**: arrayパラメータは受け取れるが、マッチング処理がないため結果が返らない
- **Fix Needed**:
  1. valueMatches関数でJSON配列フィールドの検索に対応する
  2. データの JSON 配列を解析してからマッチング判定を行う
  3. "or" 条件で複数値のいずれかに該当するかチェックする
- **Related Commits**: 4a87ab2 (parsingロジックは実装済み)

# Portfolio roadmap

`god-mode` является частью portfolio [`netkeep80`](https://github.com/netkeep80).

Portfolio-level направление, приоритет, lifecycle, cross-repo dependencies и следующий gate **намеренно не дублируются здесь**. Authoritative sources:

- [netkeep80/roadmap](https://github.com/netkeep80/roadmap) — главный portfolio control plane;
- [Current status](https://github.com/netkeep80/roadmap/blob/main/STATUS.md) — live GitHub state;
- [Execution order](https://github.com/netkeep80/roadmap/blob/main/EXECUTION.md) — cross-repo gates;
- [Architecture](https://github.com/netkeep80/roadmap/blob/main/ARCHITECTURE.md) — canonical ownership/dependencies.

Package code, tests и local consumer work остаются local implementation source of truth.

```text
roadmap decides portfolio direction;
this repository executes its local package work;
GitHub facts feed the central live status.
```

Связь God Mode / MetaMode / isocubic решается на portfolio level и не дублируется здесь как отдельная roadmap.

# Публикация пакета god-mode

## Обзор

Пакет `god-mode` публикуется на **npm** (`https://registry.npmjs.org`) с помощью автоматизированного CI/CD пайплайна на базе GitHub Actions. Поддерживаются два режима публикации: автоматический (через changesets) и ручной (через workflow_dispatch).

## Предварительные требования

### Настройка npm OIDC Trusted Publishing

Для автоматической публикации без секретов (`NPM_TOKEN`) используется [npm OIDC Trusted Publishing](https://docs.npmjs.com/generating-provenance-statements):

1. Зайдите на [npmjs.com](https://www.npmjs.com/) и создайте аккаунт (если ещё нет).
2. Создайте пакет `god-mode` вручную или при первой публикации.
3. Перейдите в настройки пакета → **Settings** → **Publishing access** → включите **Require two-factor authentication**.
4. В разделе **Trusted publishing** добавьте GitHub Actions:
   - **Repository owner**: `netkeep80`
   - **Repository name**: `god-mode`
   - **Workflow filename**: `release.yml`
   - **Environment**: _(оставьте пустым)_

> **Примечание**: Если OIDC trusted publishing недоступен для вашего npm-аккаунта, можно использовать классический `NPM_TOKEN`:
>
> 1. На npmjs.com создайте **Automation** токен: **Avatar** → **Access Tokens** → **Generate New Token** → **Classic Token** → тип **Automation**.
> 2. В GitHub-репозитории добавьте секрет: **Settings** → **Secrets and variables** → **Actions** → **New repository secret** с именем `NODE_AUTH_TOKEN` и значением токена.
> 3. В workflow `release.yml` добавьте в шаги публикации:
>    ```yaml
>    env:
>      NODE_AUTH_TOKEN: ${{ secrets.NODE_AUTH_TOKEN }}
>    ```

### Настройка GitHub Packages (опционально)

Если вы хотите дополнительно публиковать в [GitHub Packages npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry):

1. Пакет должен быть с областью видимости (scoped): `@netkeep80/god-mode`.
2. Добавьте в `package.json`:
   ```json
   {
     "name": "@netkeep80/god-mode",
     "publishConfig": {
       "registry": "https://npm.pkg.github.com"
     }
   }
   ```
3. Токен `GITHUB_TOKEN` предоставляется автоматически в GitHub Actions.

> **Рекомендация**: Для открытых библиотек, таких как `god-mode`, публикация на **npmjs.org** является стандартной практикой, так как это основной реестр для npm-пакетов. GitHub Packages лучше подходит для приватных или внутренних пакетов.

## Автоматическая публикация (через Changesets)

Основной рабочий процесс публикации:

### 1. Создание changeset

При внесении изменений создайте файл changeset:

```bash
npm run changeset
```

Или вручную создайте файл `.changeset/<random-name>.md`:

```markdown
---
'god-mode': minor
---

Описание изменений
```

Типы изменений:

- `patch` — исправления багов (0.2.1 → 0.2.2)
- `minor` — новая функциональность (0.2.1 → 0.3.0)
- `major` — ломающие изменения (0.2.1 → 1.0.0)

### 2. Создание Pull Request

```bash
git checkout -b feature/my-feature
# ... внесите изменения и создайте changeset ...
git add .
git commit -m "feat: описание изменений"
git push origin feature/my-feature
```

Создайте Pull Request в GitHub. CI автоматически:

- Проверит наличие changeset (`changeset-check`)
- Запустит линтинг и форматирование (`lint`)
- Запустит тесты на Ubuntu, macOS и Windows (`test`)

### 3. Мерж и автоматический релиз

После мержа PR в `main`, workflow `release` автоматически:

1. Проверяет наличие changeset-файлов
2. Объединяет несколько changesets (если есть)
3. Обновляет версию в `package.json` и `CHANGELOG.md`
4. Коммитит изменения в `main`
5. Публикует пакет на npm
6. Создаёт GitHub Release с заметками из CHANGELOG

## Ручная публикация (через GitHub Actions)

### Instant Release

Мгновенная публикация через GitHub Actions UI:

1. Перейдите в **Actions** → **Checks and release** → **Run workflow**
2. Выберите параметры:
   - **Release mode**: `instant`
   - **Bump type**: `patch` / `minor` / `major`
   - **Description**: описание релиза (опционально)
3. Нажмите **Run workflow**

Workflow автоматически:

- Обновит версию в `package.json`
- Обновит `CHANGELOG.md`
- Опубликует на npm
- Создаст GitHub Release

### Changeset PR

Создание PR с changeset через GitHub Actions UI:

1. Перейдите в **Actions** → **Checks and release** → **Run workflow**
2. Выберите параметры:
   - **Release mode**: `changeset-pr`
   - **Bump type**: `patch` / `minor` / `major`
   - **Description**: описание релиза (опционально)
3. Нажмите **Run workflow**
4. Будет создан PR с changeset-файлом
5. После мержа PR произойдёт автоматический релиз (см. выше)

## Локальная публикация (для отладки)

Если нужно опубликовать вручную с локальной машины:

```bash
# 1. Убедитесь, что все проверки проходят
npm run check
npm run typecheck
npm test

# 2. Войдите в npm
npm login

# 3. Проверьте содержимое пакета
npm pack --dry-run

# 4. Опубликуйте
npm publish --access public
```

## Первая публикация

Для первой публикации нового пакета на npm:

1. Убедитесь, что имя `god-mode` свободно на npmjs.com.
2. Настройте OIDC trusted publishing (см. выше) или `NPM_TOKEN`.
3. Выполните **Instant Release** через GitHub Actions с типом `patch`.
4. Проверьте, что пакет появился на `https://www.npmjs.com/package/god-mode`.

## CI/CD пайплайн

### Триггеры

| Событие             | Что запускается                                |
| ------------------- | ---------------------------------------------- |
| Push в `main`       | Lint + Test + Release (если есть changesets)   |
| Pull Request        | Detect changes + Changeset check + Lint + Test |
| `workflow_dispatch` | Instant Release или Changeset PR               |

### Оптимизация: пропуск для \*.md файлов

Изменение только `*.md` файлов (документация) **не запускает** lint, тесты и релиз. Это определяется скриптом `scripts/detect-code-changes.mjs`, который исключает из проверки:

- Все `*.md` файлы
- Папку `.changeset/`
- Папку `docs/`
- Папку `experiments/`
- Папку `examples/`

### Схема пайплайна

```
Push to main ──→ Detect Changes ──→ Lint ──→ Test ──→ Release ──→ npm + GitHub Release
                                      │         │
Pull Request ──→ Detect Changes ──→ Changeset ──┘
                                   Check
```

## Структура файлов релиза

```
scripts/
├── check-changesets.mjs        # Проверка наличия changeset-файлов
├── check-version.mjs           # Проверка ручных изменений версии
├── create-github-release.mjs   # Создание GitHub Release
├── create-manual-changeset.mjs # Создание changeset для ручного релиза
├── detect-code-changes.mjs     # Определение типа изменённых файлов
├── format-github-release.mjs   # Форматирование заметок релиза
├── format-release-notes.mjs    # Форматирование заметок из CHANGELOG
├── instant-version-bump.mjs    # Мгновенное обновление версии
├── js-paths.mjs                # Утилита определения путей JS-пакета
├── merge-changesets.mjs        # Объединение нескольких changesets
├── publish-to-npm.mjs          # Публикация на npm с OIDC
├── setup-npm.mjs               # Обновление npm для OIDC
├── validate-changeset.mjs      # Валидация changeset в PR
└── version-and-commit.mjs      # Обновление версии и коммит

.changeset/
├── config.json                 # Конфигурация changesets
└── README.md                   # Документация changesets

.github/workflows/
└── release.yml                 # CI/CD пайплайн
```

## Полезные команды

```bash
# Проверка статуса changesets
npm run changeset:status

# Создание нового changeset
npm run changeset

# Обновление версии (локально, без коммита)
npm run changeset:version

# Проверка содержимого пакета перед публикацией
npm pack --dry-run

# Все проверки качества кода
npm run check        # lint + format + duplication
npm run typecheck    # TypeScript
npm test             # Vitest
```

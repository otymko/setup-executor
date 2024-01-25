# setup-executor

Действие `setup-executor` позволяет в ваших Github Action использовать скриптовый движок [1С:Исполнитель](https://developer.1c.ru/applications/Console?state=executordownload). Скачивание дистрибутивов ведется с сайта [developer.1c.ru](https://developer.1c.ru/applications/Console?state=executordownload).

## Использование

Описание действия [action.yml](action.yml)

Токен для скачивания дистрибутива необходимо заранее создать в разделе `API для скачивания` на сайте [developer.1c.ru](https://developer.1c.ru/applications/Console?state=executordownload). Затем этот токен необходимо поместить в секреты вашего проекта/организации.

### Базовый пример

```yaml
- uses: actions/checkout@v4
- uses: otymko/setup-executor@v1
  with:
    version: stable # Требуемая версия 1С:Исполнитель
    token: ${{ secrets.SECRET_WITH_TOKEN}} # Токен для скачивания с developer.1c.ru
- run: executor /path/to/script/test.sbsl
```

Параметр `version` поддерживает следующие значения:
* номер версии, например, `3.0.2.2`
* stable (последняя стабильная релизная версия)
* preview (версия для ознакомления)

Со списком всех доступных версий можно ознакомиться на сайте [developer.1c.ru](https://developer.1c.ru/applications/Console?state=executordownload).

### Использование matrix

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    environment: main # ваш профиль окружения с секретами
    strategy:
      matrix:
        version: [4.0.6.7, stable] # версии дистрибутивов 1С:Исполнитель
    name: Тестирование проекта
    steps:
      - uses: actions/checkout@v4

      - name: Установка 1С:Исполнитель
        uses: otymko/setup-executor@v1
        with:
          version: ${{ matrix.version }}
          token: ${{ secrets.SECRET_WITH_TOKEN}} # Токен для скачивания с developer.1c.ru

      - run: executor /path/to/script/test.sbsl
```

# Лицензия

Данный проект размещен под лицензией [MIT License](LICENSE)

# Контрибьютерам

Доработка проводится по git-flow.

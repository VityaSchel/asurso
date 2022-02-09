# Неофициальный API АСУ РСО и NetSchool

Сделан мной потому что я хотел посмотреть что у меня выйдет по информатике если я забью на все контрольные по питону.

С новым годом кста

![image](https://user-images.githubusercontent.com/59040542/149971284-551c7d68-7ae1-4430-831f-f352aa8b2aae.png)

<!-- TOC-START -->
## Таблица контента

- [Неофициальный API АСУ РСО](#неофициальный-api-асу-рсо)
  - [Установка](#установка)
  - [Использование](#использование)
  - [Функции](#функции)
    - [Что умеет эта библиотека](#что-умеет-эта-библиотека)
    - [TODO:](#todo)
  - [Документация](#документация)
  - [Примеры](#примеры)
  - [Contributing](#contributing)
  - [Лицензия](#лицензия)
  - [Донатик мне пжпж](#донатик-мне-пжпж)
<!-- TOC-END -->

## Установка

```
npm i asurso
```

## Использование

Все ID вы можете найти в файле [LOGINIDS.md](LOGINIDS.md), а мои заметки о том, как я реверс-инженерил апи в [HOWITWORKS.md](HOWITWORKS.md)

```javascript
import ASURSO from "asurso"

const api = new ASURSO({
  countryID: 2,
  regionID: 1,
  regionAreaID: -1,
  cityID: 2,
  schoolTypeID: 2,
  schoolID: 257,
  login: "ЩелочковВ",
  password: "..."
})

await api.login()

// Вызов других методов, описанных ниже
```

## Функции

### Что умеет эта библиотека

Фича|Статус
---|---
Вход в аккаунт|:white_check_mark:
Создание сессии после входа|:white_check_mark:
Получение дневника: дз, оценки|:white_check_mark:
Получение файлов в дневнике|:white_check_mark:
Получение профиля пользователей|:white_check_mark:
Получение пользователей онлайн|:white_check_mark:
Получение почты|:white_check_mark:
Отправка почты|:white_check_mark:
Получение новостей|:white_check_mark:
Получение файлов из новостей|:white_check_mark:
Получение портфолио (портрет, достижения, коллектор, рабочие материалы)|:white_check_mark:
Получение файлов из портфолио|:white_check_mark:
Получение тем на форуме|:white_check_mark:
Создание тем на форуме|:hourglass_flowing_sand:
Чтение сообщений в темах на форуме|:white_check_mark:
Отправка сообщений в темы на форуме|:hourglass_flowing_sand:
Загрузка и удаление файлов|:hourglass_flowing_sand:
Генерация, скачивание и парсинг отчетов|:white_check_mark:

С версии 0.2.3 добавлены тесты Jest, покрытие кода: 2.59%

### TODO:

- [x] Сделать работающий как часы вход
- [x] Переместить документацию в отдельный файл, чтобы оптимизировать размер пакета
- [x] Вместо скачивания файла, полученного из generateReport сделать интерфейс ReportFile с методами download и parse
- [x] Добавить метод подсчета средней оценки из массива по методике системы АСУ РСО
- [x] Нормально организовать сет тестов (unit-тесты, e2e, примеры)
- [ ] Написать примеры
- [ ] Найти кого-нибудь, кто напишет на этой библиотеке свой проект
- [ ] Написать статью об этой ситуации и опубликовать куда-нибудь

## Документация

[Перейти к документации](/DOCS.md)

## Примеры

Добавлю позже

## Contributing

Если вы видите это через 5 лет то просто лучше сделайте форк и развивайте его.

## Лицензия

MIT aka не знаю других лицензий

## Донатик мне пжпж

Если вы домотали до конца, вам должно быть интересна данная библиотека так вот я делал ее днем и ночью, беспощадно теряя свое свободное время на такую ерунду, и никто из команды АСУ РСО мне не заплатил. Поэтому если вам не сложно скиньте мне денюжку на аренду сервера 🥺  [hloth.dev/donate](https://hloth.dev/donate)

# Неофициальный API АСУ РСО

Сделан мной потому что я хотел посмотреть что у меня выйдет по информатике если я забью на все контрольные по питону.

С новым годом кста

![image](https://user-images.githubusercontent.com/59040542/149536440-1409c8a3-3cb6-4dc4-92e3-120db4dbd4b1.png)

<!-- TOC-START -->
## Таблица контента

- [Неофициальный API АСУ РСО](#неофициальный-api-асу-рсо)
  - [Установка](#установка)
  - [Использование](#использование)
  - [Функции](#функции)
    - [Что умеет эта библиотека](#что-умеет-эта-библиотека)
    - [TODO:](#todo)
  - [Документация](#документация)
    - [login(tokens?: TokensObject): Promise&lt;TokensObject&gt;](#logintokens-tokensobject-promisetokensobject)
    - [Interface TokensObject](#interface-tokensobject)
    - [getDiary(yearId: number, start: Date, end: Date, withLaAssigns?: boolean = false): Promise&lt;Diary&gt;](#getdiaryyearid-number-start-date-end-date-withlaassigns-boolean--false-promisediary)
    - [Interface Diary](#interface-diary)
    - [Interface DiaryDay](#interface-diaryday)
    - [Interface DiaryDayLesson](#interface-diarydaylesson)
    - [Interface Assignment](#interface-assignment)
    - [Interface Mark](#interface-mark)
    - [getStudentId(): Promise&lt;Number&gt;](#getstudentid-promisenumber)
    - [getAssignmentDetails(assignmentID: number): Promise&lt;AssignmentDetails&gt;](#getassignmentdetailsassignmentid-number-promiseassignmentdetails)
    - [Interface AssignmentDetails](#interface-assignmentdetails)
    - [getUserProfile(studentID?: number = this.studentID): Promise&lt;Profile&gt;](#getuserprofilestudentid-number--thisstudentid-promiseprofile)
    - [Interface Profile](#interface-profile)
    - [getUsersOnline(): Promise&lt;Array&lt;OnlineUser&gt;&gt;](#getusersonline-promisearrayonlineuser)
    - [Interface OnlineUser](#interface-onlineuser)
    - [getAnnouncements(take: number, fullVersion?: boolean = false): Promise&lt;Array&lt;Announcement&gt;&gt;](#getannouncementstake-number-fullversion-boolean--false-promisearrayannouncement)
    - [Interface Announcement](#interface-announcement)
    - [Interface AnnouncementAttachment](#interface-announcementattachment)
    - [downloadAnnouncementAttachment(attachmentID: number): Promise&lt;FetchResponse&gt;](#downloadannouncementattachmentattachmentid-number-promisefetchresponse)
    - [getPortfolio(userID?: number = this.studentID): Promise&lt;Portfolio&gt;](#getportfoliouserid-number--thisstudentid-promiseportfolio)
    - [Interface Portfolio](#interface-portfolio)
    - [Interface PortfolioSection](#interface-portfoliosection)
    - [getMessages(folderID = 1, startIndex = 0, pageSize = 100, sort = 'Sent DESC'): Promise&lt;MessagesResult&gt;](#getmessagesfolderid--1-startindex--0-pagesize--100-sort--sent-desc-promisemessagesresult)
    - [Interface MessagesResult](#interface-messagesresult)
    - [Interface Message](#interface-message)
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
import ASURSO from "asurso";

const api = new ASURSO({
  countryID: 2,
  regionID: 1,
  regionAreaID: -1,
  cityID: 2,
  schoolTypeID: 2,
  schoolID: 257,
  login: "ЩелочковВ",
  password: "..."
});

await api.login();

// Вызов других методов, описанных ниже
```

## Функции

### Что умеет эта библиотека

Фича|Статус
---|---
Вход в аккаунт|✅
Создание сессии после входа|✅
Получение дневника: дз, оценки|✅
Получение файлов в дневнике|✅
Получение профиля пользователей|✅
Получение пользователей онлайн|✅
Получение почты|⌛️
Отправка почты|⌛️
Получение новостей|✅
Получение файлов из новостей|✅
Получение портфолио (портрет, достижения, коллектор, рабочие материалы)|⌛️
Получение файлов из портфолио|⌛️
Получение тем на форуме|⌛️
Создание тем на форуме|⌛️
Отправка сообщений в темы на форуме|⌛️
Загрузка файлов|⌛️

### TODO:

- ~Сделать работающий как часы вход~
- Переместить документацию в отдельный файл, чтобы оптимизировать размер пакета
- Нормально организовать сет тестов (unit-тесты, e2e, примеры)
- Написать примеры
- Найти кого-нибудь, кто напишет на этой библиотеке свой проект
- Написать статью об этой ситуации и опубликовать куда-нибудь

## Документация

### login(tokens?: TokensObject): Promise&lt;TokensObject&gt;

Метод, который нужно вызвать перед использованием библиотеки. Создает новую сессию при помощи указанных в конструкторе данных, если не передан объект tokens, иначе использует существующую сессию.

### Interface TokensObject

Объект с данными для авторизации пользователя.

Поля:

-   atKey: string (Ключ at, пересылаемый в заголовке)
-   sessionToken: string (Токен авторизации, получаемый из куки браузера)

Пример:

```javascript
{
  atKey: "4012341777721575425550192";
  sessionToken: "ESRNSECR93481=ea2dsfidhksf1o239fsusdfhj-ahliwen1";
}
```

### getDiary(yearId: number, start: Date, end: Date, withLaAssigns?: boolean = false): Promise&lt;Diary&gt;

Пример:

```javascript
{
  className: "1а",
  laAssigns: [],
  termName: "1 четверть",
  weekDays: [
    {
      date: "2022-01-17T00:00:00",
      lessons: [
        {
          classmeetingId: 224102627,
          day: "2022-01-17T00:00:00",
          number: 1,
          relay: 1,
          room: null,
          startTime: "10:00",
          endTime: "10:45",
          subjectName: "Физика",
          assignments: [
            {
              id: 228719822,
              typeId: 3,
              assignmentName: "№694,697",
              weight: 0,
              dueDate: "2022-01-17T00:00:00",
              classMeetingId: 224102627,
              mark: {
                assignmentId: 225998115,
                studentId: 592640,
                mark: 5,
                resultScore: null,
                dutyMark: false
              }
            }
          ],
          isEaLesson: false
        },
        ...
      ]
    },
    ...
  ],
  weekEnd: "2022-01-23T00:00:00",
  weekStart: "2022-01-17T00:00:00"
}
```

### Interface Diary

Объект с данными из дневника. Содержит уроки и оценки.

Поля:

-   className: string (Имя класса)
-   laAssigns: Array&lt;?&gt; (Неизвестно)
-   termName: string (Описание дат, например четверть или полугодие)
-   weekDays: Array&lt;DiaryDay&gt; (Дни в дневнике)
-   weekStart: string (Начало дат)
-   weekEnd: string (Конец дат)

### Interface DiaryDay

Объект с данными о дне из дневника. Находится в Diary

Поля:

-   date: string (Дата в формате ISO)
-   lessons: Array&lt;DiaryDayLesson&gt; (Уроки в дне)

### Interface DiaryDayLesson

Объект с данными об уроке в дне в дневнике. Находится в DiaryDay.

Поля:

-   classmeetingId: number (ID урока)
-   day: string (Дата урока)
-   number: number (Порядковый номер урока в дне)
-   subjectName: string (Название урока)
-   relay: number (Неизвестно)
-   room: number | null (Номер аудитории)
-   startTime: string (Время старта урока)
-   endTime: string (Время окончания урока)
-   assignments: Array&lt;Assignment&gt; (Занятие на уроке)

### Interface Assignment

Объект с данными о задании на уроке. Например, домашнее задание или контрольная работа. Находится в DiaryDayLesson.

Известные типы заданий на данный момент:

| typeId | Задание                |
| ------ | ---------------------- |
| 3      | Домашнее задание       |
| 4      | Контрольная работа     |
| 5      | Самостоятельная работа |

Поля:

-   id: number (ID задания)
-   typeId: number (Тип задания)
-   assignmentName: string (Название задания или содержание)
-   weight: number (Вес оценки, но он всегда равен 0),
-   dueDate: string (Дата задания, до которого его надо сдать),
-   classMeetingId: number (ID из DiaryDayLesson),
-   mark?: Mark (Информация об оценке)

### Interface Mark

Объект с данными об оценке за задание. Находится в Assignment.

Вес оценки почему-то всегда равен 0, для того, чтобы получить настоящий вес (10/20/40), необходимо запросить информацию об уроке через отдельный метод getAssignmentDetails()

Поля:

-   assignmentId: number (ID задания из Assignment),
-   studentId: number (ID студента),
-   mark: number (Оценка от 1 до 5 и еще есть точка, но я не знаю какой у нее номер),
-   resultScore: ? | null (Неизвестно),
-   dutyMark: boolean (Неизвестно)

### getStudentId(): Promise&lt;Number&gt;

Получить ID студента, который авторизован в данный момент с помощью запроса на сервер. Вызывается внутри login(). Если вы хотите установить studentId самостоятельно, делайте это сразу после вызова await login() через свойство экземпляра apiInstance.studentID.

### getAssignmentDetails(assignmentID: number): Promise&lt;AssignmentDetails&gt;

Получить подробную информацию о задании на уроке.

Пример:

```javascript
{
  id: 226673369,
  assignmentName: "Спортивные игры: баскетбол. Основные фолы в баскетболе",
  activityName: null,
  problemName: null,
  subjectGroup: {
    id: 5331335,
    name: "1а/Физическая культура"
  },
  teachers: [
    {
      id: 593083,
      name: "Иванов Иван Иванович"
    }
  ],
  productId: null,
  isDeleted: false,
  weight: 10,
  date: "2021-12-22T00:00:00",
  description: null,
  attachments: []
}
```

### Interface AssignmentDetails

Подробная информация о задании на уроке.

Поля:

-   id: number (ID задания на уроке)
-   assignmentName: string (Тема задания на уроке)
-   activityName: ? | null (Неизвестно)
-   problemName: ? | null (Неизвестно)
-   subjectGroup: object&lt;{ id: number (ID урока), name: string (Класс и название урока) }&gt; (Урок)
-   teachers: Array&lt;object&lt;{ id: number (ID учителя), name: string (Имя учителя) }&gt;&gt; (Учителя)
-   productId: ? | null (Неизвестно)
-   isDeleted: boolean (Неизвестно)
-   weight: number (Вес оценки: 10/20/40)
-   date: string (Дата)
-   description: ? | null (Неизвестно)
-   attachments: Array&lt;?&gt; (Неизвестно)

### getUserProfile(studentID?: number = this.studentID): Promise&lt;Profile&gt;

Получение профиля пользователя по studentID. Если оставить пустым аргумент метода, будет возвращен профиль авторизованного пользователя.

### Interface Profile

Объект с информацией о пользователе, полученной через метод getUserProfile

Поля:

-   id: number (Неизвестно)
-   studentId: number (ID студента)
-   startDate: string (Наверное кто что то перепутал)
-   endDate: string
-   status: object&lt;{ id: number, name: string }&gt; (Неизвестно)
-   statusStr: string (Неизвестно)
-   number: string (Неизвестно)
-   studentFirstName: null
-   studentLastName: null
-   studentMiddleName: null
-   studentFio: null
-   studentBirthDate: null
-   currentMunicipalitet: null
-   addCertifCategoryId: null
-   addCertifCategoryName: null
-   parentEmail: null
-   pdf: null

Пример:

```javascript
{
  id: 0,
  studentId: 592640,
  startDate: "0001-01-01T00:00:00",
  endDate: "0001-01-01T00:00:00",
  status: {
      id: 0,
      name: "Заморожен"
  },
  statusStr: "Не использован",
  number: "4762607874",
  studentFirstName: null,
  studentLastName: null,
  studentMiddleName: null,
  studentFio: null,
  studentBirthDate: null,
  currentMunicipalitet: null,
  addCertifCategoryId: null,
  addCertifCategoryName: null,
  parentEmail: null,
  pdf: null
}
```

### getUsersOnline(): Promise&lt;Array&lt;OnlineUser&gt;&gt;

Получение списка пользователей, которые сейчас онлайн в системе.

### Interface OnlineUser

Поля:

-   schoolId: number (ID образовательной организации)
-   eoName: null (Неизвестно)
-   at: null (Неизвестно)
-   userId: number (ID пользователя)
-   loginName: null (Неизвестно)
-   nickName: string (Имя пользователя)
-   loginTime: null (Неизвестно)
-   lastAccessTime: string (Ненужная дата)
-   ip: null (Предположительно, IP-адрес пользователя, виден администратору)
-   roles: string (Роли пользователя)
-   eMs: string (Название администратора сети)
-   timeOut: number (Тайм-аут)

Пример:

```javascript
{
  schoolId: 257,
  eoName: null,
  at: null,
  userId: 123456,
  loginName: null,
  nickName: "Щелочков Виктор",
  loginTime: null,
  lastAccessTime: "0001-01-01T00:00:00",
  ip: null,
  roles: "Ученик",
  eMs: "Самарское управление МОиН СО",
  timeOut: 3600
}
```

### getAnnouncements(take: number, fullVersion?: boolean = false): Promise&lt;Array&lt;Announcement&gt;&gt;

Получение новостей с главной страницы, переменная take указывает количество новостей, которое необходимо вернуть, а fullVersion выполняет неизвестную функцию, которая ничего в ответе от API не меняет.

### Interface Announcement

Объект, содержащий данные о новости, получаемой с помощью getAnnouncements()

Поля:
- id: number (ID новости)
- name: string (Название новости)
- description: string (Описание новости в HTML)
- postDate: string (Дата публикации)
- deleteDate: null | string (Дата удаления)
- author: object&lt;{ id: number, fio: string, nickName: string }&gt; (Автор новости)
- em: null (Неизвестно)
- recipientInfo: null (Неизвестно)
- attachments: Array&lt;AnnouncementAttachment&gt; (Приложенные к новости файлы)

Пример:

```javascript
{
  description: "<p>График</p>",
  postDate: "2022-01-14T09:51:45.563",
  deleteDate: null,
  author: {
    id: 587356,
    fio: "Владимерко Яна Владимировна",
    nickName: "Владимерко Яна Владимировна"
  },
  em: null,
  recipientInfo: null,
  attachments: [],
  id: 468091,
  name: "График"
}
```

### Interface AnnouncementAttachment

Поля:
- id: number (ID приложенного файла)
- name: string (Название файла)
- originalFileName: string (Имя загруженного файла лол)
- description: null | string (Описание файла)

Примеры:

```javascript
{
  id: 15016512,
  name: "график 2022.doc",
  originalFileName: "график-сетка 2022 3ч.doc",
  description: null
}
```

```javascript
{
  id: 15016513,
  name: "График.docx",
  originalFileName: "График.docx",
  description: null
}
```

```javascript
{
  id: 15016517,
  name: "График КР_начальная школа.doc",
  originalFileName: "График КР_начальная школа.doc",
  description: null
}
```

### downloadAnnouncementAttachment(attachmentID: number): Promise&lt;FetchResponse&gt;

Скачать приложенный к новости файл. В ответ возвращается обычный ответ от fetch, его нужно парсить с помощью buffer, а дальше уже можно сохранить с помощью fs или blob в зависимости от того, в каком окружении вы используете библиотеку (node или браузер).

### getPortfolio(userID?: number = this.studentID): Promise&lt;Portfolio&gt;

Получить портфолио пользователя. Если не указан userID, то вернется портфолио текущего пользователя, а если указан, то вы получите null и ошибку библиотеки, потому что вы не администратор системы.



### Interface Portfolio

Объект содержащий данные о портфолио пользователя.

Имейте в виду, что в системе можно создавать собственные разделы.

Поля:
- id: number (ID портфолио)
- name: null (Название портфолио)
- groups: Array&lt;PortfolioSection&gt; (Массив с разделами портфолио)

Пример:
```javascript
{
  id: 291003,
  name: null,
  groups: [],
}
```

### Interface PortfolioSection

Объект, содержащий данные о разделе портфолио.

Примеры:
```javascript
{
  parentGroupId: 2457271,
  order: 1,
  links: [],
  docs: [],
  accessType: null,
  groups: [],
  id: 2457272,
  name: "Портрет"
}
```

```javascript
{
  parentGroupId: 2457271,
  order: 2,
  links: [
    {
      id: 236941,
      url: "https://utidteam.com"
    }
  ],
  docs: [],
  accessType: null,
  groups: [],
  id: 2457273,
  name: "Достижения"
}
```

```javascript
{
  parentGroupId: 2457271,
  order: 3,
  links: [],
  docs: [],
  accessType: null,
  groups: [],
  id: 2457274,
  name: "Коллектор"
}
```

```javascript
{
  parentGroupId: 2457271,
  order: 4,
  links: [],
  docs: [],
  accessType: null,
  groups: [],
  id: 2457275,
  name: "Рабочие материалы"
}
```

### getMessages(folderID = 1, startIndex = 0, pageSize = 100, sort = 'Sent DESC'): Promise&lt;MessagesResult&gt;

ПОКА НЕ РАБОТАЕТ, нужно разобраться как логиниться в почту

Получение сообщений из почты АСУ РСО. Необходимо указать папку, стартовый индекс, размер возвращаемого массива писем и сортировку.

| ID папки | Название папки |
| -------- | -------------- |
| 1        | Входящие       |
| 2        | Черновики      |
| 3        | Отправленные   |
| 4        | Удаленные      |

Сортировка составляется из двух слов: поле, по которому производится сортировка + пробел + ASC/DESC

| Поле     | Название поля |
| -------- | ------------- |
| FromName | От кого       |
| Subj     | Тема письма   |
| Sent     | Дата отправки |

### Interface MessagesResult

Объект с результатами запроса метода getMessages, содержит данные о письмах.

Поля:

-   Records: Array&lt;Message&gt; (Письма)
-   TotalRecordCount: number (Общее кол-во писем у пользователя)
-   ResultStatus: number (ID статуса результата)
-   Result: string (Строка со статусом запроса)

Пример:

```javascript
{
  Records: [],
  TotalRecordCount: 2,
  ResultStatus: 0,
  Result: "OK"
}
```

### Interface Message

Объект с данными письма из внутренней почты АСУ РСО.

Поля:

-   MessageId: number (ID письма)
-   FromName: string (От кого)
-   FromEOName: string (Неизвестно)
-   Subj: string (Тема письма)
-   Sent: string (Дата отправки)
-   Read: string (Y или N в зависимости от того, было ли прочитано письмо)
-   SentTo: string (Кому отправлено)

Примеры:

```javascript
{
  MessageId: 20606329,
  FromName: "кто (школа)",
  FromEOName: "",
  Subj: "Re:",
  Sent: "27.12.2021 9:05",
  Read: "Y",
  SentTo: "кому (класс, школа)"
}
```

```javascript
{
  MessageId: 14476819,
  FromName: "Администратор системы",
  FromEOName: "",
  Subj: "Отчет об успеваемости и посещаемости ученика",
  Sent: "23.10.2020 21:07",
  Read: "Y",
  SentTo: "Щелочков Виктор"
}
```

## Примеры

Добавлю позже

## Contributing

Если вы видите это через 5 лет то просто лучше сделайте форк и развивайте его.

## Лицензия

MIT aka не знаю других лицензий

## Донатик мне пжпж

Если вы домотали до конца, вам должно быть интересна данная библиотека так вот я делал ее днем и ночью, беспощадно теряя свое свободное время на такую ерунду, и никто из команды АСУ РСО мне не заплатил. Поэтому если вам не сложно скиньте мне денюжку на аренду сервера 🥺  [hloth.dev/donate](https://hloth.dev/donate)

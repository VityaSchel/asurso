# Неофициальный API АСУ РСО

Сделан мной потому что я хотел посмотреть что у меня выйдет по информатике если я забью на все контрольные по питону.

## Таблица контента

-   [Установка](#установка)
-   [Использование](#использование)
-   [Документация](#документация)

    -   [login(tokens?: TokensObject): Promise](#logintokens-tokensobject-promise)
    -   [Interface TokensObject](#interface-tokensobject)
    -   [getDiary(yearId: number, start: Date, end: Date, withLaAssigns?: boolean = false): Promise](#getdiaryyearid-number-start-date-end-date-withlaassigns-boolean--false-promise)
    -   [Interface Diary](#interface-diary)
    -   [Interface DiaryDay](#interface-diaryday)
    -   [Interface DiaryDayLesson](#interface-diarydaylesson)
    -   [Interface Assignment](#interface-assignment)
    -   [Interface Mark](#interface-mark)
    -   [getStudentId(): Promise](#getstudentid-promise)
    -   [getAssignmentDetails(assignmentID): Promise](#getassignmentdetailsassignmentid-promise)
    -   [Interface AssignmentDetails](#interface-assignmentdetails)
    -   [getUserProfile(studentID?: number = this.studentID): Promise](#getuserprofilestudentid-number--thisstudentid-promise)
    -   [Interface Profile](#interface-profile)
    -   [getUsersOnline(): Promise<Array>](#getusersonline-promisearray)
    -   [Interface OnlineUser](#interface-onlineuser)
-   [getMessages(folderID = 1, startIndex = 0, pageSize = 100, sort = 'Sent DESC'): Promise](#getmessagesfolderid--1-startindex--0-pagesize--100-sort--sent-desc-promise)
-   [Примеры](#примеры)

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

## Документация

### login(tokens?: TokensObject): Promise<TokensObject>

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

### getDiary(yearId: number, start: Date, end: Date, withLaAssigns?: boolean = false): Promise<Diary>

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
-   laAssigns: Array<?> (Неизвестно)
-   termName: string (Описание дат, например четверть или полугодие)
-   weekDays: Array<DiaryDay> (Дни в дневнике)
-   weekStart: string (Начало дат)
-   weekEnd: string (Конец дат)

### Interface DiaryDay

Объект с данными о дне из дневника. Находится в Diary

Поля:

-   date: string (Дата в формате ISO)
-   lessons: Array<DiaryDayLesson> (Уроки в дне)

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
-   assignments: Array<Assignment> (Занятие на уроке)

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

### getStudentId(): Promise<Number>

Получить ID студента, который авторизован в данный момент с помощью запроса на сервер. Вызывается внутри login(). Если вы хотите установить studentId самостоятельно, делайте это сразу после вызова await login() через свойство экземпляра apiInstance.studentID.

### getAssignmentDetails(assignmentID: number): Promise<AssignmentDetails>

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
-   subjectGroup: object<{ id: number (ID урока), name: string (Класс и название урока) }> (Урок)
-   teachers: Array<object<{ id: number (ID учителя), name: string (Имя учителя) }>> (Учителя)
-   productId: ? | null (Неизвестно)
-   isDeleted: boolean (Неизвестно)
-   weight: number (Вес оценки: 10/20/40)
-   date: string (Дата)
-   description: ? | null (Неизвестно)
-   attachments: Array<?> (Неизвестно)

### getUserProfile(studentID?: number = this.studentID): Promise<Profile>

Получение профиля пользователя по studentID. Если оставить пустым аргумент метода, будет возвращен профиль авторизованного пользователя.

### Interface Profile

Объект с информацией о пользователе, полученной через метод getUserProfile

Поля:

-   id: number (Неизвестно)
-   studentId: number (ID студента)
-   startDate: string (Наверное кто что то перепутал)
-   endDate: string
-   status: object<{ id: number, name: string }> (Неизвестно)
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

### getUsersOnline(): Promise<Array<OnlineUser>>

Получение списка пользователей, которые сейчас онлайн в системе.

### Interface OnlineUser

Поля:

- schoolId: number (ID образовательной организации)
- eoName: null (Неизвестно)
- at: null (Неизвестно)
- userId: number (ID пользователя)
- loginName: null (Неизвестно)
- nickName: string (Имя пользователя)
- loginTime: null (Неизвестно)
- lastAccessTime: string (Ненужная дата)
- ip: null (Предположительно, IP-адрес пользователя, виден администратору)
- roles: string (Роли пользователя)
- eMs: string (Название администратора сети)
- timeOut: number (Тайм-аут)

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

## getMessages(folderID = 1, startIndex = 0, pageSize = 100, sort = 'Sent DESC'): Promise<MessagesResult>

<https://asurso.ru/asp/ajax/GetMessagesAjax.asp?AT=-------&nBoxID=1&jtStartIndex=0&jtPageSize=100&jtSorting=Sent%20DESC>

{
"Records": [
{
"MessageId": 20606329,
"FromName": "кто (школа)",
"FromEOName": "",
"Subj": "Re:",
"Sent": "27.12.2021 9:05",
"Read": "Y",
"SentTo": "кому (класс, школа)"
},
{
"MessageId": 14476819,
"FromName": "Администратор системы",
"FromEOName": "",
"Subj": "Отчет об успеваемости и посещаемости ученика",
"Sent": "23.10.2020 21:07",
"Read": "Y",
"SentTo": "Щелочков Виктор"
}
],
"TotalRecordCount": 2,
"ResultStatus": 0,
"Result": "OK"
}

AT: ----
nBoxID: 1
jtStartIndex: 0
jtPageSize: 100
jtSorting: Sent DESC

## Примеры

Добавлю позже

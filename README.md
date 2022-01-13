# Неофициальный API АСУ РСО

Сделан мной потому что я хотел посмотреть что у меня выйдет по информатике если я забью на все контрольные по питону.

## Установка 

```
npm i asurso
```

## Использование

Все ID вы можете найти в файле [LOGINIDS.md](LOGINIDS.md), а мои заметки о том, как я реверс-инженерил апи в [HOWITWORKS.md](HOWITWORKS.md)

```javascript
import ASURSO from 'asurso'

const api = new ASURSO({
  countryID: 2,
  regionID: 1,
  regionAreaID: -1,
  cityID: 2,
  schoolTypeID: 2,
  schoolID: 257,
  login: 'ЩелочковВ',
  password: '...'
})

await api.login()

// Вызов других методов, описанных ниже

```

## Документация

### login(tokens?: TokensObject): Promise<TokensObject>

Метод, который нужно вызвать перед использованием библиотеки. Создает новую сессию при помощи указанных в конструкторе данных, если не передан объект tokens, иначе использует существующую сессию.

### TokensObject Interface

Объект с данными для авторизации пользователя.

Поля:
- atKey<String> Ключ at, пересылаемый в заголовке
- sessionToken<String> Токен авторизации, получаемый из куки браузера

Пример:

```javascript
{
  atKey: '4012341777721575425550192'
  sessionToken: 'ESRNSECR93481=ea2dsfidhksf1o239fsusdfhj-ahliwen1'
}
```

## Примеры

Добавлю позже
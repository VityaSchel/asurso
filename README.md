# Неофициальный API АСУ РСО

Сделан мной потому что я хотел посмотреть что у меня выйдет по информатике если я забью на все контрольные по питону.

## Установка 

```
npm i asurso
```

## Использование

```javascript
import ASURSO from 'asurso'

const api = new ASURSO({
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

Добавлю позже

## Примеры

Добавлю позже
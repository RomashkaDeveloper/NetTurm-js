# NetTurm Desktop App

Это desktop приложение для захвата веб-интерфейса с http://192.168.191.244:3000/ с поддержкой сохранения сессии.

## Требования

- Node.js[https://nodejs.org/dist/v22.17.1/node-v22.17.1-x64.msi] (рекомендуется версия 16.x или выше)
- npm (обычно устанавливается вместе с Node.js)

## Установка

1. Клонируйте репозиторий или скачайте исходный код
```bash
git clone https://github.com/RomashkaDeveloper/NetTurm-js
```
2. Откройте терминал в папке проекта
3. Установите зависимости:
```bash
npm install
```

## Запуск приложения для разработки

1. Убедитесь, что ваш веб-сервер запущен на http://192.168.191.244:3000/
2. Запустите приложение:
```bash
npm start
```

## Сборка приложения

Чтобы создать исполняемый файл (.exe):

```bash
npm run build
```

После сборки вы найдете готовые файлы в папке `dist`:
- `dist\win-unpacked\netturm.exe` - портативная версия (можно запускать сразу)
- `dist\netturm 1.0.0.exe` - установщик

## Особенности

- Сохранение сессии между запусками (не нужно заново авторизоваться после закрытия приложения)
- Портативная версия не требует установки
- Поддержка пользовательской иконки (положите файл `icon.png` в корневую папку проекта)

## Структура проекта

- `main.js` - основной файл приложения
- `package.json` - конфигурация проекта и зависимости
- `icon.png` - иконка приложения

## Решение проблем

Если при сборке возникают ошибки:
1. Убедитесь, что все зависимости установлены (`npm install`)
2. Проверьте наличие файла `icon.png` в корневой папке проекта
3. Убедитесь, что у вас есть права администратора для сборки

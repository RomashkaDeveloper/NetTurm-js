@echo off
echo Установка зависимостей...
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo Ошибка при установке зависимостей.
    exit /b %ERRORLEVEL%
)

echo Сборка проекта...
npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo Ошибка при сборке проекта.
    exit /b %ERRORLEVEL%
)

echo Готово!
pause
@echo off
setlocal
cd /d "%~dp0"
echo.
echo Uruchamiam sklep-projekty-domow lokalnie...
echo.
echo Adres strony po starcie:
echo   http://localhost:3000
echo.
echo Jesli port 3000 jest zajety, Next.js poda alternatywny adres w terminalu.
echo Aby zatrzymac serwer, nacisnij CTRL+C.
echo.
npm run dev

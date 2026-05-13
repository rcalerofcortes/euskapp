@echo off
echo ========================================
echo  EuskApp - Servidor Web Local
echo ========================================
echo.
echo Iniciando servidor en http://localhost:8000
echo.
echo Abre tu navegador en: http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo ========================================
echo.

REM Intentar con Python
python -m http.server 8000 2>nul
if %ERRORLEVEL% NEQ 0 (
    python3 -m http.server 8000 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Python no esta instalado
        echo.
        echo Por favor instala Python desde: https://www.python.org/downloads/
        echo O usa la extension "Live Server" de VS Code
        pause
    )
)

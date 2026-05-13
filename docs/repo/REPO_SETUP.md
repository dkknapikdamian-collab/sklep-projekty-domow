# Repo setup

## Nazwa repo

Rekomendowana nazwa:

```txt
sklep-projekty-domow
```

Jeśli repo ma być w organizacji:

```txt
dkknapikdamian-collab/sklep-projekty-domow
```

## Lokalny folder

```txt
C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami
```

## Start lokalny

```powershell
cd "C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami"
git init
git add .
git commit -m "Initial project foundation: design lock and production plan"
```

## Utworzenie repo przez GitHub CLI

Jeśli `gh` jest zalogowany:

```powershell
gh repo create dkknapikdamian-collab/sklep-projekty-domow --private --source . --remote origin --push
```

Jeśli repo ma być publiczne, zmienić `--private` na `--public`.

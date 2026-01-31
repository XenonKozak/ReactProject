# Aplikacja do Rezerwacji Biletów Kinowych

Aplikacja internetowa typu full-stack do przeglądania filmów i rezerwacji biletów, zbudowana w oparciu o stos technologiczny MERN.

## 🚀 Funkcje

- **Przeglądanie Filmów**: Wyświetlanie listy aktualnie dostępnych filmów.
- **Rezerwacja Biletów**: Wybór konkretnych miejsc na wybrany seans filmowy.
- **Moje Rezerwacje**: Przegląd historii zarezerwowanych biletów.
- **Dodaj Film**: Interfejs do dodawania nowych filmów do systemu.
- **Responsywny Design**: Nowoczesny interfejs użytkownika zbudowany z Tailwind CSS i Framer Motion.

## 🛠️ Stos Technologiczny

### Frontend
- **React** (Vite)
- **Tailwind CSS** - Stylowanie
- **Framer Motion** - Animacje
- **React Router** - Nawigacja
- **Axios** - Integracja z API
- **Lucide React** - Ikony

### Backend
- **Node.js** & **Express** - Serwer
- **MongoDB** (Mongoose) - Baza danych
- **dotenv** - Zmienne środowiskowe
- **CORS** - Obsługa żądań między domenami

## ⚙️ Instalacja i Konfiguracja

### Wymagania wstępne
- Node.js (zalecana wersja v14+)
- MongoDB (Lokalnie lub Atlas)

### 1. Klonowanie repozytorium
```bash
git clone <adres-repozytorium>
cd Apka
```

### 2. Konfiguracja Backendu
Przejdź do katalogu serwera, zainstaluj zależności i uruchom serwer.

```bash
cd server
npm install
```

**Konfiguracja Środowiska:**
Utwórz plik `.env` w katalogu `server` z następującymi zmiennymi:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cinema_booking
```

Uruchom serwer backendowy:
```bash
npm run dev
```
Serwer będzie działał pod adresem `http://localhost:5000`.

### 3. Konfiguracja Frontendu
Otwórz nowy terminal, przejdź do katalogu klienta, zainstaluj zależności i uruchom aplikację.

```bash
cd client
npm install
npm run dev
```
Aplikacja będzie działać pod adresem `http://localhost:5173` (domyślny port Vite).

## 📂 Struktura Projektu

```
Apka/
├── client/           # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
├── server/           # Backend Express
│   ├── models/
│   ├── routes/
│   └── ...
```

## 📜 Licencja
ISC

# STEP-BY-STEP

## 1. Nav to backend and do as follows:

```Powershell
py -m venv venv

.\venv\Scripts\activate

py -m pip install --upgrade pip

pip install -r .\requirements.txt

py .\manage.py makemigrations

py .\manage.py migrate
```

## 2. Rename your .env.example to .env and define secure `SECRET_KEY` and `SECRET_KEY_JWT`

## 3. Create a superuser

```Powershell
py .\manage.py createsuperuser
```

## 4. If you wish to simplify your superuser creation, define a proper `DJANGO_SUPERUSER_USERNAME` and `DJANGO_SUPERUSER_PASSWORD` inside .env file as best suits your desire and do accordinly:

```Powershell
py .\manage.py createsuperuser --noinput
```

## 5. In case you prefer your error logs as a text file, you may set environment variable `ERROR_LOG` to True. Change `ERROR_LOG_FILE` to any name file of your liking.

## 6. Run backend server:

```Powershell
py .\manage.py runserver
```

## 7. To run tests:

```Powershell
coverage run .\manage.py test

coverage html

coverage report # terminal
```

## 8. With a new terminal, nav to the frontend and simply:

```Powershell
npm i

npm run dev
```

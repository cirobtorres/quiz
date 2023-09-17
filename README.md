# STEP-BY-STEP

## 1. Nav to backend and do as follows:

```Powershell
# virtual enviroment
py -m venv venv

.\venv\Scripts\activate

# upgrade pip, just in case
py -m pip install --upgrade pip

# install dependencies
pip install -r .\requirements.txt

# set your database
py .\manage.py makemigrations

py .\manage.py migrate
```

## 2. Rename your .env.example to .env and define secure `SECRET_KEY` and `SECRET_KEY_JWT`

## 3. (`optional`) Create a superuser to start with:

```Powershell
py .\manage.py createsuperuser
```

## 4. (`optional`) If you wish to simplify your superuser creation, define a proper `DJANGO_SUPERUSER_USERNAME` and `DJANGO_SUPERUSER_PASSWORD` inside .env file as best suits your desire and do accordinly:

```Powershell
py .\manage.py createsuperuser --noinput
```

## 5. (`optional`) In case you prefer your error logs as a text file, you may set environment variable `ERROR_LOG` to True. Change `ERROR_LOG_FILE` to any name file of your liking.

## 6. Run backend server:

```Powershell
py .\manage.py runserver
```

## 7. To run tests:

```Powershell
coverage run .\manage.py test

coverage html
```

## 8. With a new terminal, nav to the frontend and simply:

```Powershell
npm i

npm run dev
```

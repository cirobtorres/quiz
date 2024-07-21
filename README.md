<font style="font-family:arial">
<h1 style="font-family:arial black;text-transform:uppercase;color:#667292;font-size:35px">Django/Next.js QUIZ project (with Docker)</h1>

<h2 style="font-family:arial black;text-transform:uppercase;font-size:25px;color:#de3163;font-weight:extrabold">Starting application</h2>

```Bash
# In the root of the project (where docker-compose.yml is located)
docker-compose up -d # to run
docker-compose down # to close
```

<h3 style="font-size:25px;color:dodgerblue">Python setup commands</h3>

```Bash
py -m venv venv

.\venv\Scripts\Activate

py -m pip install --upgrade pip

pip install -r .\api-django\requirements.txt

py .\api-django\manage.py makemigrations

py .\api-django\manage.py migrate

py .\api-django\manage.py createsuperuser

py .\api-django\manage.py runserver
```

<h3 style="font-size:25px;color:dodgerblue">Running tests</h3>

```Bash
coverage run .\manage.py test

coverage html
```

<h2 style="font-family:arial black;text-transform:uppercase;font-size:25px;color:#de3163;font-weight:extrabold">Running application issues</h2>

<h3 style="color:crimson;font-size:25px;font-weight:extrabold">Docker exec /scripts/commands.sh: no such a file</h3>

<ol>

<li style="font-size:18px">When sending files to git, this might happen:</li>

```bash
warning: in the working copy of 'api/scripts/commands.sh', LF will be replaced by CRLF the next time Git touches it
```

<li style="font-size:18px">If docker is not being able to find commands.sh, consider resaving that file changing end of line from CRLF back to LF. The <font style="color:green">#!/bin/sh</font> line of code is rewritten to <font style="color:green">#!/bin/sh^M</font> which is not a valid interpreter for Bash to read it.</li>

</ol>

<h3 style="color:crimson;font-size:25px;font-weight:extrabold">API decode error</h3>

<p style="font-size:18px">If you're running back and front application directly through the prompt, <font style="color:dodgerblue">remember to name <b>POSTGRES_HOST</b> as <b>localhost</b> on your .env file</font></p>

<h3 style="color:crimson;font-size:25px;font-weight:extrabold">UTF-8 codec cannot decode byte error</h3>

<p style="font-size:18px">This might happen due to bad data, like setting a wrong postgres password. In any case, check for your enviroment variables.</p>

<h2 style="font-family:arial black;text-transform:uppercase;font-size:25px;color:#de3163;font-weight:extrabold">Packages</h2>

<h3 style="color:dodgerblue;font-size:25px;font-weight:extrabold">Django</h3>
<ol>
<li style="font-size:18px">cloudinary</li>
<li style="font-size:18px">coverage</li>
<li style="font-size:18px">Django</li>
<li style="font-size:18px">django-cors-headers</li>
<li style="font-size:18px">djangorestframework</li>
<li style="font-size:18px">djangorestframework-simplejwt</li>
<li style="font-size:18px">Faker</li>
<li style="font-size:18px">psycopg2-binary</li>
<li style="font-size:18px">PyJWT</li>
<li style="font-size:18px">python-dotenv</li>
</ol>

<h3 style="color:dodgerblue;font-size:25px;font-weight:extrabold">Next.js</h3>
<ol>
<li style="font-size:18px">react-image-crop</li>
<li style="font-size:18px">js-cookie + types/js-cookie</li>
<li style="font-size:18px">tailwindcss + tailwind-scrollbar</li>
<li style="font-size:18px">jwt-decode</li>
<li style="font-size:18px">framer-motion</li>
<li style="font-size:18px">react-countdown-circle-timer</li>
<li style="font-size:18px">react-icons</li>
</ol>

</font>
